import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCookie } from '../../Helpers/cookies'
import { drimoAPI } from '../../services/DrimoService'
import { getAuthURL } from '../../services/URL'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { modalSlice } from '../../store/reducers/client/ModalSlice'
import { notificationsSlice } from '../../store/reducers/NotificationsSlice'

function ModalDelete() {
  const { deleteOpened, deleteType, backLink, deleteId } = useAppSelector(state => state.modalReducer)
  const { changeDelete, toggleDelete } = modalSlice.actions
  const [deleteCategory, { error: deleteCategoryError }] = drimoAPI.useDeleteCategoryMutation()
  const [deleteDeliveryMethod, { error: deleteDeliveryError }] = drimoAPI.useDeleteDeliveryMethodMutation()
  const [deletePaymentMethod, { error: deletePaymentError }] = drimoAPI.useDeletePaymentMethodMutation()
  const [deleteSolution, { error: deleteSolutionError }] = drimoAPI.useDeleteSolutionMutation()
  const [deleteSubcategory, { error: deleteSubcatError }] = drimoAPI.useDeleteSubcategoryMutation()
  const [deleteTexture, { error: deleteTextureError }] = drimoAPI.useDeleteTextureMutation()
  const [deleteUserSolution, { error: deleteUserSolutionError }] = drimoAPI.useDeleteSolutionMutation()
  const [deleteOrder, { error: deleteOrderError }] = drimoAPI.useDeleteOrderMutation()

  const { notificate } = notificationsSlice.actions

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  deleteCategoryError && deleteDeliveryError && deletePaymentError && deleteSolutionError && deleteSubcatError && deleteTextureError && deleteUserSolutionError && deleteOrderError && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  const handleDelete = async () => {
    if (deleteType === 'Категорию') {
      await deleteCategory(deleteId)
    }
    if (deleteType === 'Способ доставки') {
      await deleteDeliveryMethod(deleteId)
    }
    if (deleteType === 'Способ оплаты') {
      await deletePaymentMethod(deleteId)
    }
    if (deleteType === 'Готовое решение' && location.pathname.includes('admin')) {
      await deleteSolution(deleteId)
    }
    if (deleteType === 'Готовое решение' && location.pathname.includes('manager')) {
      await deleteUserSolution(deleteId)
    }
    if (deleteType === 'Подкатегорию') {
      await deleteSubcategory(deleteId)
    }
    if (deleteType === 'Текстуру') {
      await deleteTexture(deleteId)
    }
    if (deleteType === 'Заказ') {
      await deleteOrder(deleteId)
    }
    if (deleteType === 'Пользователя') {
      await axios.delete(`${getAuthURL()}/delete_user/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie('apiTokenManager')}`,
            ID: getCookie('userIdManager')!
          }
        }
      )
        .then(() => {
          navigate('/manager/users')
        })
        .catch(() => { dispatch(notificate({ title: 'Ошибка', isShown: true })) })
    }
    dispatch(notificate({ title: 'Удалено', isShown: true }))
    dispatch(toggleDelete(false))
    navigate(backLink)
  }

  const handleCancel = () => {
    dispatch(toggleDelete(false))
  }

  return (
    <div className="modal_delete modal__body">
      <h1 className="modal__title">Удалить {deleteType}?</h1>

      <p className="">Это действие не может быть отменено</p>
      <div className="buttons-container">
        <div className="button button_primary" onClick={handleDelete}>
          Удалить
        </div>
        <div className="button button_secondary" onClick={handleCancel}>
          Отменить
        </div>
      </div>


    </div >
  )
}

export default ModalDelete