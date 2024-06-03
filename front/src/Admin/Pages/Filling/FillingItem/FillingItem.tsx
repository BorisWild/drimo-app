import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getDate, getTime } from '../../../../Helpers/getDate'
import { IFillingItem } from '../../../../models/IFillingItem'


function FillingItem({ id, title, created_at, updated_at, weight }: IFillingItem) {
  const navigate = useNavigate()

  function handleNavigateToSubcategory() {
    navigate('/admin/filling/' + id)
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
          <div className="payload-item__container">
            <div className='payload-item__title'>{weight}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(updated_at)}</div>
            <div className="payload-item__subtitle">{getTime(updated_at)}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(created_at)}</div>
            <div className="payload-item__subtitle">{getTime(created_at)}</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default FillingItem