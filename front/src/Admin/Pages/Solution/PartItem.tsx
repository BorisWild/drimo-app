import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'
import { IElement } from '../../../models/IElement'
import { ISort } from '../../../models/ISort'

interface PartProps {
  element: IElement,
  sorts: ISort[]
}

function PartItem({ element: { element_id, element_dimensions, element_title, element_weigth, texture_id, texture_image, texture_name, cost, quantity }, sorts }: PartProps) {
  const navigate = useNavigate()

  return (
    <div className='table__item' >
      <div className="table__payload">
        <div className="table__payload-item payload-item">
          <div className="payload-item__container">
            <div className="payload-item__title">{element_title}</div>
            <div className="payload-item__subtitle">ID {element_id}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[1].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>
              <div className="payload-item__image">
                <img src={getImageFromJSON(texture_image)} alt="" />
              </div>
              {texture_name}</div>
            <div className='payload-item__subtitle payload-item__texture-id'>{texture_id}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[2].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{quantity}</div>

          </div>
        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[3].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{element_weigth}</div>

          </div>
        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[4].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{cost * quantity} ₽</div>
            <div className='payload-item__subtitle'>{cost} ₽ шт</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PartItem