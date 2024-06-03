import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getDate, getTime } from '../../../Helpers/getDate';
import { getStatus, getStatusColor } from '../../../Helpers/getStatus';
import { ICategory } from '../../../models/ICategory'
import { IOrder } from '../../../models/IOrder';
import { ISort } from '../../../models/ISort';
import { useAppDispatch } from '../../../store/hooks/redux';
import { orderSlice } from '../../../store/reducers/manager/OrderSlice';

interface OrderItemProps {
  order: IOrder,
  link: string,
  sorts: ISort[]
}

function OrderItem({ order, link, sorts }: OrderItemProps) {
  const { address, comment, created_at, delivery_method_name, id, payment_method_name, price, solution_id, solution_name, status, updated_at } = order;
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { changeOrder } = orderSlice.actions
  function handleNavigateToOrder() {
    navigate(link)
    dispatch(changeOrder(order))
  }

  return (
    <div className='table__item' onClick={handleNavigateToOrder}>
      <div className="table__payload">
        <div className="table__payload-item payload-item">
          <div className="payload-item__container">
            <div className="payload-item__title">Заказ №{id}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
          <div className="payload-item__sort">
            {sorts[1].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{solution_name}</div>
            <div className="payload-item__subtitle">{solution_id}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
        <div className="payload-item__sort">
            {sorts[2].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>
              <div className='profile-order__status'>
                <div className={`profile-order__status-circle profile-order__status-circle_${getStatusColor(status)}`} />
                {getStatus(status)}
              </div>
            </div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
        <div className="payload-item__sort">
            {sorts[3].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{price} ₽</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
        <div className="payload-item__sort">
            {sorts[4].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{payment_method_name}</div>
          </div>

        </div>
        <div className='table__payload-item payload-item'>
        <div className="payload-item__sort">
            {sorts[5].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className='payload-item__title'>{delivery_method_name}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
        <div className="payload-item__sort">
            {sorts[6].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(updated_at)}</div>
            <div className="payload-item__subtitle">{getTime(updated_at)}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
        <div className="payload-item__sort">
            {sorts[7].params[0].param}
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

export default OrderItem