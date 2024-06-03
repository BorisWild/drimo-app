import React, { useEffect, useState } from 'react'
import TableFilter from '../../../UIkit/TableFilter/TableSort'

import Filter from '../../../UIkit/Filter/Filter'
import Pagination from '../../../UIkit/Pagination/Pagination'
import TableRow from '../../../UIkit/TableRow/TableRow'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { IOrder } from '../../../models/IOrder'
import OrderItem from './OrderItem'
import { getStatus, statusArray } from '../../../Helpers/getStatus'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'

const OrdersSort = [
  {
    params: [{ param: 'Номер заказа', isSortable: true, id: 'sort_id' }]
  },
  {
    params: [{ param: 'Решение', isSortable: true, id: 'sort_solution_name' }]
  },
  {
    params: [{ param: 'Статус', isSortable: true, id: 'sort_status' }]
  },
  {
    params: [{ param: 'Сумма заказа', isSortable: true, id: 'sort_price' }]
  },
  {
    params: [{ param: 'Способ оплаты', isSortable: true, id: 'sort_payment_id' }]
  },
  {
    params: [{ param: 'Способ доставки', isSortable: true, id: 'sort_delivery_id' }]
  },
  {
    params: [{ param: 'Посл. изменение', isSortable: true, id: 'sort_updated_at' }]
  },
  {
    params: [{ param: 'Добавлено', isSortable: true, id: 'sort_created_at' }]
  },
]

function OrdersPage() {
  const [page, setPage] = useState(0)
  const { param, order } = useAppSelector(state => state.catalogSortReducer)
  const dispatch = useAppDispatch()
  const [deliveryMethods, setDeliveries] = useState<string[]>([])
  const [paymentMethods, setPayments] = useState<string[]>([])
  const [orderStatuses, setOrderStatuses] = useState<string[]>([])
  const { changeSort } = catalogSortSlice.actions
  const { data: deliveries, error: deliveriesError, } = drimoAPI.useFetchDeliveryTypesQuery('')
  const { data: payments, error: paymentsError, } = drimoAPI.useFetchPaymentTypesQuery('')
  const { data: statuses, error: statusesError, } = drimoAPI.useFetchOrderStatusesQuery('')
  const { data: orders, error: ordersError, refetch } = drimoAPI.useFetchAllOrdersQuery({ page, param, order, delivery: deliveryMethods, payment: paymentMethods, status: orderStatuses });
  const { notificate } = notificationsSlice.actions;

  deliveriesError || paymentsError || statusesError || ordersError && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  const handleChangeStatus = (type: string) => {
    let _type = String(statusArray.find((el: any) => el.title === type)?.status)
    let updated = [...orderStatuses]
    if (orderStatuses.indexOf(_type) === -1) {
      updated.push(_type)
      setOrderStatuses(updated)
    } else {
      updated.splice(orderStatuses.indexOf(_type), 1)
      setOrderStatuses([...updated])
    }
    refetch()
  }

  const handleChangeDeliveryMethod = (type: string) => {
    let updated = [...deliveryMethods]
    if (deliveryMethods.indexOf(type) === -1) {
      updated.push(type)
      setDeliveries(updated)
    } else {
      updated.splice(deliveryMethods.indexOf(type), 1)
      setDeliveries([...updated])
    }
    refetch()
  }

  const handleChangePaymentMethod = (type: string) => {

    let updated = [...paymentMethods]
    if (paymentMethods.indexOf(type) === -1) {
      updated.push(type)
      setPayments(updated)
    } else {
      updated.splice(paymentMethods.indexOf(type), 1)
      setPayments([...updated])
    }
    refetch()
  }



  return (
    orders && deliveries && statuses && payments ?
      <div className="users">
        <div className="users__header">
          <div className="users__title page-title">
            Заказы
            <div className="title-counter">{orders.total}</div>
          </div>
          <div className="users__filters filters">
            <Filter title={'Статус'} filters={statuses.map((el: any) => ({ type: getStatus(el.status), count: el.orders_num }))} onchange={handleChangeStatus} currentTypes={orderStatuses} />
            <Filter title={'Способ доставки'} filters={deliveries.map((el: any) => ({ type: el.name, count: el.orders_num }))} onchange={handleChangeDeliveryMethod} currentTypes={deliveryMethods} />
            <Filter title={'Способ оплаты'} filters={payments.map((el: any) => ({ type: el.name, count: el.orders_num }))} onchange={handleChangePaymentMethod} currentTypes={paymentMethods} />
          </div>
        </div>
        <div className="users__body">
          <MobileSort
            sort={OrdersSort}
            action={changeSort}
            currentSort={param}
            filters={[
              { filters: statuses.map((el: any) => ({ type: getStatus(el.status), count: el.orders_num })), onchange: handleChangeStatus, title: 'Статус', currentTypes: orderStatuses },
              { filters: deliveries.map((el: any) => ({ type: el.name, count: el.orders_num })), onchange: handleChangeDeliveryMethod, title: 'Способ доставки', currentTypes: deliveryMethods },
              { filters: payments.map((el: any) => ({ type: el.name, count: el.orders_num })), onchange: handleChangePaymentMethod, title: 'Способ оплаты', currentTypes: paymentMethods },

            ]} />

          <div className="users__table table">
            <TableFilter sort={OrdersSort} action={changeSort} currentSort={param} />
            <div className="table__body">
              {
                orders.rows.map((el: IOrder) => <OrderItem
                  sorts={OrdersSort}
                  order={el}
                  link={`/manager/orders/${el.id}`}
                  key={el.id}
                />
                )

              }
            </div>
          </div>
          <Pagination total={Math.ceil(orders.total / 10)} onclick={setPage} current={page} />
        </div>
      </div> : <></>
  )
}

export default OrdersPage