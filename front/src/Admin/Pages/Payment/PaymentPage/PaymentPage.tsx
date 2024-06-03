import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getDate } from '../../../../Helpers/getDate';
import { drimoAPI } from '../../../../services/DrimoService';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { modalSlice } from '../../../../store/reducers/client/ModalSlice';
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice';
import { LeftSmallRedArrow } from '../../../../UIkit/Icons';
import Input from '../../../../UIkit/Inputs/Input';
import Textarea from '../../../../UIkit/Inputs/Textarea';

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate()

  const { data: method, error: methodError, refetch } = drimoAPI.useFetchPaymentMethodQuery(id)
  method && console.log(method)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [validTitle, setValidTitle] = useState(false)


  const [deleteMethod, { error: deleteError, data: deleteData }] = drimoAPI.useDeletePaymentMethodMutation()
  const [updateMethod, { error: updateError, data: updateData }] = drimoAPI.useUpdatePaymentMethodMutation()
  const { changeDelete } = modalSlice.actions

  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  deleteError || updateError || methodError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

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
      await updateMethod({ id, name: title, description })
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
      refetch()
    }

  }

  const handleDeleteMethod = async () => {

    dispatch(changeDelete({ type: 'Способ оплаты', isOpened: true, id: id, backLink: '/admin/payment' }))

  }


  useEffect(() => {
    if (method) {
      setTitle(method.title)
      setDescription(method.description)
    }

  }, [method])

  return (
    <div className="delivery-page">
      <div className="delivery-page__header">
        <div className="button-container">
          <div onClick={() => { navigate('/admin/payment') }} className="button button_text">
            <LeftSmallRedArrow />
            способы оплаты
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
        <Input isRequired={true} title={'Название'} isLittle={false} valid={validTitle} value={title} onchange={handleTitle} length={50} />
        <Textarea isRequired={false} title={'Описание'} isLittle={false} value={description} onchange={handleDescription} />
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

export default PaymentPage