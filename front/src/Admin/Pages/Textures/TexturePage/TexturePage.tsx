import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDate } from '../../../../Helpers/getDate';
import { getImageFromJSON } from '../../../../Helpers/getImageFromJSON';
import { ITextureElement } from '../../../../models/ITextureElement';
import { drimoAPI } from '../../../../services/DrimoService';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { catalogSortSlice } from '../../../../store/reducers/admin/CatalogSortSlice';
import { modalSlice } from '../../../../store/reducers/client/ModalSlice';
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice';
import { LeftSmallRedArrow, RequiredIcon } from '../../../../UIkit/Icons'
import File from '../../../../UIkit/Inputs/File';
import Input from '../../../../UIkit/Inputs/Input';
import Select from '../../../../UIkit/Inputs/Select';
import Sort from '../../../../UIkit/Sort/Sort';
import ImageComponent from '../../../../UIkit/Inputs/Image';
import Switch from '../../../../UIkit/Switch/Switch';
import TableFilter from '../../../../UIkit/TableFilter/TableSort';
import TableRow from '../../../../UIkit/TableRow/TableRow';
import TextureElementItem from './TextureElementItem';
import MobileSort from '../../../../UIkit/Table/MobileSort/MobileSort';

const FilterMock = [
  {
    params: [{ param: 'Название', isSortable: true, id: 'sort_title' }, { param: 'ID', isSortable: true, id: 'sort_id' }]
  },
  {
    params: [{ param: 'Вес, г', isSortable: true, id: 'sort_weight' }]
  },
  {
    params: [{ param: 'Цена', isSortable: true, id: 'sort_cost' }]
  },
  {
    params: [{ param: 'Посл. изменение', isSortable: true, id: 'sort_updated_at' }]
  },
  {
    params: [{ param: 'Добавлено', isSortable: true, id: 'sort_create_time' }]
  },
]

const OptionsMock = [
  {
    title: 'Профиль',
    id: 1,
  },
  {
    title: 'Панель',
    id: 2,
  },
]

