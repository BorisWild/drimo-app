import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDate } from '../../../Helpers/getDate'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'
import { IElement } from '../../../models/IElement'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'

import { LeftSmallRedArrow, AddIcon, Settings16Icon, RequiredIcon } from '../../../UIkit/Icons'
import File from '../../../UIkit/Inputs/File'
import Input from '../../../UIkit/Inputs/Input'
import TableSort from '../../../UIkit/TableFilter/TableSort'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import TableRow from '../../../UIkit/TableRow/TableRow'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import PartItem from '../../../Admin/Pages/Solution/PartItem'
import axios from 'axios'
import { getCookie } from '../../../Helpers/cookies'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { modalSlice } from '../../../store/reducers/client/ModalSlice'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'


const SpecificationSort = [
  {
    params: [
      {
        param: 'Деталь',
        isSortable: true,
        id: 'sort_title'
      },
      {
        param: 'ID',
        isSortable: true,
        id: 'sort_id'

      }
    ]
  },
  {
    params: [
      {
        param: 'Текстура',
        isSortable: true,
        id: 'sort_texture'
      },
    ]
  },
  {
    params: [
      {
        param: 'Кол-во, шт',
        isSortable: true,
        id: 'sort_quantity'
      },
    ]
  },
  {
    params: [
      {
        param: 'Вес, г',
        isSortable: true,
        id: 'sort_weight'
      },
    ]
  },
  {
    params: [
      {
        param: 'Цена',
        isSortable: true,
        id: 'sort_cost'
      },
    ]
  },
]

function UserOrderSolution() {

  const { order, param } = useAppSelector(state => state.catalogSortReducer)
  const { changeSort } = catalogSortSlice.actions
  const navigate = useNavigate()
  const { sol_id: id } = useParams()
  const [title, setTitle] = useState('')
  const [validTitle, setValidTitle] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const { data: solution, error: solutionError, refetch } = drimoAPI.useFetchSolutionQuery({ id, order, param })
  const [updateSolution, { error: updateError, data: updateData }] = drimoAPI.useUpdateSolutionMutation()
  const [deleteSolution, { error: deleteError, data: deleteData }] = drimoAPI.useDeleteSolutionMutation()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { changeDelete } = modalSlice.actions
  const { notificate } = notificationsSlice.actions
  updateError || deleteError || solutionError && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  let formData: any = new FormData()
  solution && console.log(solution)
  useEffect(() => {

    if (solution) {
      setLoaded(true)
      setTitle(solution.name)
      console.log(solution)
    }

  }, [isLoaded, solution])

  useEffect(() => {
    refetch()
  }, [order, param, id])




  const handleChangeInput = (value: string) => {
    setTitle(value)
    setValidTitle(false)
  }

  const handleDeleteSolution = async () => {
    dispatch(changeDelete({ type: 'Готовое решение', isOpened: true, id: id, backLink: -1 }))

    // await deleteSolution(id)
    // dispatch(notificate({ title: 'Удалено', isShown: true }))
    // navigate(-1)
  }

  const handleUpdateSolution = async () => {
    formData.set('id', id)
    formData.set('title', String(title))

    if (title.length > 0) {
      await updateSolution({ formData, id })
      refetch()
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
    }else{
      dispatch(notificate({ title: 'Ошибка', isShown: true }));
      setValidTitle(true)
    }    

  }

  const handleNavigateToConstructor = () => {
    if (process.env.NODE_ENV === 'development') {
        window.open('https://drimo.dev-2-tech.ru/constructor?id=' + id)
    } else
        window.open('https://drimo-design.com/constructor?id=' + id)
}

  return (
    solution ?
      <div className='category solution'>
        <div className="button-container">
          <div onClick={() => navigate(-1)} className="button button_text">
            <LeftSmallRedArrow />
            {
              location.pathname.includes('order') ? 'Заказ' : 'Созданные решения'
            }
          </div>
        </div>
        <div className="page-title">{solution.name}</div>
        <div className="category__data">
          <div className="label">ID: {id}</div>
          <div className="label">Посл. изменение: {getDate(solution.updated_at)}</div>
          <div className="label">Добавлено: {getDate(solution.created_at)}</div>
        </div>
        <div className="category__inputs">
          <div className="category__title-input solution-input">
            <Input title="Название" isRequired={true} isLittle={false} value={title} onchange={handleChangeInput} length={30} valid={validTitle} />
          </div>
          <div className="solution__image">
            <div className="solution__image-label label">Фото <RequiredIcon /></div>
            <div className="solution__image-container">
              <img src={getImageFromJSON(solution.image)} alt="" />
            </div>
          </div>
          {/* <File name={'Фото'} title={'Добавить фото'} isSmall={false} isRequired={true} types={['.png', '.jpg']} /> */}
        </div>
        <div className="page-subtitle">Конфигуратор</div>
        <div className="category__configurator">
          <div className="category__info-block">
            <div className="label">Длина, мм</div>
            {solution.length}
          </div>
          <div className="category__info-block">
            <div className="label">Ширина, мм</div>
            {solution.width}
          </div>
          <div className="category__info-block">
            <div className="label">Высота, мм</div>
            {solution.height}
          </div>
          <div className="category__info-block">
            <div className="label">Вес, г</div>
            {solution.weight}
          </div>
        </div>
        <div className="category__add-button">
          <div className="button-container">
            <div className="button button_secondary3" onClick={handleNavigateToConstructor}>
              <div className="button__secondary3-icon">
                <Settings16Icon color='white' />
              </div>
              Изменить в конфигураторе
            </div>
          </div>
        </div>
        <div className="page-subtitle">Спецификация решения <div className="title-counter">{solution.parts.length}</div></div>
        {solution.parts.length > 0 ? <MobileSort sort={SpecificationSort} action={changeSort} currentSort={param} /> : <></>}

        {
          solution.parts.length > 0 ? <div className="category__table table">
            <TableSort sort={SpecificationSort} action={changeSort} currentSort={param} />
            <div className="table__body">
              {
                solution.parts.map((part: IElement) =>
                  <PartItem
                    element={part}
                    sorts={SpecificationSort}
                  />
                )
              }
            </div>
          </div> : <></>
        }

        <div className="category__buttons">
          <div className="button-container">
            <div className="button button_primary" onClick={handleUpdateSolution}>СОХРАНИТЬ</div>
          </div>
          {
            !location.pathname.includes('order') ? <div className="button-container">
              <div className="button button_secondary" onClick={handleDeleteSolution}>УДАЛИТЬ</div>
            </div> : <></>
          }

        </div>

      </div> : <></>
  )
}

export default UserOrderSolution