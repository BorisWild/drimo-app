import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch } from '../../../store/hooks/redux'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { LeftSmallRedArrow } from '../../../UIkit/Icons'
import Input from '../../../UIkit/Inputs/Input'
import Textarea from '../../../UIkit/Inputs/Textarea'

function AddPayment() {
  const navigate = useNavigate()
  const [createMethod, { error, data }] = drimoAPI.useCreatePaymentMethodMutation()
  const [validTitle, setValidTitle] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  const handleTitle = (value: string) => {
    setTitle(value)
    setValidTitle(false)
  }

  const handleDescription = (value: string) => {
    setDescription(value)
  }

  const handleCreateMethod = async () => {
    if (title.length === 0) {
      setValidTitle(true)
      dispatch(notificate({ title: 'Ошибка', isShown: true }));
    } else {
      await createMethod({ name: title, description })
      navigate('/admin/payment')
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
    }

  }

  return (
    <div className="delivery-page">
      <div className="delivery-page__header">
        <div className="button-container">
          <div onClick={() => { navigate('/admin/payment') }} className="button button_text">
            <LeftSmallRedArrow />
            Способы оплаты
          </div>
        </div>
        <div className="page-title">Добавить способ оплаты</div>
      </div>
      <div className="delivery-page__inputs">
        <Input isRequired={true} title={'Название'} valid={validTitle} isLittle={false} value={title} onchange={handleTitle} length={50} />
        <Textarea isRequired={false} title={'Описание'} isLittle={false} value={description} onchange={handleDescription} />
      </div>
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleCreateMethod}>Добавить</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={() => { navigate('/admin/payment') }}>Отмена</div>
        </div>
      </div>
    </div >
  )
}

export default AddPayment