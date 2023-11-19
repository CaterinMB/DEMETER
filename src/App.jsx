import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './ProtectedRoute.jsx'

//Context
import { Role } from './Context/Role.context.jsx'
import { User } from './Context/User.context.jsx'
import { Supplier } from './Context/Supplier.context.jsx'
import { ShoppingProvider } from './Context/Shopping.context.jsx'

// Pages
import UserPage from './Pages/UserPage.jsx'
import SupplierPage from './Pages/SupplierPage.jsx'
import ShoppingPage from './Pages/ShoppingPage.jsx'
import Login from './Pages/Login.jsx'
import ResetPassword from './Pages/ResetPassword.jsx'
import NewPassword from './Pages/NewPassword.jsx'
import NewPurchase from './Pages/newPurchase.jsx'

// Menu & Header
import Navbar from './Components/Navbar.jsx'
import Header from './Components/Header.jsx'
import { useEffect, useState } from 'react'


function App() {

  const [menu, setMenu] = useState(true)



  return (
    <BrowserRouter>
      <Role>
        <User>
          <ShoppingProvider>
            <Supplier>
            <Navbar/>
            <Header/>
                
              <Routes>

                <Route path='/' element={<Login setMenu={setMenu} />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
                <Route path='/NewPassword' element={<NewPassword />} />

                <Route element={<ProtectedRoute />}>
                  <Route path='/dashboard' element={<h3>DashBoard</h3>} />
                  <Route path='/setting' element={<h3>Roles y permisos</h3>} />
                  <Route path='/user' element={<UserPage />} />
                  <Route path='/category_supplies' element={<h3>Cateria insumo</h3>} />
                  <Route path='/supplies' element={<h3>Insumos</h3>} />
                  <Route path='/supplier' element={<SupplierPage />} />
                  <Route path='/shopping' element={<ShoppingPage />} />
                  <Route path='/shop' element={<NewPurchase />} />
                  <Route path='/category_product' element={<h3>Categoria producto</h3>} />
                  <Route path='/product' element={<h3>Producto</h3>} />
                  <Route path='/waiter' element={<h3>Meseros</h3>} />
                  <Route path='/sale' element={<h3>Venta</h3>} />
                </Route>
              </Routes>

            </Supplier>
          </ShoppingProvider>
        </User>
      </Role>
    </BrowserRouter>
  )
}

export default App
