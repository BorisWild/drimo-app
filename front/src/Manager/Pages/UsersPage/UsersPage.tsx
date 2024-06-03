import React, { useEffect, useState } from 'react'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import Pagination from '../../../UIkit/Pagination/Pagination'
import TableRow from '../../../UIkit/TableRow/TableRow'
import axios from 'axios'
import { IUser } from '../../../models/IUser'
import UserItem from './UserItem'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { getCookie } from '../../../Helpers/cookies'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'
import { getAuthURL } from '../../../services/URL'

const UsersSort = [
  {

    params: [{ param: 'ФИО', isSortable: true, id: 'sort_full_name' }, { param: 'ID', isSortable: true, id: 'sort_id' }]
  },
  {

    params: [{ param: 'Телефон', isSortable: true, id: 'sort_phone' }]
  },
  {

    params: [{ param: 'E-mail', isSortable: true, id: 'sort_email' }]
  },
  {
    params: [{ param: 'Заказы', isSortable: true, id: 'sort_orders' }]
  },
  {

    params: [{ param: 'Сохр.конструкции', isSortable: true, id: 'sort_saved_constructions' }]
  },
  {

    params: [{ param: 'Посл. изменение', isSortable: true, id: 'sort_updated_at' }]
  },
  {

    params: [{ param: 'Добавлено', isSortable: true, id: 'sort_created_at' }]
  },
]



function UsersPage() {

  const [users, setUsers] = useState(
    {
      rows: [],
      total: 0,
    }
  )

  const [page, setPage] = useState(0)
  const { changeSort } = catalogSortSlice.actions;
  const { param, order } = useAppSelector(state => state.catalogSortReducer);

  const dispatch = useAppDispatch();
  const { notificate } = notificationsSlice.actions;

  useEffect(() => {

    axios.get(`${getAuthURL()}/get_users?${param}=${order}&page=${page+1}`, {
      headers: {
        Authorization: `Bearer ${getCookie('apiTokenManager')}`,
        ID: `${getCookie('userIdManager')}`
      }
    })
      .then(({ data }) => { setUsers(data); console.log(data) })
      .catch(e => { dispatch(notificate({ title: 'Ошибка', isShown: true })) })

  }, [param, order, page])


  return (
    users ?
      <div className="users">
        <div className="users__header">
          <div className="users__title page-title">
            Пользователи
            <div className="title-counter">{users.total}</div>
          </div>
        </div>
        <div className="users__body">
          <MobileSort sort={UsersSort} action={changeSort} currentSort={param} />
          <div className="users__table table">
            <TableFilter sort={UsersSort} action={changeSort} currentSort={param} />
            <div className="table__body">
              {
                users.rows && users.rows.map((el: IUser) => <UserItem item={el} sorts={UsersSort} />)
              }
            </div>
          </div>
          <Pagination total={Math.ceil(users.total / 10)} onclick={setPage} current={page} />
        </div>
      </div> : <></>
  )
}

export default UsersPage