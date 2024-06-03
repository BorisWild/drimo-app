import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getDate, getTime } from '../../../Helpers/getDate'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'
import { ISolution } from '../../../models/ISolution'
import { ISort } from '../../../models/ISort'

interface SolutionProps {
  solution: ISolution,
  link: string,
  sorts: ISort[]
}

function SubcategoryItem({ solution: { id, name, width, length, height, weight, image, created_at, updated_at, full_name }, link, sorts }: SolutionProps) {
  
  const navigate = useNavigate()

  function handleNavigateToSubcategory() {
    if (link) {
      navigate(link + id)
    }

  }
  return (
    <div className='table__item' onClick={handleNavigateToSubcategory}>

      <div className="table__image-container">
        <img className='table__image' src={ getImageFromJSON(image) } alt="" />
      </div>
      <div className="table__payload">
        <div className="table__payload-item payload-item">
          <div className="payload-item__sort">
            {sorts[1].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{name}</div>
            <div className="payload-item__subtitle">ID {id}</div>
          </div>

        </div>
        {
          <div className="table__payload-item payload-item">
            <div className="payload-item__sort">
              {sorts[2].params[0].param}
            </div>
            <div className="payload-item__container">
              <div className="payload-item__title">{full_name || 'Неизвестно'}</div>
            </div>

          </div>
        }
        <div className="table__payload-item payload-item">
          <div className="payload-item__sort">
            {sorts[3].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{length}</div>
          </div>

        </div>
        <div className="table__payload-item payload-item">
          <div className="payload-item__sort">
            {sorts[4].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{width}</div>
          </div>

        </div>
        <div className="table__payload-item payload-item">
          <div className="payload-item__sort">
            {sorts[5].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{height}</div>
          </div>

        </div>
        <div className="table__payload-item payload-item ">
          <div className="payload-item__sort">
            {sorts[6].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{weight}</div>
          </div>

        </div>
        {
          updated_at &&
          <div className="payload-item payload-item_date-column">
            <div className="payload-item__sort">
              Посл. изменение
            </div>
            <div className="payload-item__container">
              <div className="payload-item__title">{getDate(updated_at)}</div>
              <div className="payload-item__subtitle">{getTime(updated_at)}</div>
            </div>

          </div>
        }
        {
          created_at &&
          <div className="payload-item payload-item_date-column">
            <div className="payload-item__sort">
              Добавлено
            </div>
            <div className="payload-item__container">
              <div className="payload-item__title">{getDate(created_at)}</div>
              <div className="payload-item__subtitle">{getTime(created_at)}</div>
            </div>

          </div>
        }

      </div>
    </div>
  )
}

export default SubcategoryItem