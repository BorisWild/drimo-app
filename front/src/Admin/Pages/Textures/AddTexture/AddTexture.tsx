import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ITextureElement } from '../../../../models/ITextureElement';
import { drimoAPI } from '../../../../services/DrimoService';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice';
import { LeftSmallRedArrow } from '../../../../UIkit/Icons'
import File from '../../../../UIkit/Inputs/File';

import Image from '../../../../UIkit/Inputs/Image';
import Input from '../../../../UIkit/Inputs/Input';
import Select from '../../../../UIkit/Inputs/Select';
import Sort from '../../../../UIkit/Sort/Sort';
import Switch from '../../../../UIkit/Switch/Switch';
import TableFilter from '../../../../UIkit/TableFilter/TableSort';
import TableRow from '../../../../UIkit/TableRow/TableRow';

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

function AddTexture() {

  const { id } = useParams()
  const navigate = useNavigate();
  const [status, setStatus] = useState(false)
  const [type, setType] = useState('Выберите тип текстуры')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File>()
  const [createTexture] = drimoAPI.useCreateTextureMutation()
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  const [validTitle, setValidTitle] = useState(false)
  const [validType, setValidType] = useState(false)
  const [validImage, setValidImage] = useState(false)

  let formData: any = new FormData();

  const handleChangeType = (type: string) => {
    setType(type)
  }

  const handleAddImage = (input: any) => {
    let image = document.getElementById('tempimg')! as HTMLImageElement

    if (input.files[0]) {
      image.src = URL.createObjectURL(input.files[0])
      if (image.naturalWidth < 1024 && image.naturalHeight < 1024 && input.files[0].size < 5000000 && (input.files[0].type === 'image/png' || input.files[0].type === 'image/jpg' || input.files[0].type === 'image/jpeg')) {
        setImage(input.files[0])
      } else {
        dispatch(notificate({ title: 'Ошибка', isShown: true }))
      }
    }

  }

  const handleChangeStatus = () => {
    setStatus(!status)
  }

  const handleChangeTitle = (value: string) => {
    setTitle(value)
  }

  const handleCancelAdding = () => {
    navigate('/admin/textures')
  }

  const handleAddTexture = async () => {

    formData.set('name', title)
    formData.set('type', type)
    formData.set('image', image)
    formData.set('status', status)

    if (title && type !== 'Выберите тип текстуры' && image) {
      await createTexture(formData)
      dispatch(notificate({ title: 'Успешно', isShown: true }))
      navigate('/admin/textures')
    } else {
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }
    if (!title) {
      setValidTitle(true)
    }
    if (type === 'Выберите тип текстуры') {
      setValidType(true)
    }
    if ( !image ){
      setValidImage(true)
    }


  }

  return (
    <div className="texture-page">
      <div className="texture-page__header">
        <div className="button-container">
          <div onClick={() => { navigate('/admin/textures') }} className="button button_text">
            <LeftSmallRedArrow />
            Текстуры
          </div>
        </div>
        <div className="page-title page-title_admin">Добавить текстуру</div>
      </div>
      <div className="texture-page__inputs">
        <Input isRequired={true} title={'Название'} isLittle={false} value={title} onchange={handleChangeTitle} length={20} valid={validTitle} />
        <Select title={'Тип текстуры'} isRequired={true} placeholder={type} options={OptionsMock} onchange={handleChangeType} valid={validType} />
        <Switch title={'Статус'} statusOn={'Активно'} statusOff={'Неактивно'} isRequired={false} onchange={handleChangeStatus} status={status} />
        {/* <File onchange={handleAddImage} name={'Фото'} title={'Добавить фото'} isSmall={false} isRequired={true} types={['.png', '.jpg']} /> */}
        <File name={''} title={''} isSmall={false} isRequired={false} types={['.png', '.jpg']} valid={ validImage }>
          <img id="tempimg" src="" style={{ display: 'none' }} />
          <Image file={image} onchange={handleAddImage} />
        </File>

        {/* {
          image && <img src={image.name} alt="" />
        } */}
      </div>
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleAddTexture} >ДОБАВИТЬ</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={handleCancelAdding}>ОТМЕНА</div>
        </div>
      </div>
    </div>
  )
}

export default AddTexture