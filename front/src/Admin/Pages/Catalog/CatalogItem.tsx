import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getDate, getTime } from '../../../Helpers/getDate';
import { ICategory } from '../../../models/ICategory'
import { ISort } from '../../../models/ISort';

interface CategoryProps {
  category: ICategory,
  sorts: ISort[]
}

function CatalogItem({category: { id, title, created_at, updated_at, children, solutions }, sorts}: CategoryProps) {

  const navigate = useNavigate()

  function handleNavigateToCategory() {
    navigate('/admin/catalog/' + id)
  }

  return (
    <div className='table__item' onClick={handleNavigateToCategory}>
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
            <div className='payload-item__title'>{children.length}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[2].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{solutions ? solutions : 0}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__sort">
            {sorts[3].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(updated_at)}</div>
            <div className="payload-item__subtitle">{getTime(updated_at)}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__sort">
            {sorts[4].params[0].param}
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

export default CatalogItem