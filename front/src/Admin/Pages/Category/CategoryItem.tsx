import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDate, getTime } from '../../../Helpers/getDate'
import { ISort } from '../../../models/ISort'

import { ISubcategory } from '../../../models/ISubcategory'

interface SubcategoryProps {
  subcategory: ISubcategory,
  sorts: ISort[]
}

function CategoryItem({ subcategory, sorts }: SubcategoryProps) {
  const { id, title, created_at, updated_at, solutions, parent_id } = subcategory
  const navigate = useNavigate()
  const location = useLocation()
  function handleNavigateToSubcategory() {
    navigate(location.pathname + '/category/' + id)
  }

  return (
    <div className='table__item' onClick={handleNavigateToSubcategory}>
      <div className="table__payload">
        <div className="table__payload-item payload-item">

          <div className="payload-item__container">
            <div className="payload-item__title">{title}</div>
            <div className="payload-item__subtitle">ID {id}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[1].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{solutions ? solutions.length : 0}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__sort">
            {sorts[2].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(updated_at)}</div>
            <div className="payload-item__subtitle">{getTime(updated_at)}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__sort">
            {sorts[3].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(created_at)}</div>
            <div className="payload-item__subtitle">{getTime(created_at)}</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CategoryItem