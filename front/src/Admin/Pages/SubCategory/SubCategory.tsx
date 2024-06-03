import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TagsMock } from '../../../Mocks/Tags'
import { LeftSmallRedArrow, AddIcon, RequiredIcon } from '../../../UIkit/Icons'
import File from '../../../UIkit/Inputs/File'
import Input from '../../../UIkit/Inputs/Input'
import TagsList from '../../../UIkit/Tags/TagsList'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import TableRow from '../../../UIkit/TableRow/TableRow'
import { drimoAPI } from '../../../services/DrimoService'
import { getDate } from '../../../Helpers/getDate'
import TableSort from '../../../UIkit/TableFilter/TableSort'
import CategoryItem from '../Category/CategoryItem'
import SubcategoryItem from './SubcategoryItem'
import { ISolution } from '../../../models/ISolution'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import FilePreview from '../../../UIkit/Inputs/FilePreview'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { modalSlice } from '../../../store/reducers/client/ModalSlice'
import { visitParameterList } from 'typescript'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'

const SolutionsSort = [
  {
    params: [
      {
        param: 'Фото',
        isSortable: false,
        id: '.'
      },
    ]
  },
  {
    params: [
      {
        param: 'Название',
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
        param: 'Длина, мм',
        isSortable: true,
        id: 'sort_length'
      },
    ]
  },
  {
    params: [
      {
        param: 'Ширина, мм',
        isSortable: true,
        id: 'sort_width'

      },
    ]
  },
  {
    params: [
      {
        param: 'Высота, мм',
        isSortable: true,
        id: 'sort_height'

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
        param: 'Посл. изменение',
        isSortable: true,
        id: 'sort_updated_at'

      },
    ]
  },
  {
    params: [
      {
        param: 'Добавлено',
        isSortable: true,
        id: 'sort_created_at'

      },
    ]
  }
]

