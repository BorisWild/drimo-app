import React, { useEffect, useState } from 'react'
import { FilterArrowIcon, RedArrowDownIcon } from '../Icons'
import Checkbox from '../Inputs/Checkbox'

interface IFilter {
  title?: string,
  type?: string,
  count?: number,
}

interface IProps {
  title: string,
  onchange?: any,
  filters: IFilter[]
  currentTypes?: string[],
}

function Filter(props: IProps) {
  const [isOpened, setOpened] = useState(false)
  const { title, filters, onchange, currentTypes } = props

  function handleToggleFilter() {
    setOpened(!isOpened)
  }

  useEffect(() => {

  }, [isOpened])

  return (
    <div className="filter">
      <div onClick={handleToggleFilter} className={`filter__button ${isOpened ? 'filter__button_active' : ''}`}>
        {title}
        <FilterArrowIcon isActive={isOpened} />
      </div>
      {
        isOpened && currentTypes ? <div className="filter__list">
          {
            filters.map((el, index) => <Checkbox currentType={currentTypes.includes(el.type!)} key={index} title={el.type} count={el.count} onchange={onchange} />)
          }
        </div> : <></>
      }

    </div>
  )
}

export default Filter