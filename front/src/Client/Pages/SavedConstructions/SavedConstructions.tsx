import { type } from 'os'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../../../Helpers/cookies'
import { SavedCardsListMock } from '../../../Mocks/SavedConst'
import { TagsMock } from '../../../Mocks/Tags'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch } from '../../../store/hooks/redux'
import { modalSlice } from '../../../store/reducers/client/ModalSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import Pagination from '../../../UIkit/Pagination/Pagination'
import TagsList from '../../../UIkit/Tags/TagsList'
import SavedList from './SavedList/SavedList'

function SavedConstructions() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { notificate } = notificationsSlice.actions;
    const { changeLogin } = modalSlice.actions

    const [currentType, setType] = useState('')
    const [chosenTag, setTag] = useState(0)
    const [currentPage, setPage] = useState(0)

    const [ stateTypes, setStateTypes ] = useState( [ { type : 'Без категории', solution_num : 0 } ] );

    const { data: saved, error: saved_error, refetch } = drimoAPI.useFetchSavedSolutionsQuery({ page: currentPage, type: currentType })
    const { data: types, error: types_error, refetch: refetchSaved } = drimoAPI.useFetchSavedSolutionsTypesQuery('')   

    useEffect( () => {

        if ( saved_error || types_error ){
            dispatch(notificate({ title: 'Ошибка', isShown: true }));
        }

    }, [saved_error, types_error ] )

    


    const handleDeleteSaved = async () => {
        refetchSaved()
        refetch()

    }

    const handleSetTag = (index: number) => {

        console.log( 'index: ' + index );

        setTag(index)
    }

    useEffect(() => {
        if (getCookie('userId')) {

        } else {
            navigate('/')
            dispatch(changeLogin(true))
        }
    }, [])

    useEffect( () => {

        if ( types && types.length ){

            setStateTypes( [ ...types, { type : 'Без категории', solution_num : 0 } ] ); 

        }

    }, [types] );

    useEffect(() => {

        if (types && types.length) {

            console.log( 'chosenTag: ' + chosenTag );

            if (types.length === chosenTag) {

                console.log('Нажали на последний тег!');
                setType(types[chosenTag])
            } else {
                setType(types[chosenTag].type)
            }
        }
    }, [chosenTag, currentType, types])

    useEffect(() => {

        console.log( 'currentType: ' + currentType );

        refetch()
    }, [currentType])

    const getSum = () => {
        if (types) {
            let sum = 0;
            for (let i = 0; i < types.length; i++) {
                sum += Number(types[i].solution_num)
            }
            return sum
        }

    }

    saved && console.log(saved)
    return (
        saved ?
            <div className="saved container">
                <div className="saved__header">
                    <div className="saved__title page-title">
                        Сохраненные конструкции
                        <div className="title-counter">{getSum()}</div></div>
                    <div className="saved__tags tags">
                        {
                            stateTypes && stateTypes.length > 0 ? <TagsList tags={ stateTypes.map((el: any, index: number) => ({ title: el.type, count: el.solution_num, isActive: chosenTag === index }))} type='default' activeTag={chosenTag} onclick={handleSetTag} /> :
                                <div className="page-subtitle">Нет сохраненных конструкций</div>
                        }
                    </div>
                </div>
                <div className="saved__catalog catalog">
                    <div className="catalog__body">
                        {
                            <SavedList data={saved.rows} onclick={handleDeleteSaved} />
                        }
                    </div>
                    {
                        saved.total !== 0 &&
                        <div className="catalog__pagination">
                            <Pagination total={Math.ceil(saved.total / 10)} onclick={setPage} current={currentPage} />
                        </div>
                    }

                </div>
            </div> : <></>
    )
}

export default SavedConstructions