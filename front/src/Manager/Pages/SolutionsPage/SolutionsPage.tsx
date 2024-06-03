import React, { useState } from 'react'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import Pagination from '../../../UIkit/Pagination/Pagination'
import TableRow from '../../../UIkit/TableRow/TableRow'
import { drimoAPI } from '../../../services/DrimoService'
import { ISolution } from '../../../models/ISolution'
import SubcategoryItem from '../../../Admin/Pages/SubCategory/SubcategoryItem'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'

const SolutionsSort = [
  {
    params: [
      {
        param: 'Фото',
        isSortable: false,
        id: '.',
      },
    ]
  },
  {
    params: [
      {
        param: 'Название',
        isSortable: true,
        id: 'sort_name'
      },
      {
        param: 'ID',
        isSortable: true,
        id: 'sort_id'
      }
    ]
  },
  {
    params: [
      {
        param: 'Пользователь',
        isSortable: true,
        id: 'sort_user'
      },
    ]
  },
  {
    params: [
      {
        param: 'Длина, мм',
        isSortable: true,
        id: 'sort_length'
      },
    ]
  },
  {
    params: [
      {
        param: 'Ширина, мм',
        isSortable: true,
        id: 'sort_width'

      },
    ]
  },
  {
    params: [
      {
        param: 'Высота, мм',
        isSortable: true,
        id: 'sort_height'

      },
    ]
  },
  {
    params: [
      {
        param: 'Вес, г',
        isSortable: true,
        id: 'sort_weight'

      },
    ]
  },
  {
    params: [
      {
        param: 'Посл. изменение',
        isSortable: true,
        id: 'sort_updated_at'

      },
    ]
  },
  {
    params: [
      {
        param: 'Добавлено',
        isSortable: true,
        id: 'sort_created_at'

      },
    ]
  }
]

function SolutionsPage() {
  const [page, setPage] = useState(0)
  const { param, order } = useAppSelector(state => state.catalogSortReducer)
  const { changeSort } = catalogSortSlice.actions
  const { data: solutions, error } = drimoAPI.useFetchAllSolutionsQuery({ page: page, param: param, order: order })
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  solutions && console.log(solutions)
  return (
    solutions ?
      <div className="users">
        <div className="users__header">
          <div className="users__title page-title">
            Готовые решения
            <div className="title-counter">{solutions.total}</div>
          </div>
        </div>
        <div className="users__body">
          <MobileSort sort={SolutionsSort} action={changeSort} currentSort={param} />

          <div className="users__table table">
            <TableFilter sort={SolutionsSort} action={changeSort} currentSort={param} />
            <div className="table__body">
              {
                solutions.rows.map((el: ISolution) =>
                  <SubcategoryItem
                    sorts={SolutionsSort}
                    solution={el}
                    link={'/manager/solutions/'}

                  />
                )
              }

            </div>
          </div>
          <Pagination total={Math.ceil(solutions.total / 20)} onclick={setPage} current={page} />
        </div>
      </div> : <></>
  )
}

export default SolutionsPage