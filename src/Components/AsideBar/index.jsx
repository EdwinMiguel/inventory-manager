import SearchBar from "../SearchBar"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"


const AsideBar = ({ children }) => {
  return (
    <aside className="flex flex-col w-[calc(100%/1)] h-full p-4 bg-black absolute left-0 col-start-1 col-end-1">
      <img className="w-32" src="src/assets/logo_drive_blanco.png" alt="" />
      {children}
    </aside>
  )
}

export default AsideBar