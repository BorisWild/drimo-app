import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SubcategoryItem from '../../../Admin/Pages/SubCategory/SubcategoryItem'
import { getDate } from '../../../Helpers/getDate'
import { IDelivery } from '../../../models/IDelivery'
import { IOrder } from '../../../models/IOrder'
import { IPayment } from '../../../models/IPayment'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { modalSlice } from '../../../store/reducers/client/ModalSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { LeftSmallRedArrow, RightSmallRedArrow } from '../../../UIkit/Icons'
import Input from '../../../UIkit/Inputs/Input'
import Select from '../../../UIkit/Inputs/Select'
import Textarea from '../../../UIkit/Inputs/Textarea'
import TableSort from '../../../UIkit/TableFilter/TableSort'
 
const StatusArray = [
  {
    id: 1,
    title: 'Не оплачен'
  },
  {
    id: 2,
    title: 'Отменен'
  },
  {
    id: 3,
    title: 'Оплачен'
  }
]

const SolutionsSort = [
  {
    params: [
      {
        param: 'Фото',
        isSortable: false,
        id: ''
      },
    ]
  },
  {
    params: [
      {
        param: 'Название',
        isSortable: false,
        id: 'sort_title'
      },
      {
        param: 'ID',
        isSortable: false,
        id: 'sort_id'
      }
    ]
  },
  {
    params: [
      {
        param: 'Длина, мм',
        isSortable: false,
        id: 'sort_length'
      },
    ]
  },
  {
    params: [
      {
        param: 'Ширина, мм',
        isSortable: false,
        id: 'sort_width'

      },
    ]
  },
  {
    params: [
      {
        param: 'Высота, мм',
        isSortable: false,
        id: 'sort_height'

      },
    ]
  },
  {
    params: [
      {
        param: 'Вес, г',
        isSortable: false,
        id: 'sort_weight'

      },
    ]
  },
  {
    params: [
      {
        param: 'Посл. изменение',
        isSortable: false,
        id: 'sort_updated_at'

      },
    ]
  },
  {
    params: [
      {
        param: 'Добавлено',
        isSortable: false,
        id: 'sort_created_at'

      },
    ]
  }
]

