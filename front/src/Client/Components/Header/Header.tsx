import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCookie } from '../../../Helpers/cookies'
import { ISubcategory } from '../../../models/ISubcategory'
import { drimoAPI } from '../../../services/DrimoService'
import { getAuthURL } from '../../../services/URL'
import { useAppDispatch } from '../../../store/hooks/redux'
import { modalSlice } from '../../../store/reducers/client/ModalSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { ArrowDownIcon, CatalogIcon, LeftSmallRedArrow, MenuIcon, SavedIcon, SettingsIcon, UserIcon } from '../../../UIkit/Icons'
import { Logo } from '../../../UIkit/Logo'
import MobileMenu from '../MobileMenu/MobileMenu'


function Header() {
  const [showCatalogMenu, setShowCatalogMenu] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showAboutMenu, setShowAboutMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showCatalog, setShowCatalog] = useState(false);
  const [openedTab, setOpenedTab] = useState(-1)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { changeLogin } = modalSlice.actions
  const [trigger] = drimoAPI.useLazyFetchAllSubcategoriesQuery()
  const { data: categories } = drimoAPI.useFetchAllCategoriesQuery('')
  const { notificate } = notificationsSlice.actions;
  const [subcats, setSubcats] = useState<ISubcategory[]>()
  function handleOpenMobileMenu() {
    setShowMobileMenu(!showMobileMenu)
    if (!Array.from(document.body.classList).includes('active') || showMobileMenu) {
      document.body.classList.toggle('active')
    }
  }

  function handleOpenMenu() {

    setShowCatalogMenu(!showCatalogMenu)
    if (!Array.from(document.body.classList).includes('active') || showCatalogMenu) {
      document.body.classList.toggle('active')
    }
    setShowAboutMenu(false)
    handleResetMenu()
  }

  function handleOpenAboutMenu() {
    setShowCatalogMenu(false)
    setShowAboutMenu(!showAboutMenu)
    if (!Array.from(document.body.classList).includes('active') || showAboutMenu) {
      document.body.classList.toggle('active')
    }

  }



  function handleResetMenu() {
    setOpenedTab(-1)
  }

  function navigateToSaved() {
    if (getCookie('userId')) {
      navigate('/saved')
    } else {
      dispatch(changeLogin(true))
    }
  }

  function handleOpenCatalog() {
    setShowCatalog(!showCatalog)
  }

  function handleOpenAbout() {
    setShowAbout(!showAbout)
  }

  const handleNavigateToConstructor = () => {
    if (process.env.NODE_ENV === 'development') {
      window.open('https://drimo.dev-2-tech.ru/constructor')
    } else
      window.open('https://drimo-design.com/constructor')
  }
  function handleNavigateFromMenu(to: string) {
    navigate(`${to}`)
    setShowMobileMenu(!showMobileMenu)
    setOpenedTab(-1)
    document.body.classList.toggle('active')

  }

  const handleNavigateToProfile = async () => {
    if (getCookie('apiToken')) {
      await axios.get(`${getAuthURL()}/user_data`,
        {
          headers: {
            Authorization: `Bearer ${getCookie('apiToken')}`,
            ID: `${getCookie('userId')}`
          }
        }
      )
        .then(({ data }) => {
          console.log(data)
          if (data) {
            navigate('/profile')
          } else {
            document.cookie = "apiToken="
            document.cookie = "userId="
            document.cookie = "refreshToken="
            dispatch(changeLogin(true))
          }
        })
        .catch((e) => { console.error(e); dispatch(notificate({ title: 'Ошибка', isShown: true })); })

    } else {
      dispatch(changeLogin(true))
    }
  }

  const handleOpenTab = async (id: number) => {

    if (categories) {
      if (id === openedTab) {
        setOpenedTab(-1)
      } else {
        setOpenedTab(-1)
        await trigger({ parent_id: categories.filter(el => el.children.length > 0)[id].id })
          .then((data) => { setSubcats(data.data); })
          .then(() => setOpenedTab(id))
          .catch((e) => console.error(e))
      }
    }
  }

  return (
    <header className='header'>

      <nav className="header__menu menu">
        <div onClick={handleOpenMenu} className="menu__item menu__item_blue-bg item">
          <CatalogIcon color="#ffffff" />
          <h6 className='item__title'>Каталог решений</h6>
        </div>
        <div onClick={handleNavigateToConstructor} className="menu__item menu__item_red-bg item">
          <SettingsIcon color="#ffffff" />
          <h6 className='item__title'>К конструктору</h6>
        </div>
        <div onClick={handleOpenAboutMenu} className="menu__item menu__item_black item item-about">
          <h6 className='item__title_right'>О нас</h6>
          <ArrowDownIcon rotate={showAboutMenu} color="#000000" />

          <div className={`item-about__menu-body ${showAboutMenu ? 'item-about__menu-body_active' : 'item-about__menu-body'}`}>
            <Link to="/about" className='item-about__item'>О нас</Link>
            <Link to="/" className="item-about__item">Оплата и доставка</Link>
            <Link to="/" className="item-about__item">Помощь</Link>
            <Link to="/contacts" className="item-about__item">Контакты</Link>
          </div>
        </div>
        <div onClick={handleOpenMobileMenu} className="menu__item-burger">
          <MenuIcon color="#000000" />
        </div>
        <div className={`mobile-menu ${showMobileMenu ? "mobile-menu_active" : ""}`}>
          {
            !showCatalog && !showAbout &&
            <>
              <div onClick={handleOpenCatalog} className="mobile-menu__item">
                <div className="mobile-menu__title">
                  Каталог решений
                </div>
              </div>
              <div className="mobile-menu__item">
                <div onClick={handleNavigateToConstructor} className="mobile-menu__title">
                  К конструктору
                </div>
              </div>
              <div className="mobile-menu__item">
                <div className="mobile-menu__title " onClick={handleOpenAbout}>
                  О нас
                </div>
                <div className="mobile-menu__list">
                  <div onClick={() => handleNavigateFromMenu('/about')} className="mobile-menu__list-item">О нас</div>
                  <div className="mobile-menu__list-item">Оплата и доставка</div>
                  <div className="mobile-menu__list-item">Помощь</div>
                  <div onClick={() => handleNavigateFromMenu('/contacts')} className="mobile-menu__list-item">Контакты</div>
                </div>
              </div>

            </>

          }
          {
            showCatalog &&
            <>
              <div onClick={handleOpenCatalog} className="button button_text">
                <LeftSmallRedArrow />
                меню
              </div>
              {
                categories && categories.filter(el => el.children.length > 0).map((el, index) =>

                  <div className="mobile-menu__item">
                    <div onClick={() => handleOpenTab(index)} className="mobile-menu__title">{el.title}</div>
                    {
                      subcats && subcats.length > 0 && <div className={`mobile-menu__list ${openedTab === index ? 'mobile-menu__list_active' : ''}`}>
                        {
                          subcats.map((elem: any) =>
                            <div
                              key={elem.id}
                              onClick={() => handleNavigateFromMenu('/catalog/' + el.id + '/' + elem.id)}
                              className="mobile-menu__list-item">
                              {elem.title} <div className="mobile-menu__list-counter">{elem.solutions.length}
                              </div>
                            </div>)
                        }

                      </div>
                    }
                  </div>
                )
              }
            </>
          }
          {
            showAbout &&
            <>
              <div onClick={handleOpenAbout} className="button button_text">
                <LeftSmallRedArrow />
                меню
              </div>
              <div className="mobile-menu__item">
                <div onClick={() => handleNavigateFromMenu('/about')} className="mobile-menu__title">О нас</div>
              </div>
              <div className="mobile-menu__item">
                <div onClick={() => handleNavigateFromMenu('/')} className="mobile-menu__title">Оплата и доставка</div>
              </div>
              <div className="mobile-menu__item">
                <div onClick={() => handleNavigateFromMenu('/')} className="mobile-menu__title">Помощь</div>
              </div>
              <div className="mobile-menu__item">
                <div onClick={() => handleNavigateFromMenu('/contacts')} className="mobile-menu__title">Контакты</div>
              </div>
            </>
          }

        </div>
      </nav>
      <div className={`header__catalog menu-catalog ${showCatalogMenu ? 'menu-catalog_active' : ''}`}>
        <div className="menu-catalog__body">
          {
            categories && categories.filter(el => el.children.length > 0).map((el, index) => <div key={el.id} className="menu-catalog__item">
              <div onClick={() => { handleOpenTab(index) }} className="menu-catalog__parent">{el.title}</div>



              {
                subcats && subcats.length > 0 &&
                <div className={`menu-catalog__children-list ${openedTab === index ? 'menu-catalog__children-list_active' : ''}`}>
                  {
                    subcats.map(elem =>
                      <Link to={`/catalog/${el.id}/${elem.id}`} key={elem.id} onClick={() => { setShowCatalogMenu(false); handleResetMenu(); document.body.classList.toggle('active') }} className="menu-catalog__children-item">{elem.title} <div className="label">{elem.solutions.length}</div></Link>
                    )
                  }
                </div>
              }


            </div>)
          }
        </div>
      </div>
      <div className="header-logo">
        <div className="header-logo__container">
          <Logo />
        </div>

      </div>
      <div className="header__user-buttons">
        <div onClick={navigateToSaved} className="header__user-button">
          <SavedIcon color="#000000" />
        </div>
        <div onClick={handleNavigateToProfile} className="header__user-button">
          <UserIcon color='#000000' />
        </div>
      </div>
      <div onClick={() => {
        setShowCatalogMenu(false)
        setShowAboutMenu(false)
        document.body.classList.toggle('active')
      }} className={`menu-bg ${showAboutMenu || showCatalogMenu ? 'menu-bg_active' : ''}`} />
    </header>

  )
}

export default Header