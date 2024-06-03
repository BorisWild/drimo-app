import React from 'react'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'

interface Element {
    element_title: string,
    texture_name?: string,
    texture_image?: string,
    quantity: number,
    cost: number,
}

interface IProps {
    element: Element
}

function Element({ element }: IProps) {
    const { element_title, texture_name, texture_image, quantity, cost } = element
    return (
        <div className="order-specification__element spec-element">
            <div className="spec-element__info">
                <div className="spec-element__type">{element_title}</div>
                {texture_name && <div className="spec-element__material">
                    {texture_image && <img src={getImageFromJSON(texture_image)} alt="" className="spec-element__icon" />}
                    {texture_name && <div className="spec-element__material-title">{texture_name}</div>}
                </div>}
            </div>
            <div className="spec-element__container">
                <div className="spec-element__count">{quantity} шт</div>
                <div className="spec-element__price">
                    <div className="spec-element__sum">{quantity * cost} ₽</div>
                    <div className="spec-element__single">{cost} ₽ шт</div>
                </div>
            </div>

        </div>
    )
}

export default Element