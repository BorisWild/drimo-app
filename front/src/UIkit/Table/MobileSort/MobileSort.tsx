import React, { useState } from 'react'
import { ISort } from '../../../models/ISort'
import Filter from '../../Filter/Filter'
import { CloseIcon, Settings16Icon, SortIcon } from '../../Icons'
import TableSort from '../../TableFilter/TableSort'

interface MobileSortProps {
  sort: ISort[]
  action: any,
  currentSort: any,
  filters?: any,
}

function MobileSort({ sort, action, currentSort, filters }: MobileSortProps) {

  const [sortShown, setSortShown] = useState(false)
  const [filterShown, setFilterShown] = useState(false)

  const handleOpenSort = () => {
    setSortShown(!sortShown)
  }

  const handleOpenFilter = () => {
    setFilterShown(!filterShown)
  }

  return (
    <div className="mobile-sort">
      <div className="mobile-sort__buttons">
        <div className="button button_filter-mobile" onClick={handleOpenSort}>
          Сортировка
          <SortIcon />
        </div>
        {
          filters && filters.length > 0 &&
          <div className="button button_filter-mobile" onClick={handleOpenFilter}>
            Фильтр
            <Settings16Icon color={"#E92627"} />
          </div>
        }
      </div>

      <div className={`mobile-sort__menu${sortShown ? ' mobile-sort__menu_active' : ''}`}>
        <div className="mobile-sort__close" onClick={handleOpenSort}>
          <CloseIcon color={'black'} />
        </div>
        <div className="mobile-sort__title">
          Сортировка
        </div>
        <TableSort sort={sort} action={action} currentSort={currentSort} />
        <div className="button button_primary" onClick={handleOpenSort}>Применить</div>
      </div>
      <div className={`mobile-sort__menu${filterShown ? ' mobile-sort__menu_active' : ''}`}>
        <div className="mobile-sort__close" onClick={handleOpenFilter}>
          <CloseIcon color={'black'} />
        </div>
        <div className="mobile-sort__title">
          Фильтр
        </div>
        <div className="mobile-sort__filters">
          {
            filters && filters.map((filter: any, index: number) => <Filter key={index} title={filter.title} filters={filter.filters} onchange={filter.onchange} currentTypes={filter.currentTypes} />)
          }
        </div>

        <div className="button button_primary" onClick={handleOpenFilter}>Применить</div>
      </div>
    </div>
  )
}

export default MobileSort