import React, { useState } from 'react'
import Checkbox from '../Inputs/RadioButton';

interface IProps {
    title: string,
    price?: number,
    info: string,
    period?: string,
    isPickpoint?: boolean,
    currentId: number,
    id: number,
    onPick: (id: number) => void,
}

function DeliveryCard(props: IProps) {

    const { title, price, period, info, isPickpoint, onPick, id, currentId } = props;

    return (
        <div className="delivery-card">
            <div className="checkbox-container" onClick={() => onPick(id)}>
                <Checkbox isActive={currentId === id} />
            </div>
            <div className="delivery-card__container">
                <div>
                    <div
                        className="delivery-card__info"
                        onClick={() => onPick(id)}
                    >
                        <div className="delivery-card__title">{title}</div>
                        <div className="delivery-card__description">{info}</div>
                    </div>
                    {
                        isPickpoint &&
                        <div className="delivery_card__pickpoint">
                            <div className="delivery-card__pick-point">Выберите пункт выдачи</div>
                        </div>
                    }
                </div>
                {
                    (price !== undefined && period !== undefined) && <div className="delivery-card__price-block">
                        <div className="delivery-card__price">{price === 0 ? 'Бесплатно' : `${price.toLocaleString()} ₽`} </div>
                        <div className="delivery-card__period">{period} дней</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DeliveryCard