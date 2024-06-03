import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { text } from 'stream/consumers'
import { ITexture } from '../../../models/ITexture'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import Filter from '../../../UIkit/Filter/Filter'
import Pagination from '../../../UIkit/Pagination/Pagination'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'
import TableFilter from '../../../UIkit/TableFilter/TableSort'
import TableRow from '../../../UIkit/TableRow/TableRow'
import TextureItem from './TextureItem'

const TexturesSort = [
  {
    params: [
      {
        param: 'Фото',
        isSortable: false,
        id: 'sort_image',
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
        param: 'Тип',
        isSortable: true,
        id: 'sort_type'
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

function Textures() {
  const { order, param } = useAppSelector(state => state.catalogSortReducer)
  const [currentPage, setCurrentPage] = useState(0)
  const navigate = useNavigate()
  const [types, setTypes] = useState<string[]>([])
  const { changeSort } = catalogSortSlice.actions
  const { data: textures, isLoading: texturesLoading, isError: textureError, refetch } = drimoAPI.useFetchAllTexturesQuery({ currentPage, types: types, param, order })
  const { data: textureFilters } = drimoAPI.useFetchTextureTypesQuery('')
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  textureError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  const handleChangeType = (type: string) => {
    let updated = [...types]
    if (types.indexOf(type) === -1) {
      updated.push(type)
      setTypes(updated)
    } else {
      updated.splice(types.indexOf(type), 1)
      setTypes([...updated])
    }
    refetch()
  }

  const handleChangePage = (index: number) => {
    setCurrentPage(index)
  }

  const handleAddTexture = () => {
    navigate('/admin/textures/add')
  }

  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    if (textures) {
      setLoaded(true)
    }

  }, [isLoaded, textures])


  return (
    isLoaded ? <div className='textures'>
      <div className="textures__header">
        <div className="page-title">Текстуры<div className='title-counter'>{textures.total}</div></div>
        <div className="button-container">
          <div className="button button_primary" onClick={handleAddTexture}>Добавить</div>
        </div>
        <div className="textures__filter">
          <Filter onchange={handleChangeType} title={'Тип'} filters={textureFilters} currentTypes={types} />
        </div>
      </div>
      <MobileSort sort={TexturesSort} action={changeSort} currentSort={param} filters={[{ filters: textureFilters, onchange: handleChangeType, title: 'Тип', currentTypes: types }]} />

      <div className="textures__table table">
        <TableFilter sort={TexturesSort} action={changeSort} currentSort={param} />
        <div className="table__body">
          {
            textures.rows.map((texture: ITexture) =>
              <TextureItem key={texture.id} texture={texture} sorts={TexturesSort} />
            )
          }
        </div>
      </div>
      <Pagination total={Math.ceil(textures.total / 10)} onclick={handleChangePage} current={currentPage} />
    </div> : <></>

  )
}

export default Textures