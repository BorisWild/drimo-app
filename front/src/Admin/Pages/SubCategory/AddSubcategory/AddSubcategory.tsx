import React, { ReactEventHandler, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getImageFromJSON } from '../../../../Helpers/getImageFromJSON';
import { drimoAPI } from '../../../../services/DrimoService';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice';
import { AddIcon, LeftSmallRedArrow } from '../../../../UIkit/Icons'
import File from '../../../../UIkit/Inputs/File';
import FilePreview from '../../../../UIkit/Inputs/FilePreview';
import Input from '../../../../UIkit/Inputs/Input'

interface File {
  name: string,
  size: number,
}

function AddSubcategory() {
  const [title, setTitle] = useState('');
  const { id } = useParams()
  const [createSubcategory, { error, data }] = drimoAPI.useCreateSubcategoryMutation()
  const navigate = useNavigate()
  const [video, setVideo] = useState<File>()
  let formData: any = new FormData();
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  const [validTitle, setValidTitle] = useState(false)
  // error && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  function handleInput(value: string) {
    setValidTitle(false)
    setTitle(value)
  }

  function handleVideoFile(input: any) {
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

  const handleSaveSubcategory = async () => {
    if (title.length > 0) {
      formData.set('title', title)
      formData.set('parent_id', id)
      video && formData.set('video', video)
      dispatch(notificate({ title: 'Загрузка видео', isShown: true }))
      await createSubcategory(formData).then( (resp) => {
        console.log(resp);

        const keys = Object.keys( resp );

        if ( keys[0] === 'error' ){
          dispatch(notificate({ title: 'Ошибка', isShown: true }))
        } else {
          dispatch(notificate({ title: 'Сохранено', isShown: true }))
          navigate(-1)
        }
        
      } ).catch( (err) => {
        console.log(err);
        dispatch(notificate({ title: 'Ошибка', isShown: true }))
      } ); 
      // dispatch(notificate({ title: 'Сохранено', isShown: true }))
      // navigate(-1)
    }
    else {
      setValidTitle(true)
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }

  }

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <div className="add-category">
      <div className="button-container">
        <div className="button button_text" onClick={handleGoBack}>
          <LeftSmallRedArrow />
          Категория
        </div>
      </div>
      <div className="add-category__title page-title">
        Добавить подкатегорию
      </div>
      <div className="add-category__inputs">
        <div className="add-category__input">
          <Input isRequired={true} title={'Название'} isLittle={false} value={title} onchange={handleInput} valid={validTitle} length={20} />
        </div>
        <div className="add-category__input">
          {/* {
            <File onchange={handleVideoFile} name={'Видео'} title={'Добавить видео'} isSmall={false} isRequired={false} types={['.mp4']} >
              {
                video && <FilePreview title={video.name} size={video.size} />
              }
            </File>
          } */}

          {
            video ?

              <div className="solution__image">
                <div className="solution__image-label label">Видео</div>
                <FilePreview title={video.name} size={video.size} link={(typeof video === 'string') && getImageFromJSON(video)} ondelete={() => { setVideo(undefined); console.log(1) }} />
              </div>
              : <File name={'Видео'} title={'Добавить видео'} isSmall={false} isRequired={false} types={['.mp4']} onchange={handleVideoFile} />
          }

        </div>
      </div>



      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleSaveSubcategory}>ДОБАВИТЬ</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={handleGoBack}>ОТМЕНА</div>
        </div>
      </div>
    </div>
  )
}

export default AddSubcategory