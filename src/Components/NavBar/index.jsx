import { PresentationChartLineIcon, ArchiveBoxIcon, ClipboardDocumentIcon } from "@heroicons/react/24/solid"
import { NavLink, useLocation } from "react-router-dom"

const NavBar = () => {
  const location = useLocation()
  const activeStyle = 'underline underline-offset-4 hover:bg-slate-500'
  return (
    <nav className="flex flex-col text-white">
      <ul className="flex flex-col border-b solid py-5">
        <li className={`p-2 hover:bg-slate-500 rounded ${location.pathname === '/' ? 'bg-slate-900' : ''}`}>
          <NavLink 
            to='/'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            } 
            >
            <PresentationChartLineIcon className="size-6 mr-2 text-white inline-block"></PresentationChartLineIcon>
            Dashboard
          </NavLink>
        </li>
        <li className={`p-2 hover:bg-slate-500 rounded ${location.pathname === '/orders' ? 'bg-slate-900' : ''}`}>
          <NavLink 
            to='/orders'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            } 
            >
            <ClipboardDocumentIcon className="size-6 mr-2 text-white inline-block"></ClipboardDocumentIcon>Pedidos
          </NavLink>
        </li>
        <li className={`p-2 hover:bg-slate-500 rounded ${location.pathname === '/Inventory' ? 'bg-slate-900' : ''}`}>
          <NavLink 
            to='/Inventory'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            } 
            >
            <ArchiveBoxIcon className="size-6 mr-2 text-white inline-block"></ArchiveBoxIcon>
            Inventario
          </NavLink>
        </li>
        <li className="p-2 hover:bg-slate-500 rounded">
          <NavLink 
            to='/payments'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            } 
            >
            Pagos
          </NavLink>
        </li>
        <li className="p-2 hover:bg-slate-500 rounded">
          <NavLink 
            to='/customers'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            } 
            >
            Clientes
          </NavLink>
        </li>
      </ul>
      <ul>
      <li className="p-2 hover:bg-slate-500 rounded">
          <NavLink to='/Notifications'>
            Notificaciones
          </NavLink>
        </li>
        <li className="p-2 hover:bg-slate-500 rounded">
          <NavLink>
            Mi cuenta
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar