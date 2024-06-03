import React, { useEffect } from 'react'
import { INotification } from '../../models/INotification';
import { useAppDispatch } from '../../store/hooks/redux';
import { notificationsSlice } from '../../store/reducers/NotificationsSlice';
import { CloseIcon } from '../Icons';

interface NotificationProps {
    notification: INotification
}

function Notification({ notification }: NotificationProps) {
    const { title, isShown } = notification
    const { notificate } = notificationsSlice.actions
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isShown) {
            setTimeout(() => {
                dispatch(notificate({ title: title, isShown: false }))
            }, 3000)
        }
    }, [isShown])

    return (
        <div className={`notification ${isShown ? 'notification_active' : ''}`}>
            {title}
            <CloseIcon color="#A1A1A1" />
        </div>
    )
}

export default Notification