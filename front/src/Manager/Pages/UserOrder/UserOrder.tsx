import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SubcategoryItem from '../../../Admin/Pages/SubCategory/SubcategoryItem'
import { getCookie } from '../../../Helpers/cookies'
import { getDate } from '../../../Helpers/getDate'
import { IDelivery } from '../../../models/IDelivery'
import { IOrder } from '../../../models/IOrder'
import { IPayment } from '../../../models/IPayment'
import { drimoAPI } from '../../../services/DrimoService'
import { getAuthURL } from '../../../services/URL'
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

function UserOrder() {
  const { id, orderid } = useParams()
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
  const [deleteOrder, { error: deleteOrderError, data: deleteOrderData }] = drimoAPI.useDeleteOrderMutation()
  const { data: solution, error: solutionError, refetch } = drimoAPI.useFetchSolutionQuery({ id: order ? order.solution_id : 1, param: '', order: '' })
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const { changeDelete } = modalSlice.actions
  const { notificate } = notificationsSlice.actions
  solutionError || deleteOrderError || updateOrderError || deliveriesError || paymentsError || orderError && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  useEffect(() => {
    axios.get(`${getAuthURL()}/get_user/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('apiTokenManager')}`,
        ID: `${getCookie('userIdManager')}`
      }
    })
      .then(({ data }) => {
        if (data.full_name) {
          setName(data.full_name);
        }
      })
      .catch(e => console.error(e))
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
    }


  }, [order, deliveries, payments])

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
        user_id: id,
        comment: comment,
      }
    )
    dispatch(notificate({ title: 'Сохранено', isShown: true }))
  }

  const handleDeleteOrder = async () => {
    dispatch(changeDelete({ type: 'Заказ', isOpened: true, id: orderid, backLink: `/manager/users/${id}` }))
  }

  return (
    deliveries && payments && solution && order ?
      <div className="user-order">
        <div className="user-order__header">
          <div className="button-container">
            <div className="button button_text" onClick={() => navigate(`/manager/users/${id}`)}>
              <LeftSmallRedArrow />
              {name}
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
          <div className="page-subtitle">Данные о заказе</div>
          <div className="single-user__inputs-container">
            <Select title={'Статус'} onchange={setStatus} isRequired={true} placeholder={status} options={StatusArray} />
            <Textarea isRequired={false} title={'Комментарий'} isLittle={false} value={comment} onchange={setComment} />
          </div>
        </div>
        <div className="single-user__section">
          <div className="page-subtitle">Доставка, оплата</div>
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
            <Input title={'Город'} isRequired={true} isLittle={false} onchange={setCity} value={city} length={255}/>
            <div className="profile-section__input_third">
              <Input title={'Улица'} isRequired={true} isLittle={false} onchange={setStreet} value={street} length={255}/>
            </div>
            <div className="profile-section__input_third">
              <Input title={'Дом/строение/корпус'} isRequired={true} onchange={setBuilding} isLittle={false} value={building} length={255}/>
            </div>
            <div className="profile-section__input_third">
              <Input title={'Квартира'} isRequired={false} onchange={setFlat} isLittle={false} value={flat} length={255}/>
            </div>
          </div>
        </div>
        <div className="single-user__section">
          <div className="page-subtitle">Решение</div>
          <div className="table">
            {/* <TableSort sort={SolutionsSort} action={} currentSort={param} /> */}
            <div className="table__body">
              <SubcategoryItem solution={solution} sorts={SolutionsSort} link={`/manager/users/${id}/order/${orderid}/solution/`} />
            </div>
          </div>
          <div className="button-container">
            <div className="button button_text" onClick={() => navigate(`/manager/users/${id}/order/${orderid}/solution/${solution.id}`)}>
              Показать спецификацию
              <RightSmallRedArrow />
            </div>
          </div>
          <div className="category__buttons">
            <div className="button-container">
              <div className="button button_primary" onClick={handleUpdateOrder}>СОХРАНИТЬ</div>
            </div>
            <div className="button-container">
              <div className="button button_secondary" onClick={handleDeleteOrder}>УДАЛИТЬ</div>
            </div>
          </div>
        </div>
      </div> : <></>
  )
}

export default UserOrder