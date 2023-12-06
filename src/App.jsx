import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'

//Context
import { Role } from './Context/Role.context.jsx'
import { User } from './Context/User.context.jsx'
import { Supplier } from './Context/Supplier.context.jsx'
import { ShoppingProvider } from './Context/Shopping.context.jsx'
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
import ShoppingPage from './Pages/ShoppingPage.jsx'
import Login from './Pages/Login.jsx'
import ResetPassword from './Pages/ResetPassword.jsx'
import NewPassword from './Pages/NewPassword.jsx'
import NewPurchase from './Pages/newPurchase.jsx'

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
                  <ShoppingProvider>
                    <Navbar />
                    <Header />
                    <Routes>
                      <Route path='/' element={<Login />} />
                      <Route path='/resetPassword' element={<ResetPassword />} />
                      <Route path='/newPassword/:idUser' element={<NewPassword />} />

                      <Route element={<ProtectedRoute />}>
                        <Route path='/dashboard' element={<h3>DashBoard</h3>} />
                        <Route path='/setting' element={<RolePage />} />
                        <Route path='/user' element={<UserPage />} />
                        <Route path='/category_supplies' element={<SuppliesCategoryPage />} />
                        <Route path='/supplies' element={<SuppliesPage />} />
                        <Route path='/supplier' element={<SupplierPage />} />
                        <Route path='/shopping' element={<ShoppingPage/>} />
                        <Route path='/shop' element={<NewPurchase />} />
                        <Route path='/category_product' element={<ProductCategoryPage />} />
                        <Route path='/product' element={<h3>Producto</h3>} />
                        <Route path='/waiter' element={<WaiterPage />} />
                        <Route path='/sale' element={<h3>Venta</h3>} />
                      </Route>
                    </Routes>
                  </ShoppingProvider>
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
