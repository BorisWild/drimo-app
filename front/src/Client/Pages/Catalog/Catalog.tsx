import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'
import { CardsListMock } from '../../../Mocks/Catalog'
import { TagsMock } from '../../../Mocks/Tags'
import { ISubcategory } from '../../../models/ISubcategory'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch } from '../../../store/hooks/redux'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import Breadcrumbs from '../../../UIkit/Breadcrumbs/Breadcrumbs'
import { RedArrowDownIcon } from '../../../UIkit/Icons'
import Pagination from '../../../UIkit/Pagination/Pagination'
import TagsList from '../../../UIkit/Tags/TagsList'
import CatalogCard from './Card/Card'
import CardsList from './CardsList/CardsList'

function Catalog() {
    const navigate = useNavigate()

    const [currentPage, setPage] = useState(0)
    const { parent_id } = useParams()
    const { id } = useParams()
    const { data: category, error: category_error } = drimoAPI.useFetchCategoryQuery(parent_id)
    const { data: categories, error: categories_error } = drimoAPI.useFetchAllSubcategoriesQuery({ parent_id, param: '', order: '' })
    const { data: catalog, error: catalog_error } = drimoAPI.useFetchCatalogQuery({ id, page: currentPage + 1 })
    const { data: subcategory, error: subcategory_error } = drimoAPI.useFetchSubcategoryQuery(id)
    const { data: saved } = drimoAPI.useFetchSavedSolutionsQuery({ type: '', page: 0, })
    const dispatch = useAppDispatch()
    const { notificate } = notificationsSlice.actions;
    const location = useLocation()
    category_error || categories_error || catalog_error || subcategory_error && dispatch(notificate({ title: 'Ошибка', isShown: true }));
    const [isLoaded, setLoaded] = useState(false)
    const [chosenTag, setChosenTag] = useState(0)

    useEffect(() => {
        if (categories) {
            if (categories.indexOf(categories.find((el: any) => el.id == id)!) > 0) {
                setChosenTag(categories!.indexOf(categories!.find((el: any) => el.id == id)!))
            } else {
                setChosenTag(0)
            }

            setLoaded(true)
        }
    }, [categories, isLoaded, location.pathname])

    const handlePickPage = (index: number) => {
        setPage(index)
    }

    const handleClickTag = (index: number) => {
        setChosenTag(index)
        navigate('/catalog/' + parent_id + '/' + categories![index].id)
    }

    return (
        categories && categories[chosenTag] && category && subcategory && catalog && isLoaded ?
            <main className="catalog container">
                <div className="catalog__header">
                    <Breadcrumbs data={
                        [
                            {
                                id: 1,
                                title: 'Главная',
                                link: '/'
                            },
                            {
                                id: 2,
                                title: category.title,
                            },
                            {
                                id: 3,
                                title: categories[chosenTag].title,
                            }
                        ]
                    } />
                    <div className="catalog__tags tags">
                        {
                            <TagsList
                                onclick={handleClickTag}
                                activeTag={chosenTag}
                                tags={categories!.map((el) => ({ title: el.title, count: el.solutions.length }))}
                                type='default'
                            />
                        }
                    </div>
                    <div className="catalog__title page-title">{categories[chosenTag].title} <div className="title-counter">{categories[chosenTag].solutions.length}</div></div>
                    <div className="catalog__hint hint">
                        <p className='hint__text'>Выберите готовое решение и измените под себя в конфигураторе</p>
                        <RedArrowDownIcon />
                    </div>
                </div>
                <div className="catalog__body">
                    <div className="catalog__list">
                        <div className="catalog__card catalog-card catalog-card_video">
                            <div className="catalog-card__image-container">
                                <video preload='auto' loop muted autoPlay src={getImageFromJSON(subcategory.video_link)}></video>
                            </div>
                        </div>
                        {
                            catalog.rows.map((card: any, index: number) => <CatalogCard key={index} card={{ ...card }} />)
                        }
                    </div>
                </div>
                <div className="catalog__pagination">
                    <Pagination total={Math.ceil(catalog.total / 19)} onclick={handlePickPage} current={currentPage} />
                </div>
            </main> : <></>
    )
}

export default Catalog