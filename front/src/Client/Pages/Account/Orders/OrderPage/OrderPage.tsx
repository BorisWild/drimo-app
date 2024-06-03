import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getOrderDate } from '../../../../../Helpers/getDate'
import { getStatus, getStatusColor } from '../../../../../Helpers/getStatus'
import { SpecificationMock } from '../../../../../Mocks/Specification'
import { drimoAPI } from '../../../../../services/DrimoService'
import { useAppDispatch } from '../../../../../store/hooks/redux'
import { notificationsSlice } from '../../../../../store/reducers/NotificationsSlice'
import { DownRedArrow, LeftSmallRedArrow } from '../../../../../UIkit/Icons'
import OrderEntity from '../../../../Components/OrderEntity/OrderEntity'
import Specification from '../../../Order/Specification'
import { getImageFromJSON } from '../../../../../Helpers/getImageFromJSON';

function OrderPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    // const [solutionId, setSolutionId] = useState<number>()
    const dispatch = useAppDispatch()
    const { notificate } = notificationsSlice.actions;


    const { data: order, error: order_error } = drimoAPI.useFetchUserOrderQuery(id)
    const { data: solution, refetch, error: solution_error } = drimoAPI.useFetchSolutionQuery({ id: order ? order.solution_id : 0, param: '', order: '' })
    order_error || solution_error && dispatch(notificate({ title: 'Ошибка', isShown: true }));

    React.useEffect( () => {

        console.log( solution ); 

    }, [ solution ] );

    // function getStatus() {
    //     switch (order.status) {
    //         case 1: return 'Не оплачен'
    //         case 2: return 'Отменен'
    //         case 3: return 'Оплачен'
    //         default: {
    //             console.error('Такого статуса не существует')
    //             return ''
    //         }
    //     }
    // }

    // function getStatusColor() {
    //     if (order.status === 2) {
    //         return 'success'
    //     } else return 'failed'
    // }

    return (
        order ?
            <div className="order-page container">
                <div className="order-page__header">
                    <div className="button-container">
                        <div onClick={() => { navigate(-1) }} className="button button_text">
                            <LeftSmallRedArrow />
                            <p>Заказы</p>
                        </div>
                    </div>
                    <div className="page-title order-page__title">Заказ №{id}</div>
                    <div className="label">{getOrderDate(order.created_at)}</div>
                </div>
                <div className="order-page__body">
                    <div className="order-page__order">
                        <div className="order-page__info-container">
                            <div className="order-page__info-block">
                                <div className="order-page__label label">Способ оплаты</div>
                                {order.payment_name}
                            </div>
                            <div className="order-page__info-block">
                                <div className="order-page__label label ">Способ доставки</div>
                                {order.delivery_name}
                            </div>
                            <div className="order-page__info-block">
                                <div className="order-page__label label">Статус заказа</div>
                                <div className='profile-order__status'>
                                    <div className={`profile-order__status-circle profile-order__status-circle_${getStatusColor(order.status)}`} />
                                    {getStatus(order.status)}
                                </div>
                            </div>
                            <div className="order-page__info-block">
                                <div className="order-page__label label">Комментарии к заказу</div>
                                {order.comment}
                            </div>
                        </div>
                        <div className="summary-container summary-mobile order-page__summary ">
                            <div className="order__summary">
                                <div className="order__price order-price">
                                    <div className="order-price__container">
                                        <ul className="order-price__list">
                                            <li className='order-price__list-item'>
                                                <p className="list-item__title">Доставка</p>
                                                <p className="list-item__value">{order.delivery_price.toLocaleString()} ₽</p>
                                            </li>
                                            <li className='order-price__list-item'>
                                                <p className="list-item__title">Вес, кг</p>
                                                <p className="list-item__value">{(order.weight / 1000).toFixed(2)} кг</p>
                                            </li>
                                            <li className='order-price__list-item'>
                                                <p className="list-item__title">Кол-во деталей</p>
                                                <p className="list-item__value">{order.parts_number} шт.</p>
                                            </li>
                                        </ul>
                                        <div className="order-price__sum">
                                            <p className='order-price__sum-title'>Итого</p>
                                            <h3 className='order-price__sum-value'>{order.price.toLocaleString()} ₽</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-subtitle order-page__subtitle">Конструкции в заказе</div>
                        {
                            solution && <OrderEntity id={solution.id} isCopiable={true} title={solution.name} height={solution.height} width={solution.width} depth={solution.length} parts={solution.parts}  image={solution.image} />
                        }

                    </div>
                    <div className="summary-container order-page__summary ">
                        <div className="order__summary">
                            <div className="order__price order-price">
                                <div className="order-price__container">
                                    <ul className="order-price__list">
                                        <li className='order-price__list-item'>
                                            <p className="list-item__title">Доставка</p>
                                            <p className="list-item__value">{order.delivery_price.toLocaleString()} ₽</p>
                                        </li>
                                        <li className='order-price__list-item'>
                                            <p className="list-item__title">Вес, кг</p>
                                            <p className="list-item__value">{(order.weight / 1000).toFixed(2)} кг</p>
                                        </li>
                                        <li className='order-price__list-item'>
                                            <p className="list-item__title">Кол-во деталей</p>
                                            <p className="list-item__value">{order.parts_number} шт.</p>
                                        </li>
                                    </ul>
                                    <div className="order-price__sum">
                                        <p className='order-price__sum-title'>Итого</p>
                                        <h3 className='order-price__sum-value'>{order.price.toLocaleString()} ₽</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <></>
    )
}

export default OrderPage