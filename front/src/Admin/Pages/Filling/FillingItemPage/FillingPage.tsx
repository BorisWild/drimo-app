import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDate } from '../../../../Helpers/getDate';
import { getImageFromJSON } from '../../../../Helpers/getImageFromJSON';
import { drimoAPI } from '../../../../services/DrimoService';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice';
import { LeftSmallRedArrow, RequiredIcon } from '../../../../UIkit/Icons'
import File from '../../../../UIkit/Inputs/File';
import FilePreview from '../../../../UIkit/Inputs/FilePreview';
import Input from '../../../../UIkit/Inputs/Input';
import Textarea from '../../../../UIkit/Inputs/Textarea';

function FillingPage() {
  const { id } = useParams()
  const navigate = useNavigate();
  const [glb, setGlb] = useState<File>()
  const { data: filling, error: elementError, refetch } = drimoAPI.useFetchElementQuery(id)
  const [updateFilling, { error: updateError, data: updateData }] = drimoAPI.useUpdateElementMutation()
  const [title, setTitle] = useState('')
  const [weight, setWeight] = useState(0)
  const [validTitle, setValidTitle] = useState(false)
  const [validWeight, setValidWeight] = useState(false)
  // filling && console.log(filling)
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  elementError || updateError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  let formData = new FormData()

  const handleDeleteFile = () => {
    setGlb(undefined)
  }

  const handleInputFile = (input: any) => {
    console.log(input.files[0].name.split('.')[input.files[0].name.split('.').length - 1])
    if (input.files[0].name.split('.')[input.files[0].name.split('.').length - 1] === 'glb') {
      setGlb(input.files[0])
    } else {
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }

  }

  const handleInputTitle = (value: string) => {
    setTitle(value)
    setValidTitle(false)
  }

  const handleInputWeight = (value: string) => {

    let _value = Number( value.replace (/\D/, '') );

    if (!isNaN(_value) && String( _value ).length <= 7 )  {
      
      setWeight( _value );
      setValidWeight(false); 

    }

  }

  const handleUpdateFilling = async () => {
    formData.set('name', title)
    formData.set('weight', String(weight))
    glb && formData.set('file', glb)

    if (title.length > 0 && String(weight).length > 0 && glb) {
      await updateFilling({ id, formData })
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
      refetch()
    } else {
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }
    if (title.length === 0) {
      setValidTitle(true)
    }

  }

  useEffect(() => {
    if (filling) {
      setTitle(filling.title)
      setGlb(filling.file)
      setWeight( filling.weight );
    }
  }, [filling])

  return (
    <div className="filling-page">
      <div className="filling-page__header">
        <div className="button-container">
          <div onClick={() => { navigate('/admin/filling') }} className="button button_text">
            <LeftSmallRedArrow />
            Наполнение
          </div>
        </div>
        <div className="page-title page-title_admin">{filling && filling.title}</div>
        <div className="category__data">
          <div className="label">ID: {id}</div>
          <div className="label">Посл. изменение: {filling && getDate(filling.updated_at)}</div>
          <div className="label">Добавлено: {filling && getDate(filling.created_at)}</div>
        </div>
      </div>
      <div className="delivery-page__inputs">
        <Input isRequired={true} title={'Название'} isLittle={false} value={title} onchange={handleInputTitle} length={30} valid={validTitle} />
        <Input isRequired={true} title={'Вес, г'} isLittle={false} value={weight} onchange={handleInputWeight} length={30} valid={validWeight} />
        {
          glb ?

            <div className="solution__image">
              <div className="solution__image-label label">Файл GLB <RequiredIcon /></div>
              <FilePreview link={getImageFromJSON(filling.file)} title={'GLB file'} size={0} ondelete={handleDeleteFile} />
            </div>
            :
            <File name={'Файл GLB'} title={'Добавить файл'} isSmall={false} isRequired={true} types={['.glb']} onchange={handleInputFile} />

        }
      </div>
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleUpdateFilling}>Сохранить</div>
        </div>
      </div>
    </div>
  )
}

export default FillingPage