function SubCategory() {

  const { order, param } = useAppSelector(state => state.catalogSortReducer)
  const { changeSort } = catalogSortSlice.actions

  const navigate = useNavigate()
  const { id } = useParams()

  const { parent_id } = useParams()
  const [updateSubcategory, { error: updateSubcatError, data: updateSubcatData }] = drimoAPI.useUpdateSubcategoryMutation()
  const { data: subcategory, isLoading: subcategoryLoading, error: subcategoryError, refetch } = drimoAPI.useFetchSubcategoryQuery(id)
  const { data: subcategories, error: subcategoriesError, } = drimoAPI.useFetchAllSubcategoriesQuery({ parent_id, param, order })
  const { data: solutions, error: solutionsError } = drimoAPI.useFetchSolutionsByIdQuery({ id, param, order })
  const [video, setVideo] = useState<string | File>('')
  const [title, setTitle] = useState('')
  const [isLoaded, setLoaded] = useState(false)
  const dispatch = useAppDispatch()
  const { changeDelete } = modalSlice.actions
  const [validTitle, setValidTitle] = useState(false)
  const { notificate } = notificationsSlice.actions

  // subcategoryError || subcategoriesError || solutionsError || updateSubcatError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  let tags: any = []
  let formData = new FormData()

  subcategories && subcategories.map((subcat: any) => tags.push({ title: subcat.title, link: `/admin/catalog/${parent_id}/category/${subcat.id}`, count: subcat.solutions.length }))

  const handleDeleteSubcategory = async () => {
    dispatch(changeDelete({ type: 'Подкатегорию', isOpened: true, id: id, backLink: '/admin/catalog/' + parent_id }))
  }

  const handleUpdateSubcategory = async () => {
    formData.set('title', title)
    formData.set('parent_id', String(parent_id))
    video && formData.set('video', video)
    if (title.length > 0) {
      dispatch(notificate({ title: 'Загрузка видео', isShown: true }))
      await updateSubcategory({ id, formData }).then( (resp) => {
        console.log(resp);

        const keys = Object.keys( resp );

        if ( keys[0] === 'error' ){
          dispatch(notificate({ title: 'Ошибка', isShown: true }))
        } else {
          dispatch(notificate({ title: 'Сохранено', isShown: true }))
          refetch()
        }
        
      } ).catch( (err) => {
        console.log(err);
        dispatch(notificate({ title: 'Ошибка', isShown: true }))
      } ); 
      
    } else {
      setValidTitle(true)
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }

  }

  const handleAddSolution = () => {
    navigate(`/admin/catalog/${parent_id}/category/${id}/add`)
  }

  const handleChangeTitle = (value: string) => {
    setTitle(value)
    setValidTitle(false)
  }

  const handleAddVideo = (input: any) => {
    if (input.files[0].type === 'video/mp4') {
      const urlObj = URL.createObjectURL(input.files[0])
      const vid = document.createElement('video')
      vid.src = urlObj
      vid.muted = true
      console.log(vid)
      try {
        vid.play().then(() => {
          setVideo(input.files[0])
          vid.pause()
          vid.remove()
          console.log(vid)
        }).catch(() => { dispatch(notificate({ title: 'Ошибка', isShown: true })) })
      } catch {
        dispatch(notificate({ title: 'Ошибка', isShown: true }))
      }


    } else {
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }
  }

  useEffect(() => {

    console.log(solutions);

    if (subcategory) {
      // console.log(subcategory)
      setLoaded(true)
      setTitle(subcategory.title)
      setVideo(subcategory.video_link)
    }

  }, [isLoaded, subcategory, solutions])

  return (
    <div className='category'>
      <div className="category__header">
        <div className="button-container">
          <div onClick={() => navigate('/admin/catalog/' + subcategory.parent_id)} className="button button_text">
            <LeftSmallRedArrow />
            Категория
          </div>
        </div>
        {subcategory && tags.length > 0 && <div className="category__tags">

          <TagsList tags={tags} type='default' activeTag={tags.indexOf(tags.find((el: { title: any }) => el.title === subcategory.title))} />

        </div>}
        <div className="page-title">{subcategory && subcategory.title}</div>
        <div className="category__data">
          <div className="label">ID: {id}</div>
          <div className="label">Посл. изменение: {subcategory && getDate(subcategory.updated_at)}</div>
          <div className="label">Добавлено: {subcategory && getDate(subcategory.created_at)}</div>
        </div>
      </div>
      <div className="category__inputs">
        <div className="category__title-input">
          <Input title="Название" isRequired={true} isLittle={false} value={title} onchange={handleChangeTitle} length={30} valid={validTitle} />
        </div>
        {
          video ?

            <div className="solution__image">
              <div className="solution__image-label label">Видео</div>
              <FilePreview title={subcategory.title} size={0} link={(typeof video === 'string') && getImageFromJSON(video)} ondelete={() => { setVideo('') }} />
            </div>
            : <File name={'Видео'} title={'Добавить видео'} isSmall={false} isRequired={false} types={['.mp4']} onchange={handleAddVideo} />
        }

      </div>

      <div className="page-subtitle">Готовые решения<div className="title-counter">{solutions && solutions.length}</div></div>
      <div className="category__add-button">
        <div className="button-container">
          <div className="button button_secondary3" onClick={handleAddSolution}>
            <div className="button__secondary3-icon">
              <AddIcon color={'white'} />
            </div>
            Добавить
          </div>
        </div>
      </div>
      {
        solutions && solutions.length > 0 && <MobileSort sort={SolutionsSort} action={changeSort} currentSort={param} />

      }
      {
        solutions && solutions.length > 0 &&
        <div className="table">
          <TableSort sort={SolutionsSort} action={changeSort} currentSort={param} />
          <div className="table__body">
            {
              solutions.length > 0 && solutions.map((solution: ISolution) =>
                <SubcategoryItem
                  sorts={SolutionsSort}
                  solution={solution}
                  link={'/admin/catalog/category/solution/'}

                />
              )
            }
          </div>
        </div>
      }
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleUpdateSubcategory}>СОХРАНИТЬ</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={handleDeleteSubcategory}>УДАЛИТЬ</div>
        </div>
      </div>

    </div >
  )
}

export default SubCategory