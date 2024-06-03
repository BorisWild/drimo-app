import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'
import { TagsHomeMock, TagsMock } from '../../../Mocks/Tags'
import { ISolution } from '../../../models/ISolution'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch } from '../../../store/hooks/redux'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { ArrowRightIcon } from '../../../UIkit/Icons'
import TagsList from '../../../UIkit/Tags/TagsList'
import CatalogCard from '../Catalog/Card/Card'
import InteriorSolution from './InteriorSolution'

function Home() {
    // const { data: saved } = drimoAPI.useFetchSavedSolutionsQuery({ type: '', page: 0, })
    const [activeTag, setActiveTag] = useState(0)
    const { data: popular_categories, error: categories_error } = drimoAPI.useFetchPopularSubcategoriesQuery('')
    const { data: popular_solutions, error: solutions_error } = drimoAPI.useFetchPopularSolutionsQuery('')

    const dispatch = useAppDispatch()
    const { notificate } = notificationsSlice.actions

    categories_error || solutions_error && dispatch(notificate({ title: 'Ошибка', isShown: true }))

    const handlePickTag = (index: number) => {
        setActiveTag(index)
    }

    let slider = document.getElementById('slider')
    let width = window.innerWidth * 0.583333
    const handleScrollLeft = () => {

        document.getElementById('slider')!.scrollLeft -= width;
        // console.log(slider.scrollLeft)
    }

    const handleScrollRight = () => {

        document.getElementById('slider')!.scrollLeft += width;
        // console.log(slider.scrollLeft)
    }
    const handleNavigateToConstructor = () => {
        if (process.env.NODE_ENV === 'development') {
            window.open('https://drimo.dev-2-tech.ru/constructor')
        } else
            window.open('https://drimo-design.com/constructor')
    }

    return (

        popular_categories ? <main className='main'>
            <div className="main__cta cta">
                <div className="cta__text-block">
                    <h1 className='cta__title'>Drimo</h1>
                    <h3 className="cta__description">
                        <span className='red-text'>Конструктор мебели</span>, в котором нет ограничений. <br />
                        Вы выбираете самостоятельно, где и какого цвета будут ящики, дверцы и полки.
                    </h3>
                </div>
                <div className="cta__image-container">
                    <img className="cta__image" src='../assets/video-preview.png' alt="" />
                </div>
            </div>
            <div className="main-menu menu">
                <div onClick={handleNavigateToConstructor} className="main-menu__item item main-menu__item_large main-menu__item_red-bg">
                    <div>
                        <h2 className='item__title'>Создать мебель</h2>
                        <p className='item__description'>Создайте свой шкаф с нуля в конфигураторе</p>
                    </div>
                    <img className="item__image" src="../assets/contsructor-illustration.png" alt="" />
                    <ArrowRightIcon color='#ffffff' />
                </div>
                <div className="main-menu__item item main-menu__item_large main-menu__item_blue-bg">
                    <div>
                        <h2 className='item__title'>Каталог решений</h2>
                        <div className="tags">

                            <TagsList tags={popular_categories.filter((el: any) => el.solution_objects.length > 0).map((el: any) => ({
                                title: el.title,
                                count: el.sol_num,
                                link: `/catalog/${el.category_id}/${el.id}`,
                            }))} type="tinted" />


                        </div>

                    </div>

                </div>
                <Link to="/about" className="main-menu__item main-menu__item_yellow-bg item">
                    <div>
                        <h2 className='item__title'>О нас</h2>
                        <p className='item__description'>Наша история, ценности, команда</p>
                    </div>
                    <ArrowRightIcon color='#000000' />
                </Link>
            </div>
            {
                popular_categories ?
                    <div className="main__popular-categories popular-categories">
                        <div className="page-title">Популярные категории&nbsp;<span className="red-text">{popular_categories[activeTag].title}</span></div>
                        <TagsList tags={
                            popular_categories.filter((el: any) => el.solution_objects.length > 0).map((el: any) => ({
                                title: el.title,
                                count: el.sol_num,
                            }))
                        } onclick={handlePickTag} activeTag={activeTag} type={'default'} />
                        <div className="popular-categories__container">
                            <div className="popular-categories__solution">
                                <div className="catalog__body">
                                    <div className="catalog__list">
                                        <div className="catalog__card catalog-card catalog-card_video">
                                            <div className="catalog-card__image-container">
                                                <video preload='auto' loop muted autoPlay src={getImageFromJSON(popular_categories[activeTag].video_link)}></video>
                                            </div>
                                        </div>
                                        <CatalogCard
                                            card={{ ...popular_categories[activeTag].solution_objects[0], title: popular_categories[activeTag].solution_objects[0].name, id: popular_categories[activeTag].solution_objects[0].solution_id }}

                                        />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div> : <></>
            }

            <div className="main__popular-solutions popular-solutions">
                <div className="page-title">Популярные решения</div>
                <div className="popular-solutions__container">
                    {
                        popular_solutions && popular_solutions.map((el: any, index: number) =>
                            <CatalogCard
                                card={{ id: el.id, title: el.title, width: el.width, length: el.length, height: el.height, weight: el.weight, image: el.image }}
                                key={index}

                            />
                        )
                    }
                </div>
            </div>

            <div className="main__interior interior">
                <div className="page-title">Наши решения в интерьере</div>
                <div className="interior__slider slider">
                    <div id="slider" className="slider__container">
                        <InteriorSolution />
                        <InteriorSolution />
                        <InteriorSolution />
                        <InteriorSolution />
                        <InteriorSolution />
                        <InteriorSolution />
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
            </div>
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
        </main> : <></>
    )
}

export default Home