import { title } from 'process'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getDate, getTime } from '../../../Helpers/getDate'
import { IDelivery } from '../../../models/IDelivery'
import { IPayment } from '../../../models/IPayment'
import { ISort } from '../../../models/ISort'

interface PaymentProps {
  payment: IPayment,
  sorts: ISort[]
}

function PaymentItem({ payment: { id, title, created_at, updated_at }, sorts }: PaymentProps) {
  const navigate = useNavigate()

  function handleNavigateToPayments() {
    navigate('/admin/payment/' + id)
  }

  return (
    <div className='table__item' onClick={handleNavigateToPayments}>
      <div className="table__payload">
        <div className="table__payload-item payload-item">

          <div className="payload-item__container">
            <div className="payload-item__title">{title}</div>
            <div className="payload-item__subtitle">ID {id}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__sort">
            {sorts[1].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{getDate(updated_at)}</div>
            <div className="payload-item__subtitle">{getTime(updated_at)}</div>
          </div>

        </div>
        <div className="payload-item payload-item_date-column">
          <div className="payload-item__sort">
            {sorts[2].params[0].param}
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

export default PaymentItem