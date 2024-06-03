import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../../UIkit/Breadcrumbs/Breadcrumbs'
import { RedArrowDownIcon } from '../../../UIkit/Icons'
import { ITag } from '../../../UIkit/Tags/Tag'
import TagsList from '../../../UIkit/Tags/TagsList'

const MenuTags = [
    {
        title: 'Проект DRIMO',
        hash: ''
    },
    {
        title: 'Идея',
        hash: '#about-idea'

    },
    {
        title: 'LEGO в мире мебели',
        hash: '#about-lego'

    },
    {
        title: 'Простота',
        hash: '#about-simplicity'

    },
    {
        title: 'Как это работает',
        hash: '#about-how'

    },
]

function handleScrollIntoView(id: string) {
    const element = document.getElementById(id)

    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    };
}
const handleScrollLeft = () => {

    document.getElementById('slider')!.scrollLeft -= 1144;
    // console.log(slider.scrollLeft)
}

const handleScrollRight = () => {

    document.getElementById('slider')!.scrollLeft += 1144;
    // console.log(slider.scrollLeft)
}
function About() {
    return (
        <div className="about container">
            <Breadcrumbs data={[{ id: 1, link: '/', title: 'Главная' }, { id: 2, title: 'О нас' }]} />
            <div className="about__wrapper" >
                <div className="about__nav-container">
                    <div className="about__nav">
                        <div className="page-subtitle">О нас</div>
                        <TagsList tags={MenuTags} onclick={handleScrollIntoView} type={'default'} />
                    </div>
                </div>

                <div className="about__body">
                    <div className="about__section about__hero about-hero">
                        <div className="about-hero__title">
                            <div className="page-title">Проект DRIMO</div>
                            <div className="about-hero__image-container">
                                <img className="about-hero__image" src="../assets/video-preview.png" alt="" />
                            </div>
                        </div>
                        <div className="about-hero__description">конструктор мебели, в котором нет ограничений. Вы выбираете самостоятельно, где и какого цвета будут ящики, дверцы и полки. </div>
                    </div>
                    <div id="#about-idea" />
                    <div className="about__section about__idea about-idea" >
                        <div className="about-idea__header">
                            <div className="page-title">Идея</div>
                            <div className="about-idea__hint">
                                История идеи проекта
                                <RedArrowDownIcon />
                            </div>
                        </div>
                        <div className="about-idea__comics" id="slider">
                            <div className="about-idea__comics-flow">
                                <img src="../assets/comics/drimo2-01.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-02.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-03.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-04.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-05.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-06.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-07.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-08.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-09.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-10.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-11.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-12.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-13.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-14.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-15.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-16.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-17.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-18.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-19.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-20.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-21.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-22.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-23.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-24.png" alt="" className="about-idea__comics-image" />
                                <img src="../assets/comics/drimo2-25.png" alt="" className="about-idea__comics-image" />
                            </div>
                        </div>
                        <div className="slider__controls">
                            <div className="slider__button" onClick={() => handleScrollLeft()}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 3.5L5.5 8.5L10.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="square" />
                                </svg>

                            </div>
                            <div className="slider__button" onClick={() => handleScrollRight()}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 13.5L10.5 8.5L5.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="square" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div id="#about-lego" />
                    <div className="about__section about__lego about-lego">
                        <div className="about-lego__header">
                            <div className="page-title">DRIMO - это LEGO в мире мебели</div>
                        </div>
                        <div className="about-lego__body">
                            <div className="about-lego__pit">
                                <div className="about-lego__description">
                                    Проект DRIMO вдохновлен стилем Питера Мондриана с элементарными линиями и формами. Все гениальное просто.
                                </div>
                                <div className="about-lego__image-block">
                                    <div className="about-lego__image-container">
                                        <img className='about-lego__image' src="../assets/pitmondrian.png" alt="" />
                                    </div>
                                    <div className="about-lego__image-hint">Пит Мондриан</div>
                                </div>
                            </div>
                            <div className="about-lego__images">
                                <div className="about-lego__image-block">
                                    <div className="about-lego__image-container">
                                        <img className='about-lego__image' src="../assets/painting1.png" alt="" />
                                    </div>
                                    <div className="about-lego__image-hint">Серый ромб с четырьмя линиями </div>
                                </div>
                                <div className="about-lego__image-block">
                                    <div className="about-lego__image-container">
                                        <img className='about-lego__image' src="../assets/painting2.png" alt="" />
                                    </div>
                                    <div className="about-lego__image-hint">Композиция с красным, желтым и синим</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="#about-simplicity" />
                    <div className="about__section about__simplicity about-simplicity" id="#about-simplicity">
                        <div className="about-simplicity__title page-title">
                            Мебель, собранная в конструкторе - это набор нескольких простых деталей: каркаса, коннекторов и панелей.<span className='red-text'>Что это дает?</span>
                        </div>
                        <div className="about-simplicity__advantages">
                            <div className="about-simplicity__single-advantage">
                                <div className="page-subtitle">компактная упаковка</div>
                                <div className="about-simplicity__description">
                                    Мебель приедет в компактной коробке. Для доставки не нужны грузчики
                                </div>
                            </div>
                            <div className="about-simplicity__single-advantage">
                                <div className="page-subtitle">Конструктор</div>
                                <div className="about-simplicity__description">
                                    Мебель легко пересобирается в любую другую конструкцию
                                </div>
                            </div>
                            <div className="about-simplicity__single-advantage about-simplicity__single-advantage_active">
                                <div className="page-subtitle">Простая сборка</div>
                                <div className="about-simplicity__description">
                                    Мебель собирается из дома без специального инструмент. Справится жена и ребенок.
                                </div>
                                <div className="about-simplicity__description">
                                    Прочитайте отдельно про <Link to="/about">ТЕХНИКУ СБОРКИ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="#about-how" />
                    <div className="about__section about__how about-how" id="#about-how">
                        <div className="about-how__header">
                            <div className="page-title">Просто, как все гениальное</div>
                            <div className="about-how__description">Команда DRIMO получила патент на наше изобретение - коннектор в виде алюминиевого куба для соединения каркаса мебели.</div>
                        </div>
                        <div className="about-how__how-block">
                            <div className="page-subtitle">Как это работает:</div>
                            <div className="about-how__videos">
                                <div className="about-how__video-container">
                                    <img src="../assets/video-preview.png" alt="" className="about-how__video" />
                                    <div className="about-how__video-description">Каркас мебели собирается из коннекторов и профилей</div>
                                </div>
                                <div className="about-how__video-container">
                                    <img src="../assets/video-preview.png" alt="" className="about-how__video" />
                                    <div className="about-how__video-description">Каркас заполняется панелями, полками, дверцами и ящиками</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About