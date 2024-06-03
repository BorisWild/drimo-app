import React, { useEffect } from 'react'
import { getImageFromJSON } from '../../../../Helpers/getImageFromJSON';
import { drimoAPI } from '../../../../services/DrimoService';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice';
import WishlistButton from '../../../../UIkit/WishlistButton/WishlistButton';
import { getUrl } from '../../../../services/URL';

function CatalogCard(props: any) {
    const { card, onclick } = props;
    const [deleteSaved, { error: deleteError }] = drimoAPI.useDeleteSavedSolutionMutation()
    const [createSaved, { error: createError }] = drimoAPI.useCreateSavedSolutionMutation();
    const dispatch = useAppDispatch()
    const { notificate } = notificationsSlice.actions;
    const { data: saved, refetch } = drimoAPI.useFetchSavedSolutionsQuery({ type: '', page: 0, })

    deleteError || createError && dispatch(notificate({ title: 'Ошибка', isShown: true }));
    const checkSaved = (id: number) => {
        if (saved && saved.rows && saved.rows.find((element: any) => element.solution_id === id)) {
            return true
        } else return false
    }
    const handleToggleSaved = async (id: number) => {

        if (checkSaved(id)) {

            await deleteSaved(saved.rows.find((element: any) => element.solution_id === id).id)

        } else {
            await createSaved(id)
        }
        refetch()
    }

    const redirectToConstructor = () => {

        const url = 'https://drimo.dev-2-tech.ru/';

        window.location.href = url + 'constructor?id='+card.id;

    }

    return (
        card ?
            <div className="catalog__card catalog-card">
                {
                    <WishlistButton isSaved={checkSaved(card.id)} onclick={() => { handleToggleSaved(card.id) }} />
                }
                <div className="catalog-card__image-container">
                    <img className='catalog-card__image' src={getImageFromJSON(card.image)} alt="" />
                </div>
                {
                    card.title && card.width && card.height && card.length &&
                    <div className="catalog-card__data-block" style={ { 'cursor' : 'pointer' } }  onClick={ () => redirectToConstructor() }>
                        <h6 className="catalog-card__title">{card.title}</h6>
                        <p className="catalog-card__dimensions">{card.width} x {card.height} x {card.length} мм</p>
                    </div>
                }

            </div> : <></>
    )
}

export default CatalogCard