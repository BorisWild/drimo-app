import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SubcategoryItem from '../../../Admin/Pages/SubCategory/SubcategoryItem'
import { getCookie } from '../../../Helpers/cookies'
import { getDate, getTime } from '../../../Helpers/getDate'
import { IOrder } from '../../../models/IOrder'
import { ISolution } from '../../../models/ISolution'
import { IUser } from '../../../models/IUser'
import { drimoAPI } from '../../../services/DrimoService'
import { getAuthURL } from '../../../services/URL'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { catalogSortSlice } from '../../../store/reducers/admin/CatalogSortSlice'
import { managerSortSlice } from '../../../store/reducers/admin/ManagerSortSlice'
import { modalSlice } from '../../../store/reducers/client/ModalSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { LeftSmallRedArrow } from '../../../UIkit/Icons'
import Input from '../../../UIkit/Inputs/Input'
import MobileSort from '../../../UIkit/Table/MobileSort/MobileSort'
import TableSort from '../../../UIkit/TableFilter/TableSort'
import OrderItem from '../OrdersPage/OrderItem'

const SolutionsSort = [
  {
    params: [
      {
        param: 'Фото',
        isSortable: false,
        id: '.',
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
        param: 'Длина, мм',
        isSortable: true,
        id: 'sort_length'
      },
    ]
  },
  {
    params: [
      {
        param: 'Ширина, мм',
        isSortable: true,
        id: 'sort_width'

      },
    ]
  },
  {
    params: [
      {
        param: 'Высота, мм',
        isSortable: true,
        id: 'sort_height'

      },
    ]
  },
  {
    params: [
      {
        param: 'Вес, г',
        isSortable: true,
        id: 'sort_weight'

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

const OrdersSort = [
  {
    params: [{ param: 'Номер заказа', isSortable: true, id: 'sort_id' }]
  },
  {
    params: [{ param: 'Решение', isSortable: true, id: 'sort_solution_name' }]
  },
  {
    params: [{ param: 'Статус', isSortable: true, id: 'sort_status' }]
  },
  {
    params: [{ param: 'Сумма заказа', isSortable: true, id: 'sort_price' }]
  },
  {
    params: [{ param: 'Способ оплаты', isSortable: true, id: 'sort_payment_id' }]
  },
  {
    params: [{ param: 'Способ доставки', isSortable: true, id: 'sort_delivery_id' }]
  },
  {
    params: [{ param: 'Посл. изменение', isSortable: true, id: 'sort_updated_at' }]
  },
  {
    params: [{ param: 'Добавлено', isSortable: true, id: 'sort_created_at' }]
  },
]

function SingleUser() {
  const { id } = useParams()
  const [user, setUser] = useState<IUser>()
  const { param, order } = useAppSelector(state => state.catalogSortReducer)
  const { param: m_param, order: m_order } = useAppSelector(state => state.managerSortReducer)
  const { changeSort } = catalogSortSlice.actions
  const { changeManagerSort } = managerSortSlice.actions
  const { data: saved, error: savedError } = drimoAPI.useFetchAllUserSavedSolutionsQuery({ id, param, order, page: 1 })
  const { data: orders, error: ordersError } = drimoAPI.useFetchManagerUserOrdersQuery({ id, param: m_param, order: m_order, page: 1 })
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('+7(___)___-__-__')
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  savedError && ordersError && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  const { changeDelete } = modalSlice.actions
  const fetchUserData = async () => {
    await axios.get(`${getAuthURL()}/get_user/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('apiTokenManager')}`,
        ID: `${getCookie('userIdManager')}`
      }
    })
      .then(({ data }) => {
        setUser(data);

        if (data.email) {
          setEmail(data.email);
        }
        if (data.phone) {
          setPhone(`+7(${data.phone[2] ? data.phone[2] : '_'}${data.phone[3] ? data.phone[3] : '_'}${data.phone[4] ? data.phone[4] : '_'})${data.phone[5] ? data.phone[5] : '_'}${data.phone[6] ? data.phone[6] : '_'}${data.phone[7] ? data.phone[7] : '_'}-${data.phone[8] ? data.phone[8] : '_'}${data.phone[9] ? data.phone[9] : '_'}-${data.phone[10] ? data.phone[10] : '_'}${data.phone[11] ? data.phone[11] : '_'}`);
        }

        if (data.full_name) {
          setFullname(data.full_name);
        }
      })
      .catch(e => { dispatch(notificate({ title: 'Ошибка', isShown: true })) })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleFullname = (value: string) => {
    setFullname(value)
  }

  const handleEmail = (value: string) => {
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

  const handleUpdateUser = async () => {
    try {
      if (user && fullname !== user.full_name) {
        await axios.patch(`${getAuthURL()}/user_update/${id}`,
          {
            full_name: fullname,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie('apiTokenManager')}`,
              ID: String(getCookie('userIdManager'))
            },
          },

        )
      }
      if (user && email !== user.email) {
        await axios.post(`${getAuthURL()}/update_email/${id}`,
          {
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie('apiTokenManager')}`,
              ID: String(getCookie('userIdManager'))
            }
          }
        )
      }
      if (user && phone.replace(/[^+\d]/g, '') !== user.phone) {
        await axios.post(`${getAuthURL()}/update_phone/${id}`,
          {
            phone_number: phone,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie('apiTokenManager')}`,
              ID: String(getCookie('userIdManager'))
            }
          }
        )
      }
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
      fetchUserData()
    } catch (e) {
      console.error(e)
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }
  }

  const handleDeleteUser = async () => {
    dispatch(changeDelete({ type: 'Пользователя', isOpened: true, id: id, backLink: `/manager/users` }))

  }

  return (
    user && orders ? <div className="single-user">
      <div className="single-user__header">
        <div className="button-container">
          <div className="button button_text" onClick={() => navigate('/manager/users')} >
            <LeftSmallRedArrow />
            Пользователи
          </div>
        </div>
        <div className="page-title">{user.full_name}</div>
        <div className="page-info">
          <div>ID: {id}</div>
          <div>Посл. изменение: {getDate(user.updated_at)}, {getTime(user.updated_at)}</div>
          <div>Добавлено: {getDate(user.created_at)}, {getTime(user.created_at)}</div>
        </div>
      </div>
      <div className="single-user__section">
        <div className="page-subtitle">Контактные данные</div>
        <div className="single-user__inputs-container">
          <Input isRequired={true} title={'ФИО'} isLittle={false} value={fullname} onchange={handleFullname} length={100} />
          <div className="profile-section__input_half">
            <Input isRequired={true} title={'Телефон'} isLittle={false} value={phone} onchange={handleInputPhone} />
          </div>
          <div className="profile-section__input_half">
            <Input isRequired={true} title={'E-mail'} isLittle={false} value={email} onchange={handleEmail} />
          </div>
        </div>
      </div>
      <div className="single-user__section">
        <div className="page-subtitle">сохраненные конструкции <span className="title-counter">{saved ? saved && saved.length : 0}</span></div>
        {saved && saved.length > 0 && <MobileSort sort={SolutionsSort} action={changeSort} currentSort={param} />}

        {
          saved && saved.length > 0 &&
          <div className="table">
            <TableSort sort={SolutionsSort} action={changeSort} currentSort={param} />
            <div className="table__body">
              {
                saved.map((el: any) => <SubcategoryItem key={el.id} solution={{ ...el, name: el.title, id: el.solution_id }} sorts={SolutionsSort} link={`/manager/users/${id}/solution/`} />)
              }
            </div>
          </div>
        }
      </div>
      <div className="single-user__section">
        <div className="page-subtitle">заказы <span className="title-counter">{orders ? orders.length : 0}</span></div>
        {orders.length > 0 && <MobileSort sort={OrdersSort} action={changeManagerSort} currentSort={m_param} />}

        {
          orders && orders.length > 0 &&
          <div className="table">
            <TableSort sort={OrdersSort} action={changeManagerSort} currentSort={m_param} />
            <div className="table__body">
              {
                orders.map((el: IOrder) => <OrderItem
                  sorts={SolutionsSort}
                  order={el}
                  key={el.id}
                  link={`/manager/users/${id}/order/${el.id}`}
                />)
              }

            </div>
          </div>
        }

      </div>
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleUpdateUser}>СОХРАНИТЬ</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={handleDeleteUser}>УДАЛИТЬ</div>
        </div>
      </div>
    </div> : <></>

  )
}

export default SingleUser