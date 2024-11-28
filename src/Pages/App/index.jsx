import { useRoutes, BrowserRouter } from 'react-router-dom'
import { InventoryProvider } from '../../Context'
import { OrderProvider } from '../../Context/OrderContext'
import { ProductProvider } from '../../Context/ProductContext'
import AsideBar from '../../Components/AsideBar'
import NavBar from '../../Components/NavBar'
import Home from '../Home'
import Orders from '../Orders'
import Inventory from '../Inventory'
import Payments from '../Payments'
import Customers from '../Customers'
import Notifications from '../Notifications'
import MyAccount from '../MyAccount'
import NotFound from '../NotFound'
import RigthSideBar from '../../Components/RigthSideBar'
import './App.css'
import SearchBar from '../../Components/SearchBar'

const AppRoutes = () => {
  
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/Dashboard', element: <Home /> },
    { path: '/Orders', element: <Orders /> },
    { path: '/Inventory', element: <Inventory /> },
    { path: '/Payments', element: <Payments /> },
    { path: '/Customers', element: <Customers /> },
    { path: '/Notifications', element: <Notifications /> },
    { path: '/account', element: <MyAccount /> },
    { path: '/*', element: <NotFound /> },
  ])

  return routes
}


const App = () => {
  return (
    <InventoryProvider>
      <OrderProvider>
        <ProductProvider>
          <BrowserRouter>
            <AsideBar>
              <SearchBar />
              <NavBar />
            </AsideBar>
            <AppRoutes />
            <RigthSideBar />
          </BrowserRouter>
        </ProductProvider>
      </OrderProvider>
    </InventoryProvider>

  )
}

export default App