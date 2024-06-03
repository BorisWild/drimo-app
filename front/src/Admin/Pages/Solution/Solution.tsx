import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import PartItem from './PartItem'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
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

function Solution() {

  const { order, param } = useAppSelector(state => state.catalogSortReducer)
  const { changeSort } = catalogSortSlice.actions
  const navigate = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [isLoaded, setLoaded] = useState(false)
  const { data: solution, refetch } = drimoAPI.useFetchSolutionQuery({ id, order, param })
  const [updateSolution, { error: updateError, data: updateData }] = drimoAPI.useUpdateSolutionMutation()
  const [deleteSolution, { error: deleteError, data: deleteData }] = drimoAPI.useDeleteSolutionMutation()
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  const { changeDelete } = modalSlice.actions
  const [validTitle, setValidTitle] = useState(false)

  updateError || deleteError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  let formData: any = new FormData()
  useEffect(() => {
    if (solution) {
      setLoaded(true)
      setTitle(solution.name)
      console.log(solution)
    }

  }, [isLoaded, solution])

  useEffect(() => {
    refetch()
  }, [order, param])

  const handleChangeInput = (value: string) => {
    setTitle(value)
    setValidTitle(false)
  }

  const handleDeleteSolution = async () => {
    dispatch(changeDelete({ type: 'Готовое решение', isOpened: true, id: id, backLink: -1 }))
  }

  const handleUpdateSolution = async () => {

    formData.set('id', id)
    formData.set('title', String(title))
    formData.set('image', solution?.image)
    formData.set('file', solution?.file)
    formData.set('ar_file', solution?.ar_file)
    formData.set('subcategory_id', solution?.subcategory_id)
    formData.set('length', solution?.length)
    formData.set('user_id', solution?.user_id)
    formData.set('height', solution?.height)
    formData.set('width', solution?.width)
    formData.set('weight', solution?.weight)


    if (title.length > 0) {
      await updateSolution({ formData, id })
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
      refetch()
    } else {
      setValidTitle(true)
    }

  }

  const handleNavigateToConfigurator = () => {
    if (process.env.NODE_ENV === 'development') {
      window.open('https://drimo.dev-2-tech.ru/constructor?id=' + id)
    } else
      window.open('https://drimo-design.com/constructor?id=' + id)
  }

  return (
    <div className='category solution'>
      <div className="button-container">
        <div onClick={() => navigate(-1)} className="button button_text">
          <LeftSmallRedArrow />
          Подкатегория
        </div>
      </div>
      <div className="page-title">{solution && solution.name}</div>
      <div className="category__data">
        <div className="label">ID: {id}</div>
        <div className="label">Посл. изменение: {solution && getDate(solution.updated_at)}</div>
        <div className="label">Добавлено: {solution && getDate(solution.created_at)}</div>
      </div>
      <div className="category__inputs">
        <div className="category__title-input solution-input">
          <Input title="Название" isRequired={true} isLittle={false} value={title} onchange={handleChangeInput} length={30} valid={validTitle} />
        </div>
        <div className="solution__image">
          <div className="solution__image-label label">Фото <RequiredIcon /></div>
          <div className="solution__image-container">
            <img src={solution && getImageFromJSON(solution.image)} alt="" />
          </div>
        </div>
      </div>
      <div className="page-subtitle">Конфигуратор</div>
      <div className="category__configurator">
        <div className="category__info-block">
          <div className="label">Длина, мм</div>
          {solution?.length}
        </div>
        <div className="category__info-block">
          <div className="label">Ширина, мм</div>
          {solution?.width}
        </div>
        <div className="category__info-block">
          <div className="label">Высота, мм</div>
          {solution?.height}
        </div>
        <div className="category__info-block">
          <div className="label">Вес, г</div>
          {solution?.weight}
        </div>
      </div>
      <div className="category__add-button">
        <div className="button-container">
          <div className="button button_secondary3" onClick={handleNavigateToConfigurator}>
            <div className="button__secondary3-icon">
              <Settings16Icon color='white' />
            </div>
            Изменить в конфигураторе
          </div>
        </div>
      </div>
      <div className="page-subtitle">Спецификация решения <div className="title-counter">{solution?.parts.length}</div></div>
      <MobileSort sort={SpecificationSort} action={changeSort} currentSort={param} />

      <div className="category__table table">
        <TableSort sort={SpecificationSort} action={changeSort} currentSort={param} />
        <div className="table__body">
          {
            solution?.parts.map((part: IElement) =>
              <PartItem
                element={part}
                sorts={SpecificationSort}
              />
            )
          }
        </div>
      </div>
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleUpdateSolution}>СОХРАНИТЬ</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={handleDeleteSolution}>УДАЛИТЬ</div>
        </div>
      </div>

    </div>
  )
}

export default Solution