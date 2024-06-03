import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie } from '../../../../Helpers/cookies'
import { getAuthURL } from '../../../../services/URL'
import { useAppDispatch } from '../../../../store/hooks/redux'
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice'
import Input from '../../../../UIkit/Inputs/Input'

function Information() {

    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('+7(___)___-__-__')
    const [email, setEmail] = useState('')
    const [userData, setUserData] = useState<any>({})
    const dispatch = useAppDispatch()
    const { notificate } = notificationsSlice.actions;
    const fetchUserInfo = async () => {
        await axios.get(`${getAuthURL()}/user_data`,
            {
                headers: {
                    Authorization: `Bearer ${getCookie('apiToken')}`,
                    ID: `${getCookie('userId')}`
                }
            }
        )
            .then(({ data }) => {
                setUserData(data)
                setFullname(data.full_name)
                setPhone((`+7(${data.phone[2] ? data.phone[2] : '_'}${data.phone[3] ? data.phone[3] : '_'}${data.phone[4] ? data.phone[4] : '_'})${data.phone[5] ? data.phone[5] : '_'}${data.phone[6] ? data.phone[6] : '_'}${data.phone[7] ? data.phone[7] : '_'}-${data.phone[8] ? data.phone[8] : '_'}${data.phone[9] ? data.phone[9] : '_'}-${data.phone[10] ? data.phone[10] : '_'}${data.phone[11] ? data.phone[11] : '_'}`))
                setEmail(data.email)

            })
            .catch((e) => { console.error(e); dispatch(notificate({ title: 'Ошибка', isShown: true })); })
    }

    const updateUserInfo = async () => {
        await axios.patch(`${getAuthURL()}/user_update/${getCookie('userId')}`,
            {
                full_name: fullname,
            },
            {
                headers: {
                    Authorization: `Bearer ${getCookie('apiToken')}`,
                    ID: `${getCookie('userId')}`
                }
            },
        )
            .then(() => { dispatch(notificate({ title: 'Сохранено', isShown: true })); })
            .then(async () => {
                if (userData.email !== email)
                    await axios.post(`${getAuthURL()}/update_email/${getCookie('userId')}`,
                        {
                            email: email,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${getCookie('apiToken')}`,
                                ID: `${getCookie('userId')}`
                            }
                        })
            })
            .then(async () => {
                if (userData.phone !== phone.replace(/[^+\d]/g, ''))
                    await axios.post(`${getAuthURL()}/update_phone/${getCookie('userId')}`,
                        {
                            phone_number: phone,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${getCookie('apiToken')}`,
                                ID: `${getCookie('userId')}`
                            }
                        })
            })
            .then(() => { dispatch(notificate({ title: 'Сохранено', isShown: true })); })
            .then(() => fetchUserInfo())
            .catch(e => { console.error(e); dispatch(notificate({ title: 'Ошибка', isShown: true })); })
    }

    const handleInputFullname = (value: string) => {
        setFullname(value)
    }
    const handleInputEmail = (value: string) => {
        setEmail(value)
    }
    const handleInputPhone = (value: string) => {
        let _value = value.replace(/[^+\d]/g, '')
        if (_value.length <= 2) {
            setPhone('+7(')
        }
        if (_value.length > 2 && _value.length < 6) {
            setPhone('+7(' + _value.slice(2, 7))
        }
        if (_value.length >= 6 && _value.length < 9) {
            setPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8))
        }
        if (_value.length >= 9 && _value.length < 11) {
            setPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10))
        }
        if (_value.length >= 11 && _value.length < 13) {
            setPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10) + '-' + _value.slice(10, 12))
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
        <div className='profile__section profile-section'>
            <h3 className="profile-section__title">
                Персональные данные
            </h3>
            <div className="profile-section__form">
                <div className="profile-section__input">
                    <Input title="ФИО" isRequired={true} isLittle={false} onchange={handleInputFullname} value={fullname} />
                </div>
                <div className="profile-section__input_half">
                    <Input title="Телефон" isRequired={true} isLittle={false} onchange={handleInputPhone} value={phone} />
                </div>
                <div className="profile-section__input_half">
                    <Input title="E-mail" isRequired={true} isLittle={false} onchange={handleInputEmail} value={email} />
                </div>
                <div className="profile-section__button">
                    <div className="button button_primary" onClick={updateUserInfo}>Сохранить</div>
                </div>
            </div>
        </div>
    )
}

export default Information