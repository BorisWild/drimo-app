import React from 'react'
import { isStringLiteral } from 'typescript';
import { DataProps } from '../Table';

function getDate(date: string) {
  return date.slice(5, 7) + '.' + date.slice(8, 10) + '.' + date.slice(0, 4)
}

function getTime(date: string) {
  return date.slice(11, 13) + ':' + date.slice(14, 16)
}

function TableItem(data: DataProps) {
  const { payload, image, title, id, created, updated } = data
  return (
    <div className='table__item'>
      {
        image &&
        <div className="table__image-container">
          <img className='table__image' src={image} alt="" />
        </div>
      }
      <div className="table__payload">
        <div className="table__payload-item payload-item">
          <div className="payload-item__title">{title}</div>
          <div className="payload-item__subtitle">ID {id}</div>
        </div>
        {
          payload && payload.map((elem) => <div className='table__payload-item payload-item'>
            {
              typeof elem.value === 'string' ?
                <div className='payload-item__title'>{elem.value}</div> :
                <div className="">{elem.value}</div>
            }
          </div>)
        }
        {
          created &&
          <div className="payload-item payload-item_date-column">
            <div className="payload-item__title">{getDate(created)}</div>
            <div className="payload-item__subtitle">{getTime(created)}</div>
          </div>
        }
        {
          updated &&
          <div className="payload-item payload-item_date-column">
            <div className="payload-item__title">{getDate(updated)}</div>
            <div className="payload-item__subtitle">{getTime(updated)}</div>
          </div>
        }
      </div>
    </div>
  )
}

export default TableItem