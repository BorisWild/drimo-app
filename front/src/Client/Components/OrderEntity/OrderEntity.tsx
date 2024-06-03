import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { drimoAPI } from '../../../services/DrimoService';
import { DownRedArrow } from '../../../UIkit/Icons';
import Specification from '../../Pages/Order/Specification';
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON';
import './orderstyles.css';

interface PartProps {
  element_title: string,
  texture_name?: string,
  texture_image?: string,
  quantity: number,
  cost: number,
}

interface IOrderProps {
  id: number,
  title: string,
  height: number,
  width: number,
  depth: number,
  parts: PartProps[],
  image: string,
  isCopiable: boolean,
}

function OrderEntity(props: IOrderProps) {

  const { id } = useParams()

  const navigate = useNavigate()

  const { title, height, width, depth, parts, image, isCopiable } = props;
  const [showSpecification, setShowSpecification] = useState(false)
  const [createSaved] = drimoAPI.useCreateSavedSolutionMutation();


  function getFinalPrice() {
    let _price = 0;
    for (let part of parts) {
      _price += part.quantity * part.cost
    }
    return _price
  }

  const handleSaveSolution = async () => {
    await createSaved(props.id)
  }

  const takeInstruction = () => {

    navigate( '/order/'+id+'/instruction/'+props.id );

  }

  return (
    <div className="order-entity">
      <div className="order-entity__image order-entity__image_desktop">
        <div className="order-entity__image-container">
          <img className="order-entity__image-item" src={getImageFromJSON(image)} alt="" />
        </div>
      </div>
      <div className="order-entity__body">
        <div className="order-entity__header">
          <div className="order-entity__image order-entity__image_mobile">
            <div className="order-entity__image-container">
              <img className="order-entity__image-item" src={getImageFromJSON(image)} alt="" />
            </div>
          </div>
          <div className="order-entity__info-container">
            <div className="order-entity__info">
              <div className="order-entity__title">{title}</div>
              <div className="order-entity__dimensions label">{height} x {width} x {depth} мм</div>
            </div>
            <div className="order-entity__price">
              {getFinalPrice()} ₽
            </div>
          </div>


        </div>
        {
          parts.length > 0 && <div className="order-entity__specification">
            <Specification data={parts} isActive={showSpecification} />
            <div className="button-container">
              <div onClick={() => setShowSpecification(!showSpecification)} className="button button_text">
                <div>
                  {showSpecification ? 'Скрыть спецификацию' : 'Показать спецификацию'}
                </div>
                <DownRedArrow isActive={showSpecification} />
              </div>
            </div>
            {
              isCopiable &&
              <div className="order-entity__copy">
                <div className="button-container">
                  <div className="button button_secondary" onClick={handleSaveSolution}>копировать решение*</div>
                </div>
                <div className="label">*Копия конструкции появится на странице <Link to="/saved" className='red-text'>“Сохраненные решения”</Link></div>
              </div>
            }

            <div className="order_inctruction-btn" onClick={ () => takeInstruction() }>

              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="38" height="38" fill="#E92627"/>
                <path d="M15 27V13H21.6667L25 16V27H15Z" stroke="white" strokeWidth="2"/>
                <path d="M21 13V17H25" stroke="white" strokeWidth="2"/>
                <rect x="1" y="1" width="38" height="38" stroke="#E92627" strokeWidth="2"/>
              </svg>

              <span>ИНСТРУКЦИЯ ПО СБОРКЕ</span>

            </div>


          </div>
        }

      </div>
    </div>
  )
}

export default OrderEntity