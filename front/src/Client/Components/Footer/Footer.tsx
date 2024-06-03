import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { drimoAPI } from '../../../services/DrimoService'
import { Settings16Icon, TelegramIcon, VkIcon, WhatsAppIcon, YoutubeIcon } from '../../../UIkit/Icons'
import { LogoAlternate } from '../../../UIkit/Logo'

function Footer() {
  const navigate = useNavigate();
  let xhr = new XMLHttpRequest()
  xhr.open(
    'GET',
    'https://delaemit.ru/actions/logo.php?client=Drimo',
    true
  )
  xhr.send()

  xhr.onreadystatechange = function () {
    if (xhr.status === 200) {
      document.getElementById("delatimITLogo")!.innerHTML = xhr.responseText
    } else {
    }
  }

  const { data: categories } = drimoAPI.useFetchPopularCategoriesQuery('')

  const handleNavigateToConstructor = () => {
    if (process.env.NODE_ENV === 'development') {
      window.open('https://drimo.dev-2-tech.ru/constructor')
    } else
      window.open('https://drimo-design.com/constructor' )
  }

  const linkTo = () => {

    window.scrollTo( 0, 0 );
  }

  return (

    <footer className="footer">
      <div className="footer__container">
        <div className='footer__block footer__block_bordered'>
          <div className="footer__logo">
            <LogoAlternate />
          </div>

          <div className="footer__menus">
            <ul className="footer__list">
              <div className='footer__item footer__list-title'>Каталог</div>
              {
                categories && categories.slice(0, 4).map((category: any) => <Link to={`/catalog/${category.id}/${category.subcategory_id[category.subcategory_id.length - 1]}`} key={category.id} className='footer__item '>{category.title}</Link>)
              }

              {/* <Link to='/catalog' className='footer__item '>Полки</Link>
              <Link to='/catalog' className='footer__item '>Комоды и тумбы</Link>
              <Link to='/catalog' className='footer__item '>Столы</Link> */}
            </ul>
            <ul className="footer__list">
              <div className='footer__item footer__list-title'>О нас</div>
              <Link to='/contacts' className='footer__item '>Контакты</Link>
              <li className='footer__item '>Оплата и доставка</li>
              <li className='footer__item '>Помощь</li>
              <Link to='/about' className='footer__item '>О нас</Link>
            </ul>
          </div>

        </div>
        <div className='footer__block'>
          <div className="footer__contact">
            <h4 className="footer__phone">+ 7 (495) 186-61-45</h4>
            <h6 className="footer__email">drimo.example@mail.ru</h6>
            <div onClick={handleNavigateToConstructor} className="footer__button button button_primary">
              <Settings16Icon color="#FFFFFF" />
              <p>ПЕРЕЙТИ К КОНСТРУКТОРУ</p>
            </div>
          </div>
          <div className="footer__contact">
            <div className="item__socials socials-list socials-list_vertical">
              <div className="item__title">Мы в соц. сетях</div>
              <div className="socials">
                <div className="socials__item">
                  <VkIcon color="#ffffff" />
                </div>
                <div className="socials__item">
                  <YoutubeIcon color="#ffffff" />
                </div>
              </div>
            </div>
            <div className="item__socials socials-list">
              <div className="item__title">Связаться с нами</div>
              <div className="socials">
                <div className="socials__item">
                  <WhatsAppIcon color="#ffffff" />
                </div>
                <div className="socials__item">
                  <TelegramIcon color="#ffffff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='footer__footer'>
        <p>© 2022 DRIMO</p>
        <div className="footer__links">
          <Link to='/oferta' onClick={ () => linkTo() } className='footer__link'>Договор оферты</Link>
          <Link to='/confidential-policy' onClick={ () => linkTo() } className='footer__link'>Политика конфиденциальности</Link>
          <Link to='/exchange' onClick={ () => linkTo() } className='footer__link'>Политика обмена и возврата товаров</Link>
        </div>
        <div id='delatimITLogo' />
         <a className='footer__link' href="https://delaemit.ru/" target="_blank">Сделано в Студии ДЕЛАЕМ.</a> 
      </div>
    </footer>
  )
}

export default Footer