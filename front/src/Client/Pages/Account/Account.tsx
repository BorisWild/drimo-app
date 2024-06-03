import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExitIcon, OrdersIcon, UserIcon } from '../../../UIkit/Icons'
import AccountSection from './AccountSection'

function Account() {

    const [currentMenuItem, setCurrentMenuItem] = useState(0)
    const navigate = useNavigate()



    const handleLogout = async () => {
        document.cookie = "apiToken="
        document.cookie = "userId="
        document.cookie = "refreshToken="
        navigate('/')
    }

    return (
        <main className="profile container">
            <div className="profile__title page-title">Личный кабинет</div>
            <div className="profile__body">
                <div className="profile__menu profile-menu">
                    <div className="profile-menu__container">
                        <div onClick={() => setCurrentMenuItem(0)} className={`profile-menu__item ${currentMenuItem === 0 ? 'profile-menu__item_active' : ''}`}>
                            <OrdersIcon color="#000000" />
                            <p className="profile-menu__title">Заказы</p>
                        </div>
                        <div onClick={() => setCurrentMenuItem(1)} className={`profile-menu__item ${currentMenuItem === 1 ? 'profile-menu__item_active' : ''}`}>
                            <UserIcon color="#000000" />
                            <p className="profile-menu__title">Персональные данные</p>
                        </div>
                        <div className='profile-menu__item' onClick={handleLogout}>
                            <ExitIcon color="#000000" />
                            <p className="profile-menu__title" >Выйти</p>
                        </div>
                    </div>

                </div>
                <AccountSection section={currentMenuItem} />
            </div>
        </main>
    )
}

export default Account