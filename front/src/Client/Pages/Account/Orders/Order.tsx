import React from 'react'
import { Link } from 'react-router-dom'
import { getOrderDate } from '../../../../Helpers/getDate'
import { getImageFromJSON } from '../../../../Helpers/getImageFromJSON'
import { getStatus, getStatusColor } from '../../../../Helpers/getStatus'
import { RightSmallRedArrow } from '../../../../UIkit/Icons'

interface Order {
  id: number,
  created_at: string,
  price: number,
  status: number,
  solution_image: string,
}

interface IProps {
  order: Order
}

function Order({ order }: IProps) {

  const { id, created_at, status, price, solution_image } = order

  return (
    <div className="profile__order profile-order">
      <img src={getImageFromJSON(solution_image)} alt="" className="profile-order__image" />

      <div className="profile-order__body">
        <div className="profile-order__info">
          <div className="profile-order__left-side">
            <h6 className="profile-order__id">
              Заказ № {id}
            </h6>
            <p className="profile-order__date">
              {getOrderDate(created_at)}
            </p>
          </div>
          <div className="profile-order__right-side">
            <h6 className="profile-order__price">{price.toLocaleString()} ₽</h6>
            <div className="profile-order__status">
              <div className={`profile-order__status-circle profile-order__status-circle_${getStatusColor(String(status))}`} />
              <p>{getStatus(String(status))}</p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <Link to={`/order/` + id} className="button button_text">
            <p>Подробнее</p>
            <RightSmallRedArrow />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Order