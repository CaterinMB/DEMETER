import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

//Context
import { Role } from './Context/Role.context.jsx'
import { User } from './Context/User.context.jsx'
import { Supplier } from './Context/Supplier.context.jsx'

// Pages
import UserPage from './Pages/UserPage.jsx'
import SupplierPage from './Pages/SupplierPage.jsx'
import WaiterPage from './Pages/WaiterPage.jsx'

// Menu & Header
import Navbar from './Components/Navbar.jsx'
import Header from './components/Header.jsx'


function App() {
  return (
    <BrowserRouter>
      <Role>
        <User>
          <Supplier>
            <Navbar />
            <Header />
            <Routes>
              <Route path='/' element={<h3>DashBoard</h3>} />
              <Route path='/setting' element={<h3>Roles y permisos</h3>} />
              <Route path='/user' element={<UserPage />} />
              <Route path='/category_supplies' element={<h3>Cateria insumo</h3>} />
              <Route path='/supplies' element={<h3>Insumos</h3>} />
              <Route path='/supplier' element={<SupplierPage />} />
              <Route path='/shopping' element={<h3>Compras</h3>} />
              <Route path='/category_product' element={<h3>Categoria producto</h3>} />
              <Route path='/product' element={<h3>Producto</h3>} />
              <Route path='/waiter' element={<WaiterPage/>} />
              <Route path='/sale' element={<h3>Venta</h3>} />
            </Routes>
          </Supplier>
        </User>
      </Role>
    </BrowserRouter>
  )
}

export default App
