import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

//Context
import { Role } from './Context/Role.context.jsx'
import { User } from './Context/User.context.jsx'
import { Supplier } from './Context/Supplier.context.jsx'
import { Supplies } from './Context/Supplies.context.jsx'
import { CategorySupplies } from './Context/CategorySupplies.context.jsx'
import { CategoryProducts } from './Context/CategoryProducts.context.jsx'

// Pages
import UserPage from './Pages/UserPage.jsx'
import RolePage from './Pages/RolePage.jsx'
import SupplierPage from './Pages/SupplierPage.jsx'
import SuppliesPage from './Pages/SuppliesPage.jsx'
import SuppliesCategoryPage from './Pages/SuppliesCategoryPage.jsx'
import ProductCategoryPage from './Pages/ProductCategoryPage.jsx'
import WaiterPage from './Pages/WaiterPage.jsx'

import EditProfile from './Pages/EditProfilePage.jsx'

// Menu & Header
import Navbar from './Components/Navbar.jsx'
import Header from './Components/Header.jsx'


function App() {
  return (
    <BrowserRouter>
      <Role>
        <User>
          <CategorySupplies>
            <CategoryProducts>
              <Supplier>
                <Supplies>
                  <Navbar />
                  <Header />
                  <Routes>
                    <Route path='/' element={<h3>DashBoard</h3>} />
                    <Route path='/setting' element={<RolePage />} />
                    <Route path='/user' element={<UserPage />} />
                    <Route path='/category_supplies' element={<SuppliesCategoryPage />} />
                    <Route path='/supplies' element={<SuppliesPage />} />
                    <Route path='/supplier' element={<SupplierPage />} />
                    <Route path='/shopping' element={<h3>Compras</h3>} />
                    <Route path='/category_product' element={<ProductCategoryPage />} />
                    <Route path='/product' element={<h3>Producto</h3>} />
                    <Route path='/waiter' element={<WaiterPage />} />
                    <Route path='/sale' element={<h3>Venta</h3>} />

                    <Route path='/alert' element={<h3>Aletas</h3>} />
                    <Route path='/edit_profile' element={<EditProfile />} />
                    <Route path='/instructions' element={<h3>Manuales de los modulos</h3>} />
                  </Routes>
                </Supplies>
              </Supplier>
            </CategoryProducts>
          </CategorySupplies>
        </User>
      </Role>
    </BrowserRouter>
  )
}

export default App
