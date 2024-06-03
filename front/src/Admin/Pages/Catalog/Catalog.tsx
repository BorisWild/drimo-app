import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { SortIcon } from '../../../UIkit/Icons'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'
import TableSort from '../../../UIkit/TableFilter/TableSort'
import CatalogItem from './CatalogItem'

const CatalogSort = [
  {
    params: [
      {
        param: 'Название',
        isSortable: true,
        id: 'sort_title',
      },
      {
        param: 'ID',
        isSortable: true,
        id: 'sort_id',
      }
    ]
  },
  {
    params: [
      {
        param: 'Подкатегорий, шт',
        isSortable: true,
        id: 'sort_children',
      },
    ]
  },
  {
    params: [
      {
        param: 'Решений, шт',
        isSortable: true,
        id: 'sort_solutions',
      },
    ]
  },
  {
    params: [
      {
        param: 'Посл. изменение',
        isSortable: true,
        id: 'sort_update_date',
      },
    ]
  },
  {
    params: [
      {
        param: 'Добавлено',
        isSortable: true,
        id: 'sort_create_date',

      },
    ]
  }
]


const Catalog: FC = () => {
  const { order, param } = useAppSelector(state => state.catalogSortReducer)
  const { data: categories, isLoading: getCategoriesLoading, error: getCategoriesError, refetch } = drimoAPI.useFetchAllCategoriesQuery({ param, order })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const sortId = useAppSelector(state => state.catalogSortReducer.param)
  const { notificate } = notificationsSlice.actions

  getCategoriesError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  const { changeSort } = catalogSortSlice.actions
  function handleAddCategory() {
    navigate('/admin/catalog/add')
  }

  useEffect(() => {
    refetch()
  }, [order, param])

  useEffect(() => {
    dispatch(changeSort({ param: '', order: '' }))
  }, [])

  return (
    <div className='admin-catalog'>
      <div className="admin-catalog__header">
        <div className="admin-catalog__title page-title">КАТАЛОГ РЕШЕНИЙ <div className="title-counter">{categories ? categories.length : 0}</div></div>
        <div className="button-container">
          <div className="button button_primary" onClick={handleAddCategory}>Добавить</div>
        </div>
      </div>

      <MobileSort sort={CatalogSort} action={changeSort} currentSort={param} />

      <div className="catalog__table table">
        <TableSort sort={CatalogSort} action={changeSort} currentSort={sortId} />
        <div className="table__body">
          {
            categories && categories.map(category =>
              <CatalogItem
                category={category}
                sorts={CatalogSort}
                key={category.id}
              />
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Catalog