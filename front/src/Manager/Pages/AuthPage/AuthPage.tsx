import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalCode from '../../../Client/Modals/ModalCode'
import ModalContainer from '../../../Client/Modals/ModalContainer'
import { getAuthURL } from '../../../services/URL'
import { useAppDispatch } from '../../../store/hooks/redux'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { CloseIcon } from '../../../UIkit/Icons'
import Input from '../../../UIkit/Inputs/Input'
import { Logo } from '../../../UIkit/Logo'

function AuthPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  const navigate = useNavigate()
  const handleLogin = async () => {
    if (!email.includes('@')) {
      setEmailValid(true)
    }
    if (password.length < 8) {
      setPasswordValid(true)
    }
    if (email.includes('@') && password.length >= 8) {
      axios.post(`${getAuthURL()}/email_login`,
        {
          email: email,
          password: password,
        })
        .then(({ data }) => {
          console.log(data)
          document.cookie = `apiTokenManager=${data.access_token}; path=/; max-age=2592000;`
          document.cookie = `refreshTokenManager=${data.refresh_token}; path=/; max-age=2592000;`
          document.cookie = `userIdManager=${data.id}; path=/; max-age=2592000;`
          navigate('/manager/users')
          dispatch(notificate({ title: 'Успешно', isShown: true }))
        })
        .catch(e => {
          console.error(e)
          dispatch(notificate({ title: 'Ошибка', isShown: true }))
        })
    }
  }

  return (
    <div className="manager__auth-page auth-page">
      <div className="auth-page__logo">
        <Logo />
      </div>
      <div className="auth-page__window">
        {/* <CloseIcon className='auth-page__close' color={'black'} /> */}
        <div className="page-subtitle">Войти</div>
        <div className="auth-page__input-container">
          <Input isRequired={true} title={'E-mail'} isLittle={false} onchange={setEmail} value={email} valid={emailValid} />
          <Input isRequired={true} title={'Пароль'} type={'password'} isLittle={false} onchange={setPassword} value={password} valid={passwordValid} />
        </div>
        <div className="button-container">
          <div className="button button_primary" onClick={handleLogin}>
            Войти
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage