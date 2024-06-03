import React, { useEffect, useState } from 'react'
import TagsList from '../../../UIkit/Tags/TagsList'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import TableRow from '../../../UIkit/TableRow/TableRow'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { IFillingItem } from '../../../models/IFillingItem'
import FillingItem from './FillingItem/FillingItem'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'

const types = [
  {
    type: 'Профиль',
    count: 4
  },
  {
    type: 'Панель',
    count: 10
  },
  {
    type: 'Коннектор',
    count: 8
  },
  {
    type: 'Штифт',
    count: 6
  },
  {
    type: 'Ящик',
    count: 40
  },
  {
    type: 'Дверная панель',
    count: 27
  },
  {
    type: 'Штанга платяная',
    count: 3
  },
  {
    type: 'Ножки',
    count: 1
  },
  {
    type: 'Пластиковая шайба',
    count: 1
  },
  {
    type: 'Заглушка для ножек',
    count: 1
  },
]

const FillingSort = [
  {
    params: [
      {
        param: 'Название',
        isSortable: true,
        id: 'sort_title'
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
  },
]

function Filling() {

  const { param, order } = useAppSelector(state => state.catalogSortReducer)
  const [currentTag, setCurrentTag] = useState(0)
  const { data: filling, error, refetch } = drimoAPI.useFetchAllElementsQuery({ type: types[currentTag].type, param, order })
  const { changeSort } = catalogSortSlice.actions
  const [isLoaded, setLoaded] = useState(false)
  filling && console.log(filling)
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  const handleChangeType = (index: number) => {
    // setType(types[index])
    setCurrentTag(index)
    refetch()
  }

  useEffect(() => {
    if (types && filling && !isLoaded) {
      setLoaded(true)
      // setType(types[0])
    }
  }, [types, filling, isLoaded])

  return (
    isLoaded ?
      <div>
        <TagsList tags={types && types.map((el: any) => ({ title: el.type, count: el.count }))} type={'default'} activeTag={currentTag} onclick={handleChangeType} />
        <div className="page-title page-title_admin">{types[currentTag].type} <div className="title-counter">{types[currentTag].count}</div></div>
      <MobileSort sort={FillingSort} action={changeSort} currentSort={param} />

        {filling && filling.length > 0 && <div className="table">
          <TableFilter sort={FillingSort} action={changeSort} currentSort={param} />
          <div className="table__body">
            {
              filling.map((el: IFillingItem) =>
                <FillingItem
                  title={el.title}
                  id={el.id}
                  weight={el.weight}
                  updated_at={el.updated_at}
                  created_at={el.created_at}
                />
              )
            }
          </div>
        </div>}
      </div> : <></>
  )
}

export default Filling