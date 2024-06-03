import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppSelector } from '../store/hooks/redux'
import UItest from '../UIkit/UItest'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import ModalCode from './Modals/ModalCode'
import ModalContainer from './Modals/ModalContainer'
import ModalLogin from './Modals/ModalLogin'
import Error from './Pages/404/Error'
import About from './Pages/About/About'
import Account from './Pages/Account/Account'
import OrderPage from './Pages/Account/Orders/OrderPage/OrderPage'
import Catalog from './Pages/Catalog/Catalog'
import Contacts from './Pages/Contacts/Contacts'
import Home from './Pages/Home/Home'
import ConfInfo from './Pages/InfoPages/ConfInfo'
import Oferta from './Pages/InfoPages/Oferta'
import Exchange from './Pages/InfoPages/Exchange'
import Order from './Pages/Order/Order'
import SavedConstructions from './Pages/SavedConstructions/SavedConstructions'
import Instruction from './Pages/Instruction/Instruction'

function Client() {

  const { loginOpened, codeOpened } = useAppSelector(state => state.modalReducer)
  const favicon = document!.getElementById('favicon')! as HTMLLinkElement;
  favicon.href = "/favicon.ico"
  useEffect(() => {

  }, [loginOpened, codeOpened])

  return (
    <>
      <ModalContainer>
        {loginOpened && <ModalLogin />}
        {codeOpened && <ModalCode />}
      </ModalContainer>

      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog/:parent_id/:id' element={<Catalog />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/profile' element={<Account />} />
        <Route path='/oferta' element={<Oferta />} />
        <Route path='/exchange' element={<Exchange />} />
        <Route path='/confidential-policy' element={<ConfInfo />} />
        <Route path='/saved' element={<SavedConstructions />} />
        <Route path='/new_order' element={<Order />} />
        <Route path='/order/:id' element={<OrderPage />} />
        <Route path='/order/:id/instruction/:inst_id' element={<Instruction />} />
        <Route path='/about' element={<About />} />
        <Route path='/ui' element={<UItest />} />
        <Route path='*' element={<Error />} />
      </Routes>

      <Footer />
    </>
  )
}

export default Client