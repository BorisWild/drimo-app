import React, { useState } from 'react'
import { useAppDispatch } from '../../store/hooks/redux';
import { SortArrowIcon } from '../Icons';

interface IProps {
  title: string,
  isActive: boolean,
  isSortable: boolean,
  id?: string,
  action?: any,
}

function Sort(props: IProps) {
  const { title, isActive, isSortable, action, id } = props;
  const dispatch = useAppDispatch();
  const [currentSort, setSort] = useState('desc')
  // const [currentActive, setActive] = useState(isActive)

  function handleChangeSort() {
    if (isSortable) {
      if (isActive) {
        if (currentSort === 'desc') {
          console.log(1)
          setSort('asc')
          dispatch(action({ param: id, order: 'asc' }))

        } else {
          console.log(2)

          dispatch(action({ param: '', order: '' }))
          setSort('')
        }
      } else {
        console.log(3)
        setSort('desc')
        dispatch(action({ param: id, order: 'desc' }))
      }
    }

  }

  return (
    <div onClick={handleChangeSort} className={`sort ${isActive ? 'sort_active' : ''}`}>
      <div className={`sort__title `}>{title} {isSortable}</div>
      {
        isSortable === false ? <></> : <SortArrowIcon sort={isActive ? currentSort : 'desc'} color={isActive ? '#E92627' : '#A5A5A5'} />
      }

    </div>
  )
}

export default Sort