function TexturePage() {

  const { id } = useParams()
  const navigate = useNavigate();
  const { changeSort } = catalogSortSlice.actions;
  const { param, order } = useAppSelector(state => state.catalogSortReducer)
  const { data: textureElements, error: elementsError } = drimoAPI.useFetchTextureELementsQuery({ id, param, order })
  const { data: texture, error: textureError, refetch } = drimoAPI.useFetchTextureQuery(id)
  const [updateTexture, { error: updateError, data: updateData }] = drimoAPI.useUpdateTextureMutation()
  const [deleteTexture, { error: deleteError, data: deleteData }] = drimoAPI.useDeleteTextureMutation()
  const [updateDefaultTexture, { error: updateDefaultTextureError, data: defaultTextureData }] = drimoAPI.useUpdateDefaultTextureMutation()
  const [isLoaded, setLoaded] = useState(false)
  const [file, setFile] = useState('')
  const [status, setStatus] = useState(false)
  const [defaultTexture, setDefault] = useState(false)
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [validTitle, setValidTitle] = useState(false)
  const [validType, setValidType] = useState(false)
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  const { changeDelete } = modalSlice.actions
  elementsError || textureError || updateError || deleteError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  const [ titleType, setTitleType ] = useState( '' );

  let formData: any = new FormData();

  const handleChangeType = (type: string) => {

    if ( !defaultTexture ){
      setType(type)
      setValidType(false)
    } else {
      dispatch(notificate({ title: 'Ошибка', isShown: true }));
    }

  }

  const handleChangeImage = (input: any) => {
    let image = document.getElementById('tempimg')! as HTMLImageElement
    image.src = URL.createObjectURL(input.files[0])
    if (input.files[0]) {
      if (image.naturalWidth < 1024 && image.naturalHeight < 1024 && input.files[0].size < 5000000 && (input.files[0].type === 'image/png' || input.files[0].type === 'image/jpg' || input.files[0].type === 'image/jpeg')) {
        setFile(input.files[0])
      } else {
        dispatch(notificate({ title: 'Ошибка', isShown: true }))
      }
    }

  }

  const handleChangeStatus = () => {

    if ( !defaultTexture ){
      setStatus(!status)
    }

  }

  const handleChangeDefault = () => {

    if ( !defaultTexture ){
      setDefault(true);
      setStatus(true)
    }

  }

  const handleChangeTitle = (value: string) => {
    setTitle(value)
    setValidTitle(false)
  }

  const handleDeleteTexture = async () => {
    dispatch(changeDelete({ type: 'Текстуру', isOpened: true, id: id, backLink: '/admin/textures' }))


  }

  const handleChangeTexture = async () => {
    formData.set('type', type);
    formData.set('status', status);
    formData.set('name', title);
    file && formData.set('image', file);

    if (title.length > 0 && type.length > 0) {

      if ( defaultTexture ){
        await updateDefaultTexture( { type, id } );
      }

      await updateTexture({ formData, id });
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
      refetch()
    } else {
      dispatch(notificate({ title: 'Ошибка', isShown: true }))

    }
    if (title.length === 0) {
      setValidTitle(true)
    }

    if (type.length === 0) {
      setValidType(true)
    }


  }

  useEffect(() => {

    console.log( texture );

    if (textureElements && texture) {
      setLoaded(true)
      setStatus(texture.status)
      setDefault(texture.default)
      setType(texture.type)
      setTitle(texture.name)
      setFile(texture.image)

      if ( texture.type === 'Профиль' ){
        setTitleType( 'профилей' );
      }
      else if (  texture.type === 'Панель' ){
        setTitleType( 'панелей' );
      }

      
    }

  }, [isLoaded, textureElements, texture])

  return (
    isLoaded ?
      <div className="texture-page">
        <div className="texture-page__header">
          <div className="button-container">
            <div onClick={() => { navigate('/admin/textures') }} className="button button_text">
              <LeftSmallRedArrow />
              Текстуры
            </div>
          </div>
          <div className="page-title page-title_admin">{texture.name}</div>
          <div className="category__data">
            <div className="label">ID: {id}</div>
            <div className="label">Посл. изменение: {getDate(texture.updated_at)}</div>
            <div className="label">Добавлено: {getDate(texture.created_at)}</div>
          </div>
        </div>
        <div className="texture-page__inputs">
          <Input isRequired={true} title={'Название'} isLittle={false} value={title} onchange={handleChangeTitle} length={30} valid={validTitle} />
          <Select title={'Тип текстуры'} isRequired={true} placeholder={type} options={OptionsMock} onchange={handleChangeType} valid={validType} />
          <Switch title={'Статус'} statusOn={'Активно'} statusOff={'Неактивно'} isRequired={false} onchange={handleChangeStatus} status={status} />
          <Switch title={`По умолчанию для ${ titleType }`} statusOn={'Активно'} statusOff={'Неактивно'} isRequired={false} onchange={handleChangeDefault} status={defaultTexture} />

          <File name={''} title={''} isSmall={false} isRequired={false} types={['.png', '.jpg']}>
            <img id="tempimg" src="" style={{ display: 'none' }} />
            <ImageComponent file={file} onchange={handleChangeImage} />
          </File>
        </div>
        {textureElements.length > 0 && <MobileSort sort={FilterMock} action={changeSort} currentSort={param} />}
        {
          textureElements.length > 0 && <div className="texture-page__table table">
            <TableFilter sort={FilterMock} action={changeSort} currentSort={param} />
            <div className="table__body">
              {
                textureElements.map((element: ITextureElement) =>
                  <TextureElementItem
                    sorts={FilterMock}
                    element={element}
                    key={element.id}
                  />
                )
              }
            </div>
          </div>
        }

        <div className="category__buttons">
          <div className="button-container">
            <div className="button button_primary" onClick={handleChangeTexture} >СОХРАНИТЬ</div>
          </div>
          <div className="button-container">
            <div className={`button button_secondary ${ defaultTexture ? 'disabled' : '' }`} onClick={handleDeleteTexture}>УДАЛИТЬ</div>
          </div>
          
        </div>
      </div> : <></>
  )
}

export default TexturePage