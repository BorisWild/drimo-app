import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LeftSmallRedArrow } from '../../../UIkit/Icons';

interface IProps {
  isActive: boolean,
}

//
//   ДАННЫЙ КОМПОНЕНТ ВРЕМЕННО ОТКЛЮЧЕН В УГОДУ СКОРОСТИ РАЗРАБОТКИ. НЕТ ВРЕМЕНИ НА ЕГО ДОРАБОТКИ.
//


function MobileMenu(props: IProps) {
  const { isActive } = props;
  const [showMenu, setShowMenu] = useState(false)
  const [showCatalog, setShowCatalog] = useState(false);
  const [openedTab, setOpenedTab] = useState(-1)
  const navigate = useNavigate()
  let mobileMenu = document.querySelector('.mobile-menu')

  // useEffect(() => {
  //   setShowMenu(isActive)
  // }, [isActive])

  function handleOpenCatalog() {
    setShowCatalog(!showCatalog)

  }

  function handleNavigateFromMenu(to: string) {
    navigate(`${to}`)
    setShowMenu(!showMenu)
  }

  function handleOpenTab(id: number) {

  }

  return (
    <div className={`mobile-menu ${showMenu ? "mobile-menu_active" : ""}`}>
      {
        !showCatalog ?
          <>
            <div onClick={handleOpenCatalog} className="mobile-menu__item">
              <div className="mobile-menu__title">
                Каталог решений
              </div>
            </div>
            <div className="mobile-menu__item">
              <div className="mobile-menu__title">
                К конструктору
              </div>
            </div>
            <div className="mobile-menu__item">
              <div className="mobile-menu__title mobile-menu__title_unactive">
                О нас
              </div>
              <div className="mobile-menu__list">
                <div onClick={() => handleNavigateFromMenu('/about')} className="mobile-menu__list-item">О нас</div>
                <div className="mobile-menu__list-item">Оплата и доставка</div>
                <div className="mobile-menu__list-item">Помощь</div>
                <div onClick={() => handleNavigateFromMenu('/contacts')} className="mobile-menu__list-item">Контакты</div>
              </div>
            </div>

          </> :
          <>
            <div onClick={handleOpenCatalog} className="button button_text">
              <LeftSmallRedArrow />
              меню
            </div>
            <div className="mobile-menu__item">
              <div className="mobile-menu__title">Стеллажи</div>
            </div>
            <div className="mobile-menu__item">
              <div className="mobile-menu__title">Комоды и тумбы</div>
            </div>
            <div className="mobile-menu__item">
              <div className="mobile-menu__title">Полки</div>
            </div>
            <div className="mobile-menu__item">
              <div className="mobile-menu__title">Столы</div>
            </div>
          </>
      }

    </div>

  )
}

export default MobileMenu