import React from 'react'
import { getImageFromJSON } from '../../Helpers/getImageFromJSON'
import { DeleteIcon, ImageIcon, RequiredIcon } from '../Icons'

interface IProps {
  file: any,
  onchange: any,
}

function Image({ file, onchange }: IProps) {
  return (
    <div className="image-input">
      <div className="image-input__label">
        Фото
        <RequiredIcon />
      </div>
      {
        file ?
          <label className="image-input__image">
            {getImageFromJSON(file) ? <img src={getImageFromJSON(file)} alt="Изображение текстуры" /> : <img src={(URL.createObjectURL(file))} alt="Изображение текстуры" />}


            <input type="file" id="#input__file" className="file__input" accept='.png, .jpg' onChange={(e) => onchange(e.target)} />

          </label> :
          <label className="image-input__input">
            <input type="file" id="#input__file" className="file__input" accept='.png, .jpg' onChange={(e) => onchange(e.target)} />

            <ImageIcon />
          </label>
      }
    </div>
  )
}

export default Image