import React, { useRef } from 'react'
import { AddIcon, RequiredIcon } from '../Icons';
import FilePreview from './FilePreview';

interface IProps {
  name: string,
  title: string,
  isSmall: boolean,
  isRequired: boolean,
  types: string[],
  onchange?: any,
  children?: any,
  valid?: boolean,
}

function File(props: IProps) {
  const { name, title, isSmall, isRequired, types, onchange, children, valid } = props;
  return (
    <div className="file">
      <div className="label file__label">{name}
        {
          isRequired && <RequiredIcon />
        }
      </div>
      <div className="file__input-container">
        {children}
        {
          !children && <label className='file__input-label'>
            <AddIcon color={'#E92627'} />
            {title}
            <input type="file" id="#input__file" className="file__input" onChange={(e) => { console.log(e.target.files); onchange(e.target) }} accept={types.join(', ')} />
          </label>
        }

      </div>
      {
        valid && <div className="input__validation">Поле обязательно</div>
      }

    </div>
  )
}

export default File