import React, { useState } from 'react'
import { SelectArrowIcon, RequiredIcon } from '../Icons'

interface IOption {
  title: string,
  id: number,
}

interface IProps {
  title: string,
  isRequired: boolean,
  placeholder: string,
  options: IOption[],
  onchange?: any,
  valid?: boolean,
} 

function Select(props: IProps) {
  const { title, isRequired, placeholder, options, onchange, valid } = props
  const [isOpened, setOpened] = useState(false)
  function handleToggleSelect() {
    setOpened(!isOpened)
  }
  return (
    <div className="select">
      <div className="select__container">
        <div className="label select__label">{title}
          {
            isRequired ? <RequiredIcon /> : <></>
          }
        </div>
        <div onClick={handleToggleSelect} className={`select__input ${isOpened ? 'select__input_active' : ''}`}>
          {placeholder}
          <SelectArrowIcon isActive={isOpened} />
        </div>
        {
                valid && <div className="input__validation">Поле обязательно</div>
            }
        <div className={`select__list ${isOpened ? 'select__list_active' : ''}`}>
          {
            options.map(option => <div key={option.id} onClick={() => {
              onchange(option.title)
              handleToggleSelect()
            }} className="select__list-item">{option.title}</div>)
          }
        </div>
      </div>

    </div>
  )
}

export default Select