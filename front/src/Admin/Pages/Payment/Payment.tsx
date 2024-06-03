import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IPayment } from '../../../models/IPayment'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import TableRow from '../../../UIkit/TableRow/TableRow'
import PaymentItem from './PaymentItem'

const MockTable = [
  {
    width: 4,
    data: '650 ₽',
    title: 'Цена'
  },
]

const FilterMock = [
  {
    width: 4,
    params: [{ param: 'Название', isSortable: true, id: 'sort_title' }, { param: 'ID', isSortable: true, id: 'sort_id' }]
  },
  {
    width: 2,
    params: [{ param: 'Посл. изменение', isSortable: true, id: 'sort_updated_at' }]
  },
  {
    width: 2,
    params: [{ param: 'Добавлено', isSortable: true, id: 'sort_created_at' }]
  },
]

function Payment() {

  const navigate = useNavigate()
  const { changeSort } = catalogSortSlice.actions
  const { param, order } = useAppSelector(state => state.catalogSortReducer)
  const { data: methods, refetch, error } = drimoAPI.useFetchPaymentMethodsQuery({ param, order })
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  return (
    <div className="payment">
      <div className="payment__header">
        <div className="page-title">Способы оплаты<div className="title-counter">{methods && methods.length}</div></div>
        <div className="button-container">
          <div className="button button_primary" onClick={() => navigate('/admin/payment/add')}>Добавить</div>
        </div>
      </div>
      <MobileSort sort={FilterMock} action={changeSort} currentSort={param} />
      <div className="payment__table table">
        <TableFilter sort={FilterMock} action={changeSort} currentSort={param} />
        <div className="table__body">
          {
            methods && methods.map((el: IPayment) => <PaymentItem payment={el} sorts={FilterMock} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Payment