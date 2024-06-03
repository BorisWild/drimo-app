import React from 'react'
import { OrdersMock } from '../../../../Mocks/Orders'
import { drimoAPI } from '../../../../services/DrimoService'
import { useAppDispatch } from '../../../../store/hooks/redux'
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice'
import Order from './Order'

function OrdersList() {

  const { data: orders, error } = drimoAPI.useFetchUserOrdersQuery('')
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions;
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }));

  console.log(orders);

  return (
    <div className="profile__orders-list profile-section">
      {
        orders && orders.map((el: any) => <Order order={el} />)
      }
    </div>
  )
}

export default OrdersList