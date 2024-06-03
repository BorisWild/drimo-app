import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../Helpers/cookies'
import { CatalogIcon, CloseIcon, DeliveryIcon, ExitIcon, MenuIcon, PlusCircleIcon, RoubleCircleIcon, SettingsIcon, TexturesIcon } from '../../../UIkit/Icons'
import { Logo } from '../../../UIkit/Logo'

interface MenuItem {
  title: string,
  link: string,
  icon: any,
}

interface IProps {
  items: MenuItem[]
}

function Sidebar(props: IProps) {
  const [isMenuOpened, setMenuOpened] = useState(false)
  const [currentMenuItem, setMenuItem] = useState(0)
  const { items } = props;
  
  const location = useLocation()
  function handleToggleMenu() {
    setMenuOpened(!isMenuOpened)

  }

  const handleLogout = () => {
    if (location.pathname.includes('/admin')) {
      deleteCookie('apiTokenAdmin')
      deleteCookie('userIdAdmin')
      deleteCookie('refreshTokenAdmin')
    }
    if (location.pathname.includes('/manager')) {
      deleteCookie('apiTokenManager')
      deleteCookie('userIdManager')
      deleteCookie('refreshTokenManager')
    }
  }

  const getLocation = () => {
    if (location.pathname.includes('/admin/catalog')) {
      return 0
    }
    if (location.pathname.includes('/admin/restrictions')) {
      return 1
    }
    if (location.pathname.includes('/admin/textures')) {
      return 2
    }
    if (location.pathname.includes('/admin/filling')) {
      return 3
    }
    if (location.pathname.includes('/admin/delivery')) {
      return 4
    }
    if (location.pathname.includes('/admin/payment')) {
      return 5
    }
    if (location.pathname.includes('/manager/users')) {
      return 0
    }
    if (location.pathname.includes('/manager/orders')) {
      return 1
    }
    if (location.pathname.includes('/manager/solutions')) {
      return 2
    }
    else return 0
  }

  useEffect(() => {
    setMenuItem(getLocation())
  }, [])

  return (
    <nav className="admin__sidebar sidebar">
      <div className="sidebar__menu-mobile sidebar-mobile-menu">
        <div className="sidebar-mobile-menu__logo">
          <Logo />
        </div>
        <div onClick={handleToggleMenu} className={`sidebar-mobile-menu__burger-button ${isMenuOpened ? 'sidebar-mobile-menu__burger-button_active' : ''}`}>
          {
            isMenuOpened ? <CloseIcon color={'white'} /> : <MenuIcon color={'black'} />
          }
        </div>
        <div className={`sidebar-mobile-menu__body ${isMenuOpened ? 'sidebar-mobile-menu__body_active' : ''}`}>
          {
            items && items.map((item, index) => (
              <Link key={index} onClick={() => { handleToggleMenu(); setMenuItem(index) }} to={item.link} className={`sidebar__item ${index === currentMenuItem ? 'sidebar__item_active' : ''}`}>
                {item.icon}
                <div className="sidebar__title">
                  {item.title}
                </div>
              </Link>
            ))
          }
          <Link to="/" className="sidebar__item" onClick={handleLogout}>
            <ExitIcon color={'black'} />
            <div className="sidebar__title">Выйти</div>
          </Link>
        </div>
      </div>
      <div className="sidebar__menu-desktop">
        <div className="sidebar__logo">
          <Logo />
        </div>
        {
          items && items.map((item, index) => (
            <Link key={index} onClick={() => { setMenuItem(index) }} to={item.link} className={`sidebar__item ${index === currentMenuItem ? 'sidebar__item_active' : ''}`}>
              {item.icon}
              <div className="sidebar__title">
                {item.title}
              </div>
            </Link>
          ))
        }
        <Link to="/" className="sidebar__item" onClick={handleLogout}>
          <ExitIcon color={'black'} />
          <div className="sidebar__title">Выйти</div>
        </Link>
      </div>

    </nav>
  )
}

export default Sidebar