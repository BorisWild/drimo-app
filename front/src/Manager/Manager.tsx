import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../Admin/Components/Sidebar/Sidebar'
import ModalContainer from '../Client/Modals/ModalContainer'
import ModalDelete from '../Client/Modals/ModalDelete'
import { getCookie } from '../Helpers/cookies'
import { useAppSelector } from '../store/hooks/redux'
import { BoxIcon, OrdersIcon, UserIcon } from '../UIkit/Icons'
import AuthPage from './Pages/AuthPage/AuthPage'
import OrdersPage from './Pages/OrdersPage/OrdersPage'
import SingleOrder from './Pages/OrdersPage/SingleOrder'
import SingleUser from './Pages/SingleUser/SingleUser'
import SolutionsPage from './Pages/SolutionsPage/SolutionsPage'
import UserOrder from './Pages/UserOrder/UserOrder'
import UserOrderSolution from './Pages/UserOrder/UserOrderSolution'
import UsersPage from './Pages/UsersPage/UsersPage'

const ManagerSidebar = [
  {
    title: 'Пользователи',
    link: '/manager/users',
    icon: <UserIcon color={'black'} />
  },
  {
    title: 'Заказы',
    link: '/manager/orders',
    icon: <OrdersIcon color={'black'} />
  },
  {
    title: 'Созданные решения',
    link: '/manager/solutions',
    icon: <BoxIcon />
  },
]

function Manager() {
  const navigate = useNavigate()
  const location = useLocation()
  const { deleteOpened } = useAppSelector(state => state.modalReducer)
  const favicon = document!.getElementById('favicon')! as HTMLLinkElement;
  favicon.href = "/favicon_a.ico"

  useEffect(() => {
    if (location.pathname === '/manager')
      if (getCookie('apiTokenManager')) {
        navigate('/manager/users')
      } else {
        navigate('/manager/auth')
      }
    if (location.pathname.includes('manager') && !getCookie('apiTokenManager')) {
      navigate('/manager/auth')
    }

  }, [])

  return (
    <>
      <ModalContainer>
        {deleteOpened && <ModalDelete />}
      </ModalContainer>
      <div className='admin '>
        {
          location.pathname.includes('auth') ? <></> : <Sidebar items={ManagerSidebar} />
        }
        <div className="admin__page">
          <Routes>
            <Route path="/manager/auth" element={<AuthPage />} />
            <Route path="/manager/users" element={<UsersPage />} />
            <Route path="/manager/users/:id" element={<SingleUser />} />
            <Route path="/manager/users/:id/solution/:sol_id" element={<UserOrderSolution />} />
            <Route path="/manager/users/:id/order/:orderid" element={<UserOrder />} />
            <Route path="/manager/users/:id/order/:orderid/solution/:sol_id" element={<UserOrderSolution />} />
            <Route path="/manager/orders" element={<OrdersPage />} />
            <Route path="/manager/orders/:orderid" element={<SingleOrder />} />
            <Route path="/manager/orders/:id/solution/:sol_id" element={<UserOrderSolution />} />

            <Route path="/manager/solutions" element={<SolutionsPage />} />
            <Route path="/manager/solutions/:sol_id" element={<UserOrderSolution />} />
          </Routes>
        </div>

      </div>
    </>

  )
}

export default Manager