function SingleOrder() {
  const { orderid } = useParams()
  const { data: order, error: orderError } = drimoAPI.useFetchSingleUserOrderQuery(orderid)
  const { data: payments, error: paymentsError } = drimoAPI.useFetchPaymentMethodsQuery('')
  const { data: deliveries, error: deliveriesError } = drimoAPI.useFetchDeliveryMethodsQuery('')
  const [status, setStatus] = useState('')
  const [payment, setPayment] = useState('')
  const [delivery, setDelivery] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [building, setBuilding] = useState('')
  const [flat, setFlat] = useState('')
  const [comment, setComment] = useState('')
  const [updateOrder, { error: updateOrderError, data: updateOrderData }] = drimoAPI.useUpdateOrderMutation()

  const { data: solution, error: solutionError, refetch } = drimoAPI.useFetchSolutionQuery({ id: order ? order.solution_id : 1, param: '', order: '' })
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const dispatch = useAppDispatch()
  order && console.log(order)
  const { changeDelete } = modalSlice.actions
  const { notificate } = notificationsSlice.actions
  solutionError || updateOrderError || deliveriesError || paymentsError || orderError && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  useEffect(() => {
    if (deliveries && payments && order) {
      setStatus(StatusArray[order.status - 1].title)
      refetch()
      setComment(order.comment)
      setDelivery(order.delivery_name)
      setPayment(order.payment_name)
      setCity(order.address.city)
      setStreet(order.address.street)
      setBuilding(order.address.building)
      setFlat(order.address.flat)
      setName(order.user_name)
      setPhone(order.phone)
      setPhone(`+7(${order.phone[2] ? order.phone[2] : '_'}${order.phone[3] ? order.phone[3] : '_'}${order.phone[4] ? order.phone[4] : '_'})${order.phone[5] ? order.phone[5] : '_'}${order.phone[6] ? order.phone[6] : '_'}${order.phone[7] ? order.phone[7] : '_'}-${order.phone[8] ? order.phone[8] : '_'}${order.phone[9] ? order.phone[9] : '_'}-${order.phone[10] ? order.phone[10] : '_'}${order.phone[11] ? order.phone[11] : '_'}`)
      setEmail(order.email)
    }


  }, [order, deliveries, payments])
  const handlePhone = (value: string) => {
    let _value = value.replace(/[^+\d]/g, '')
    if (_value.length <= 2) {
      setPhone('+7(')
    }
    if (_value.length > 2 && _value.length < 6) {
      setPhone('+7(' + _value.slice(2, 7))
    }
    if (_value.length >= 6 && _value.length < 9) {
      setPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8))
    }
    if (_value.length >= 9 && _value.length < 11) {
      setPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10))
    }
    if (_value.length >= 11 && _value.length < 13) {
      setPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10) + '-' + _value.slice(10, 12))
    }
  }
  const handleUpdateOrder = async () => {
    await updateOrder(
      {
        id: orderid,
        status: StatusArray.findIndex(el => el.title === status) + 1,
        city: city,
        street: street,
        building: building,
        flat: flat,
        solution_id: order.solution_id,
        payment_id: payments.find((el: IPayment) => el.title === payment).id,
        delivery_id: deliveries.find((el: IDelivery) => el.title === delivery).id,
        comment: comment,
        full_name: name,
        phone: phone,
        email: email,
      }
    )
    dispatch(notificate({ title: 'Сохранено', isShown: true }))
  }

  // const handleDeleteOrder = async () => {
  //   dispatch(changeDelete({ type: 'Заказ', isOpened: true, id: orderid, backLink: `/manager/orders` }))
  // }

  return (
    deliveries && payments && solution && order ?
      <div className="user-order">
        <div className="user-order__header">
          <div className="button-container">
            <div className="button button_text" onClick={() => navigate(`/manager/orders`)}>
              <LeftSmallRedArrow />
              Заказы
            </div>
          </div>
          <div className="page-title">Заказ №{orderid}</div>
          <div className="page-info">
            <div>ID: {orderid}</div>
            <div>Посл. изменение: {getDate(order.updated_at)}</div>
            <div>Дата и время создания: {getDate(order.created_at)}</div>
          </div>
        </div>
        <div className="single-user__section">
          <div className="page-subtitle">Контактные данные</div>
          <div className="single-user__inputs-container">
            <Input disabled={true} title={'ФИО'} isRequired={true} isLittle={false} onchange={setName} value={name} length={255} />
            <div className="profile-section__input_half">
              <Input disabled={true} title={'Телефон'} isRequired={true} isLittle={false} onchange={handlePhone} value={phone} length={255} />
            </div>
            <div className="profile-section__input_half">
              <Input disabled={true} title={'E-mail'} isRequired={true} onchange={setEmail} isLittle={false} value={email} length={255} />
            </div>
          </div>
        </div>
        <div className="single-user__section">
          <div className="page-subtitle">О заказе</div>

          <div className="single-user__inputs-container">
            <Select title={'Статус'} onchange={setStatus} isRequired={true} placeholder={status} options={StatusArray} />
            <Textarea isRequired={false} title={'Комментарий'} isLittle={false} value={comment} onchange={setComment} />
          </div>
        </div>
        <div className="single-user__section">
          <div className="page-subtitle">Оплата, доставка</div>
          <div className="single-user__inputs-container">
            <div className="profile-section__input_half">
              <Select title={'Способ доставки'} isRequired={true} placeholder={delivery} onchange={setDelivery} options={deliveries.map((el: IDelivery) => ({ title: el.title, id: el.id }))} />
            </div>
            <div className="profile-section__input_half">
              <Select title={'Способ оплаты'} isRequired={true} placeholder={payment} onchange={setPayment} options={payments.map((el: IPayment) => ({ title: el.title, id: el.id }))} />
            </div>
          </div>
        </div>
        <div className="single-user__section">
          <div className="page-subtitle">Адрес</div>
          <div className="single-user__inputs-container">
            <Input title={'Город'} isRequired={true} isLittle={false} onchange={setCity} value={city} length={255} />
            <div className="profile-section__input_third">
              <Input title={'Улица'} isRequired={true} isLittle={false} onchange={setStreet} value={street} length={255} />
            </div>
            <div className="profile-section__input_third">
              <Input title={'Дом/строение/корпус'} isRequired={true} onchange={setBuilding} isLittle={false} value={building} length={255} />
            </div>
            <div className="profile-section__input_third">
              <Input title={'Квартира'} isRequired={false} onchange={setFlat} isLittle={false} value={flat} length={255} />
            </div>
          </div>
        </div>
        <div className="single-user__section">
          <div className="page-subtitle">Решение</div>
          <div className="table">
            {/* <TableSort sort={SolutionsSort} action={} currentSort={param} /> */}
            <div className="table__body">
              <SubcategoryItem solution={solution} sorts={SolutionsSort} link={`/manager/orders/${orderid}/solution/`} />
            </div>
          </div>
          <div className="button-container">
            <div className="button button_text" onClick={() => navigate(`/manager/orders/${orderid}/solution/${solution.id}`)}>
              Показать спецификацию
              <RightSmallRedArrow />
            </div>
          </div>
          <div className="category__buttons">
            <div className="button-container">
              <div className="button button_primary" onClick={handleUpdateOrder}>СОХРАНИТЬ</div>
            </div>
            {/* <div className="button-container">
              <div className="button button_secondary" onClick={handleDeleteOrder}>УДАЛИТЬ</div>
            </div> */}
          </div>
        </div>
      </div> : <></>
  )
}

export default SingleOrder