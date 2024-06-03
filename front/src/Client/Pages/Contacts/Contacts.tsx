import React from 'react'
import { MapPinIcon, TelegramIcon, VkIcon, WhatsAppIcon, YoutubeIcon } from '../../../UIkit/Icons'

function Contacts() {
    return (
        <main className="contacts container">
            <h1 className="contacts__title page-title">
                Контакты
            </h1>
            <div className="contacts__body">
                <div className="contacts__item item item_red-bg">
                    <p className="item__title">Телефон</p>
                    <h2 className="item__contact">+ 7 (495) 186-61-45</h2>
                    <div className="item__socials socials-list">
                        <div className="item__title">Связаться с нами</div>
                        <div className="socials">
                            <div className="socials__item">
                                <WhatsAppIcon color="#ffffff" />
                                <p className='social__title'>WhatsApp</p>
                            </div>
                            <div className="socials__item">
                                <TelegramIcon color="#ffffff" />
                                <p className='social__title'>Telegram</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contacts__item item item_blue-bg">
                    <p className="item__title">E-mail</p>
                    <h2 className="item__contact">drimo.example@mail.ru</h2>
                    <div className="item__socials socials-list">
                        <div className="item__title">Социальные сети</div>
                        <div className="socials">
                            <div className="socials__item">
                                <VkIcon color="#ffffff" />
                                <p className='social__title'>ВКонтакте</p>
                            </div>
                            <div className="socials__item">
                                <YoutubeIcon color="#ffffff" />
                                <p className='social__title'>YouTube</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contacts__address">
                <div className="contacts__item item">
                    <p className="item__title">Адрес</p>
                    <h2 className="item__contact item__contact-address">г. Москва, Ленинградский проспект, 80,корп. 16., подъезд 5 Метро Сокол</h2>
                </div>
                <div className="contacts__map-container">
                    <iframe className='map' src="https://yandex.ru/map-widget/v1/?um=constructor%3A0b3951c96a857667471ef9133d182b74d631df56fe664ef7228c50cc3a2c6ae0&amp;source=constructor" width="100%" height="100%" frameBorder="0" />
                    <MapPinIcon />
                </div>
            </div>

        </main>
    )
}

export default Contacts