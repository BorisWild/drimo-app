import React, { useEffect, useState } from 'react'
import { ISort, SortParam } from '../../models/ISort';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import Sort from '../Sort/Sort';

interface SortProps {
  sort: ISort[]
  action: any,
  currentSort: any,
}

function TableSort({sort, action, currentSort}: SortProps) {
  const [cSort, setSort] = useState(currentSort)

  useEffect(() => {
    setSort(currentSort)
  }, [currentSort])
  return (
    <div className="table__sort">
      {
        sort.map((elem: ISort, index: number) =>
          <div key={index} className={`table__sort-item ${elem.params.find(el => el.param === 'Фото') ? 'table__sort-item_photo' : ''}${elem.params.find(el => el.param === 'Посл. изменение' || el.param === 'Добавлено' || el.param === 'Заказы' || el.param === 'Сохр.конструкции') ? 'table__sort-item_date' : ''}
          `}>
            {
              elem.params.map((parameter: SortParam, index: number) =>
                <Sort
                  key={index}
                  title={parameter.param}
                  isActive={parameter.id === cSort}
                  isSortable={parameter.isSortable}
                  action={action}
                  id={parameter.id} />)
            }
          </div>
        )
      }
    </div>
  )
}

export default TableSort