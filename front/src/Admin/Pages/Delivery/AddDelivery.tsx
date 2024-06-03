import { title } from 'process'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDate } from '../../../Helpers/getDate'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch } from '../../../store/hooks/redux'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { LeftSmallRedArrow } from '../../../UIkit/Icons'
import Input from '../../../UIkit/Inputs/Input'
import Textarea from '../../../UIkit/Inputs/Textarea'

function AddDelivery() {

  const navigate = useNavigate()
  const [createMethod, { data, error }] = drimoAPI.useCreateDeliveryMethodMutation()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('0')
  const [shownPrice, setShownPrice] = useState('0')
  const [description, setDescription] = useState('')
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  const [validTitle, setValidTitle] = useState(false)
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  function setRouble() {
    if (price.slice(-1) !== '₽' && price.indexOf('₽') === -1) {
      if (price.replace(/[.₽ ]/g, '').length === 0) {
        setPrice('0')
        setShownPrice('0' + ' ₽')
      } else {
        setShownPrice(price + ' ₽')
      }

    }
  }

  const handlePrice = (value: string) => {
    if (value.indexOf('0') == 0) {
      setPrice(value.substring(1).replace(/[^.₽ \d]/g, ''))
      setShownPrice(value.substring(1).replace(/[^.₽ \d]/g, ''))
    } else {
      setPrice(value.replace(/[^.₽ \d]/g, ''))
      setShownPrice(value.replace(/[^.₽ \d]/g, ''))
    }

  }

  const handleTitle = (value: string) => {
    setTitle(value)
    if (value.length > 1) {
      setValidTitle(false)
    }

  }

  const handleDescription = (value: string) => {
    setDescription(value)
  }

  const handleCreateMethod = async () => {
    if (title.length === 0) {
      setValidTitle(true)
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    } else {
      await createMethod({ name: title, description, cost: price.replace(/[^.0-9\d]/g, '') })
      navigate('/admin/delivery')
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
    }

  }

  return (
    <div className="delivery-page">
      <div className="delivery-page__header">
        <div className="button-container">
          <div onClick={() => { navigate('/admin/delivery') }} className="button button_text">
            <LeftSmallRedArrow />
            Способы доставки
          </div>
        </div>
        <div className="page-title">Добавить способ доставки</div>
      </div>
      <div className="delivery-page__inputs">
        <Input isRequired={true} title={'Название'} valid={validTitle} isLittle={false} value={title} onchange={handleTitle} length={50} />
        <Textarea isRequired={false} title={'Описание'} isLittle={false} value={description} onchange={handleDescription} />
        <Input isRequired={true} title={'Цена'} type={'string'} isLittle={false} value={shownPrice} onblur={setRouble} onchange={handlePrice} length={8} />
      </div>
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleCreateMethod}>Добавить</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={() => { navigate('/admin/delivery') }}>Отмена</div>
        </div>
      </div>
    </div >
  )
}

export default AddDelivery