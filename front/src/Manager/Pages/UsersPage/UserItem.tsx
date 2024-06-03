import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getDate, getTime } from '../../../Helpers/getDate';
import { ISort, SortParam } from '../../../models/ISort';
import { IUser } from '../../../models/IUser'

interface ItemProps {
  item: IUser,
  sorts: ISort[]
}

function UserItem({ item: { id, full_name, created_at, updated_at, phone, email, saved_constructions, orders }, sorts }: ItemProps) {
  // console.log(sorts)
  const navigate = useNavigate()

  function handleNavigateToCategory() {
    navigate('/manager/users/' + id)
  }

  return (
    <div className='table__item' onClick={handleNavigateToCategory}>
      <div className="table__payload">
        <div className="table__payload-item payload-item">
          <div className="payload-item__container">
            <div className="payload-item__title">{full_name ? full_name : 'Не заполнено'}</div>
            <div className="payload-item__subtitle">ID {id}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[1].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{phone ? phone : 'Не заполнено'}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[2].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{email ? email : 'Не заполнено'}</div>

          </div>
        </div>
        <div className='table__payload-item payload-item payload-item_date-column'>
          <div className="payload-item__sort">
            {sorts[3].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{orders ? orders.length : 0}</div>

          </div>
        </div>
        <div className='table__payload-item payload-item payload-item_date-column'>
          <div className="payload-item__sort">
            {sorts[4].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{saved_constructions ? saved_constructions.length : 0}</div>

          </div>
        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__sort">
            {sorts[5].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(updated_at)}</div>
            <div className="payload-item__subtitle">{getTime(updated_at)}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__sort">
            {sorts[6].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(created_at)}</div>
            <div className="payload-item__subtitle">{getTime(created_at)}</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserItem