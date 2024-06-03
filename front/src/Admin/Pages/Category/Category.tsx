import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDate } from '../../../Helpers/getDate'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { modalSlice } from '../../../store/reducers/client/ModalSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { AddIcon, LeftSmallRedArrow, PlusCircleIcon, SortIcon } from '../../../UIkit/Icons'
import Input from '../../../UIkit/Inputs/Input'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'
import TableSort from '../../../UIkit/TableFilter/TableSort'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import TableRow from '../../../UIkit/TableRow/TableRow'
import CategoryItem from './CategoryItem'


const CategorySort = [
  {
    params: [
      {
        param: 'Название',
        isSortable: true,
        id: 'sort_title',
      },
      {
        param: 'ID',
        isSortable: true,
        id: 'sort_id',
      }
    ]
  },
  {
    params: [
      {
        param: 'Решений, шт',
        isSortable: true,
        id: 'sort_solutions',
      },
    ]
  },
  {
    params: [
      {
        param: 'Посл. изменение',
        isSortable: true,
        id: 'sort_update_at',
      },
    ]
  },
  {
    params: [
      {
        param: 'Добавлено',
        isSortable: true,
        id: 'sort_create_at',

      },
    ]
  }
]

function Category() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { order, param } = useAppSelector(state => state.catalogSortReducer)
  const { data: subcategories, isLoading: subcategoriesLoading, error: subcategoriesError, refetch: refetchSubcategories } = drimoAPI.useFetchAllSubcategoriesQuery({ parent_id: id, order, param })
  const { data: category, isLoading: categoryLoading, error: categoryError, refetch } = drimoAPI.useFetchCategoryQuery(id)
  const [deleteCategory, { error: deleteCategoryError, data: deleteData }] = drimoAPI.useDeleteCategoryMutation()
  const [updateCategory, { error: updateCategoryError, data: updateData }] = drimoAPI.useUpdateCategoryMutation()
  const [title, setTitle] = useState('')
  const [isLoaded, setLoaded] = useState(false)
  const { changeSort } = catalogSortSlice.actions
  const { changeDelete } = modalSlice.actions
  const dispatch = useAppDispatch()
  const [validTitle, setValidTitle] = useState(false)
  const { deleteOpened } = useAppSelector(state => state.modalReducer)
  const { notificate } = notificationsSlice.actions
  subcategories && console.log(subcategories)
  subcategoriesError || categoryError || deleteCategoryError || updateCategoryError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  const handleDeleteCategory = async () => {
    dispatch(changeDelete({ type: 'Категорию', isOpened: true, id: id,  backLink: '/admin/catalog' }))
  }

  const handleUpdateCategory = async () => {
    if (title.length > 0) {
      await updateCategory({ ...category, title: title })
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
      refetch()
    }
    else {
      setValidTitle(true)
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }
  }

  const handleChangeTitle = (value: string) => {
    setValidTitle(false)
    setTitle(value)
  }

  const handleAddSubcategory = () => {
    navigate('/admin/catalog/category/' + id + '/add')
  }

  useEffect(() => {
    if (category) {
      setLoaded(true)
      setTitle(category.title)
    }

  }, [isLoaded, category])

  useEffect(() => {
    refetchSubcategories()
  }, [order, param])

  return (
    <div className='category'>
      <div className="category__header">
        <div className="button-container">
          <div onClick={() => navigate('/admin/catalog')} className="button button_text">
            <LeftSmallRedArrow />
            Категории
          </div>
        </div>
        <div className="page-title">{category && category.title}</div>
        <div className="category__data">
          <div className="label">ID: {id}</div>
          {category && <div className="label">Посл. изменение: {getDate(category.updated_at)}</div>}
          {category && <div className="label">Добавлено: {getDate(category.created_at)}</div>}
        </div>
      </div>
      <div className="category__title-input">
        <Input title="Название" isRequired={true} isLittle={false} value={title} onchange={handleChangeTitle} valid={validTitle} length={30} />
      </div>
      <div className="page-subtitle">Подкатегории<div className="title-counter">{subcategories ? subcategories.length : 0}</div></div>
      <div className="category__add-button">
        <div className="button-container">
          <div className="button button_secondary3" onClick={handleAddSubcategory}>
            <div className="button__secondary3-icon">
              <AddIcon color={'white'} />
            </div>
            Добавить
          </div>
        </div>
      </div>
      {
      subcategories && subcategories.length > 0 && <MobileSort sort={CategorySort} action={changeSort} currentSort={param} />

      }

      {
        subcategories && subcategories.length > 0 &&
        <div className="category__table table">
          <TableSort sort={CategorySort} action={changeSort} currentSort={param} />
          <div className="table__body">
            {
              subcategories.map((subcategory: any) =>
                <CategoryItem
                  sorts={CategorySort}
                  subcategory={subcategory}
                />
              )
            }
          </div>
        </div>
      }
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleUpdateCategory}>СОХРАНИТЬ</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={handleDeleteCategory}>УДАЛИТЬ</div>
        </div>
      </div>

    </div>
  )
}

export default Category