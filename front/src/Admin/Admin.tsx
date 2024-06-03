import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import ModalContainer from '../Client/Modals/ModalContainer'
import ModalDelete from '../Client/Modals/ModalDelete'
import { getCookie } from '../Helpers/cookies'
import { useAppSelector } from '../store/hooks/redux'
import { CatalogIcon, DeliveryIcon, PlusCircleIcon, RoubleCircleIcon, SettingsIcon, TexturesIcon } from '../UIkit/Icons'
import Sidebar from './Components/Sidebar/Sidebar'
import AuthPage from './Pages/AuthPage/AuthPage'
import AddCategory from './Pages/Catalog/AddCategory/AddCategory'
import Catalog from './Pages/Catalog/Catalog'
import Category from './Pages/Category/Category'
import AddDelivery from './Pages/Delivery/AddDelivery'
import Delivery from './Pages/Delivery/Delivery'
import DeliveryPage from './Pages/Delivery/DeliveryPage/DeliveryPage'
import Filling from './Pages/Filling/Filling'
import FillingPage from './Pages/Filling/FillingItemPage/FillingPage'
import AddPayment from './Pages/Payment/AddPayment'
import Payment from './Pages/Payment/Payment'
import PaymentPage from './Pages/Payment/PaymentPage/PaymentPage'
import Restrictions from './Pages/Restrictions/Restrictions'
import AddSolution from './Pages/Solution/AddSolution'
import Solution from './Pages/Solution/Solution'
import AddSubcategory from './Pages/SubCategory/AddSubcategory/AddSubcategory'
import SubCategory from './Pages/SubCategory/SubCategory'
import AddTexture from './Pages/Textures/AddTexture/AddTexture'
import TexturePage from './Pages/Textures/TexturePage/TexturePage'
import Textures from './Pages/Textures/Textures'

const AdminSidebar = [
  {
    title: 'Каталог',
    icon: <CatalogIcon color="#000000" />,
    link: '/admin/catalog'
  },
  {
    title: 'Ограничения',
    icon: <SettingsIcon color="#000000" />,
    link: '/admin/restrictions'
  },
  {
    title: 'Текстуры',
    icon: <TexturesIcon />,
    link: '/admin/textures'
  },
  {
    title: 'Наполнение',
    icon: <PlusCircleIcon />,
    link: '/admin/filling'
  },
  {
    title: 'Способы доставки',
    icon: <DeliveryIcon />,
    link: '/admin/delivery'
  },
  {
    title: 'Способы оплаты',
    icon: <RoubleCircleIcon />,
    link: '/admin/payment'
  },
]

function Admin() {
  const navigate = useNavigate()
  const location = useLocation()
  const { deleteOpened } = useAppSelector(state => state.modalReducer)
  const favicon = document!.getElementById('favicon')! as HTMLLinkElement;
  favicon.href = "/favicon_a.ico"
  useEffect(() => {
    if (location.pathname === '/admin') {

      if (getCookie('apiTokenAdmin')) {
        navigate('/admin/catalog')
      } else {
        navigate('/admin/auth')
      }
    }
    if (location.pathname.includes('admin') && !getCookie('apiTokenAdmin')) {
      navigate('/admin/auth')
    }

  }, [])

  useEffect(() => {

  }, [deleteOpened])

  return (
    <>
      <ModalContainer>
        {deleteOpened && <ModalDelete />}
      </ModalContainer>
      <div className='admin'>



        {
          location.pathname.includes('auth') ? <></> : <Sidebar items={AdminSidebar} />
        }
        <div className="admin__page">
          <Routes>
            <Route path="/admin/auth" element={<AuthPage />} />

            <Route path="/admin/catalog" element={<Catalog />} />
            <Route path="/admin/catalog/add" element={<AddCategory />} />
            <Route path="/admin/catalog/:id" element={<Category />} />
            <Route path="/admin/catalog/:parent_id/category/:id" element={<SubCategory />} />
            <Route path="/admin/catalog/:parent_id/category/:id/add" element={<AddSolution />} />

            <Route path="/admin/catalog/category/:id/add" element={<AddSubcategory />} />
            <Route path="/admin/catalog/category/solution/:id" element={<Solution />} />

            <Route path="/admin/filling" element={<Filling />} />
            <Route path="/admin/filling/:id" element={<FillingPage />} />

            <Route path="/admin/restrictions" element={<Restrictions />} />

            <Route path="/admin/textures" element={<Textures />} />
            <Route path="/admin/textures/:id" element={<TexturePage />} />
            <Route path="/admin/textures/add" element={<AddTexture />} />

            <Route path="/admin/delivery" element={<Delivery />} />
            <Route path="/admin/delivery/:id" element={<DeliveryPage />} />
            <Route path="/admin/delivery/add" element={<AddDelivery />} />

            <Route path="/admin/payment" element={<Payment />} />
            <Route path="/admin/payment/:id" element={<PaymentPage />} />
            <Route path="/admin/payment/add" element={<AddPayment />} />


          </Routes>
        </div>

      </div>
    </>

  )
}

export default Admin