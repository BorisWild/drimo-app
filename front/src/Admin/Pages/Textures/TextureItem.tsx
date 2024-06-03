import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getDate, getTime } from '../../../Helpers/getDate'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'
import { ISort } from '../../../models/ISort'
import { ITexture } from '../../../models/ITexture'

interface TextureProps {
  texture: ITexture,
  sorts: ISort[]
}

function TextureItem({ texture: { id, title, created_at, updated_at, image, type }, sorts }: TextureProps) {

  const navigate = useNavigate()
  function handleNavigateToTexture() {
    navigate('/admin/textures/' + id)
  }

  return (
    <div className='table__item' onClick={handleNavigateToTexture}>
      {
        image &&
        <div className="table__image-container">
          <img className='table__image' src={getImageFromJSON(image)} alt="" />
        </div>
      }
      <div className="table__payload">
        <div className="table__payload-item payload-item">
          <div className="payload-item__container">
            <div className="payload-item__title">{title}</div>
            <div className="payload-item__subtitle">ID {id}</div>
          </div>

        </div>
        <div className="table__payload-item payload-item">
          <div className="payload-item__sort">
            {sorts[2].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{type}</div>
          </div>

        </div>
        {
          updated_at &&
          <div className="payload-item payload-item_date-column">
            <div className="payload-item__sort">
              {sorts[3].params[0].param}
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
              {sorts[4].params[0].param}
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

export default TextureItem