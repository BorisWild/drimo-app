import React, { ReactEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { drimoAPI } from '../../../../services/DrimoService';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice';
import { AddIcon, LeftSmallRedArrow } from '../../../../UIkit/Icons'
import Input from '../../../../UIkit/Inputs/Input'

function AddCategory() {
  const [title, setTitle] = useState('');
  const [createCategory, { error, data }] = drimoAPI.useCreateCategoryMutation()
  const [validInput, setValid] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  function handleInput(value: string) {
    setTitle(value)
    setValid(false)
  }

  const handleSaveCategory = async () => {
    if (title.length > 0) {
      const data = await createCategory({ title: title })
      if (data) {
        dispatch(notificate({ title: 'Успешно', isShown: true }));
        navigate('/admin/catalog')
      }
    } else {
      setValid(true)
      dispatch(notificate({ title: 'Ошибка', isShown: true }));
    }
  }

  function handleGoBack() {
    navigate('/admin/catalog')
  }

  return (
    <div className="add-category">
      <div className="button-container">
        <div className="button button_text" onClick={handleGoBack}>
          <LeftSmallRedArrow />
          Категории
        </div>
      </div>
      <div className="add-category__title page-title">
        Добавить категорию
      </div>
      <div className="add-category__input">
        <Input isRequired={true} title={'Название'} isLittle={false} value={title} onchange={handleInput} valid={validInput} length={20} />
      </div>
      {/* <div className="add-category__subtitle page-subtitle">
        Подкатегории
      </div> */}
      {/* <div className="button-container">
        <div className="button button_secondary3">
          <div className="button__secondary3-icon">
            <AddIcon color={'white'} />
          </div>
          Добавить
        </div>
      </div> */}
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleSaveCategory}>ДОБАВИТЬ</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={handleGoBack}>ОТМЕНА</div>
        </div>
      </div>
    </div>
  )
}

export default AddCategory