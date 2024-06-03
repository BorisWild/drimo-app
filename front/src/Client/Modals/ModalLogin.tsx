import axios from 'axios'
import React, { useState } from 'react'
import { getAuthURL } from '../../services/URL'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { modalSlice } from '../../store/reducers/client/ModalSlice'
import { notificationsSlice } from '../../store/reducers/NotificationsSlice'
import Input from '../../UIkit/Inputs/Input'

function ModalLogin() {

    const dispatch = useAppDispatch()
    const { changeLogin, changeModal } = modalSlice.actions
    const [phone, setPhone] = useState('')
    const [inputPhone, setInputPhone] = useState('+7(___)___-__-__')
    const [validatePhone, setValidatePhone] = useState(false)
    const { notificate } = notificationsSlice.actions

    const handleLogin = async () => {

        if (inputPhone.replace(/[^+\d]/g, '').length === 12) {
            await axios.post(`${getAuthURL()}/phone_login`, { phone_number: inputPhone })
                .then(({ data }) => {
                    dispatch(changeModal({ loginOpened: false, codeOpened: true, loginToken: data.token, phoneLogin: inputPhone }))
                })
                .catch(async (error) => {

                    if (error.response.data.message === 'User does not exist') {
                        await axios.post(`${getAuthURL()}/phone_signup`, { full_name: '', password: '', phone_number: inputPhone })
                            .then(async ({ data }) => {
                                if (data) {
                                    dispatch(changeLogin(false));
                                    await axios.post(`${getAuthURL()}/phone_login`, { phone_number: inputPhone })
                                        .then(({ data }) => {
                                            dispatch(changeModal({ loginOpened: false, codeOpened: true, loginToken: data.token, phoneLogin: inputPhone }))
                                        })
                                }
                            })
                            .catch(error => dispatch(notificate({ title: 'Ошибка', isShown: true })))
                    } else {
                        dispatch(notificate({ title: 'Ошибка', isShown: true }))
                    }
                })
        }
        else {
            setValidatePhone(true)
        }
    }

    const handleInputPhone = (value: string) => {
        setValidatePhone(false)
        let _value = value.replace(/[^+\d]/g, '')
        if (_value.length <= 2) {
            setInputPhone('+7(')
        }
        if (_value.length > 2 && _value.length < 6) {
            setInputPhone('+7(' + _value.slice(2, 7))
        }
        if (_value.length >= 6 && _value.length < 9) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8))
        }
        if (_value.length >= 9 && _value.length < 11) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10))
        }
        if (_value.length >= 11 && _value.length < 13) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10) + '-' + _value.slice(10, 12))
        }
        setPhone(_value)
    }


    return (
        <div className="modal_login modal__body">
            <h1 className="modal__title">Войти/зарегистрироваться</h1>
            <Input title="Телефон" isRequired={true} isLittle={false} value={inputPhone} onchange={handleInputPhone} onblur={() => { }} />
            {
                validatePhone ? <div className="modal__hint red-text modal__hint_non-valid">Поле обязательно</div> : <></>
            }
            <div className="button button_primary" onClick={handleLogin}>
                Получить код
            </div>


        </div >
    )
}

export default ModalLogin