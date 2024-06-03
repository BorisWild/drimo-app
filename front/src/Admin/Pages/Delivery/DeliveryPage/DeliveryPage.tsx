import { publicEncrypt } from 'crypto';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDate } from '../../../../Helpers/getDate';
import { drimoAPI } from '../../../../services/DrimoService';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { modalSlice } from '../../../../store/reducers/client/ModalSlice';
import { LeftSmallRedArrow } from '../../../../UIkit/Icons'
import Input from '../../../../UIkit/Inputs/Input';
import Textarea from '../../../../UIkit/Inputs/Textarea';
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice'

function DeliveryPage() {
  const { id } = useParams();
  const navigate = useNavigate()
  const { data: method, refetch } = drimoAPI.useFetchDeliveryMethodQuery(id)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [shownPrice, setShownPrice] = useState('0')
  const { notificate } = notificationsSlice.actions

  const [updateMethod] = drimoAPI.useUpdateDeliveryMethodMutation()
  const [deleteMethod] = drimoAPI.useDeleteDeliveryMethodMutation()
  const [validTitle, setValidTitle] = useState(false)
  const { changeDelete } = modalSlice.actions
  const dispatch = useAppDispatch()
  method && console.log(method)

  useEffect(() => {
    if (method) {
      setTitle(method.title)
      setDescription(method.description)
      setPrice(method.cost.split('.')[0])
      setShownPrice(method.cost.split('.')[0] + ' ₽')
    }

  }, [method])

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
    setValidTitle(false)
  }

  const handleDescription = (value: string) => {
    setDescription(value)
  }

  const handleUpdateMethod = async () => {
    if (title.length === 0) {
      setValidTitle(true)
      dispatch(notificate({ title: 'Ошибка', isShown: true }));
    } else {
      await updateMethod({ id, name: title, cost: price.split(' ')[0], description: description })
      dispatch(notificate({ title: 'Сохранено', isShown: true }));
      refetch()
    }

  }

  const handleDeleteMethod = async () => {
    dispatch(changeDelete({ type: 'Способ доставки', isOpened: true, id: id, backLink: '/admin/delivery' }))
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
        <div className="page-title">{method && method.title}</div>
        <div className="category__data">
          <div className="label">ID: {id}</div>
          <div className="label">Посл. изменение: {method && getDate(method.updated_at)}</div>
          <div className="label">Добавлено: {method && getDate(method.created_at)}</div>
        </div>
      </div>
      <div className="delivery-page__inputs">
        <Input isRequired={true} title={'Название'} valid={validTitle} isLittle={false} value={title} onchange={handleTitle} length={50} />
        <Textarea isRequired={false} title={'Описание'} isLittle={false} value={description} onchange={handleDescription} />
        <Input isRequired={true} title={'Цена'} isLittle={false} value={shownPrice} onblur={setRouble} onchange={handlePrice} length={8} />
      </div>
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleUpdateMethod}>Сохранить</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={handleDeleteMethod}>Удалить</div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryPage