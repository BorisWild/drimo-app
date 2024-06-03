import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { modalSlice } from '../../store/reducers/client/ModalSlice'
import { CloseIcon } from '../../UIkit/Icons'

function ModalContainer(props: any) {
    const { loginOpened, codeOpened, deleteOpened } = useAppSelector(state => state.modalReducer)
    const dispatch = useAppDispatch()
    const { changeLogin, changeCode, toggleDelete } = modalSlice.actions
    const handleCloseModal = () => {
        dispatch(changeLogin(false))
        dispatch(changeCode(false))
        dispatch(toggleDelete(false))
    }

    return (
        <div className={`modal ${loginOpened || codeOpened || deleteOpened ? 'modal_active' : ''}`}>
            <div className="modal__container">
                <svg onClick={handleCloseModal} className='modal__close' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="white" />
                    <path d="M4 4L19.9997 19.9997" stroke="black" strokeWidth="2" strokeLinecap="square" />
                    <path d="M20 4L4.0003 19.9997" stroke="black" strokeWidth="2" strokeLinecap="square" />
                </svg>
                {props.children}
            </div>
        </div>
    )
}

export default ModalContainer