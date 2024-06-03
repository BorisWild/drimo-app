import React, { useEffect, useState } from 'react'
import { CheckIcon } from '../Icons';

interface IProps {
  title: string | undefined
  count?: number
  onchange?: any
  currentType?: boolean
}

function Checkbox(props: IProps) {
  const [isChecked, setChecked] = useState(false)
  const { title, count, onchange, currentType } = props;

  const handlePick = () => {
    onchange(title)
    setChecked(!isChecked)
  }

  useEffect(() => {

    if (currentType) {
      setChecked(true)
    }


  }, [])


  return (
    <div onClick={handlePick} className="checkbox">
      <div className={`checkbox__icon ${isChecked ? "checkbox__icon_active" : ''}`}>
        {
          isChecked ? <CheckIcon /> : <></>
        }
      </div>
      <div>{title}</div>

      {
        count !== undefined && <div className="label">
          {count}
        </div>
      }
    </div>

  )
}

export default Checkbox