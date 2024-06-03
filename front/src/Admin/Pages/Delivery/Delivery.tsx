import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IDelivery } from '../../../models/IDelivery'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import TableRow from '../../../UIkit/TableRow/TableRow'
import DeliveryItem from './DeliveryItem'

const FilterMock = [
  {
    width: 4,
    params: [{ param: 'Название', isSortable: true, id: 'sort_title' }, { param: 'ID', isSortable: true, id: 'sort_id' }]
  },
  {
    width: 4,
    params: [{ param: 'Цена', isSortable: true, id: 'sort_cost' }]
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

function Delivery() {
  const { changeSort } = catalogSortSlice.actions
  const { order, param } = useAppSelector(state => state.catalogSortReducer)
  const { data: methods, error } = drimoAPI.useFetchDeliveryMethodsQuery({ param, order })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { notificate } = notificationsSlice.actions

  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  return (
    <div className="delivery">
      <div className="delivery__header">
        <div className="page-title">Способы доставки <div className="title-counter">{methods && methods.length}</div></div>
        <div className="button-container">
          <div className="button button_primary" onClick={() => navigate('/admin/delivery/add')}>Добавить</div>
        </div>
      </div>
      <MobileSort sort={FilterMock} action={changeSort} currentSort={param} />
      
      <div className="delivery__table table">
        <TableFilter sort={FilterMock} action={changeSort} currentSort={param} />
        <div className="table__body">
          {
            methods && methods.map((el: IDelivery) => <DeliveryItem delivery={el} sorts={FilterMock} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Delivery