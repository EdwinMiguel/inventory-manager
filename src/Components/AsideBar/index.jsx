import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"


const AsideBar = ({ children }) => {
  return (
    <aside className="flex flex-col w-[calc(100%/1)] h-full p-4 bg-black absolute left-0 col-start-1 col-end-1">
      <img className="w-32" src="src/assets/logo_drive_blanco.png" alt="" />
      <input className="w-full h-8 self-center p-2 mt-8 rounded-full bg-transparent solid border-2 border-slate-700" type="text" name="" id="" placeholder={`Buscar`}/>
      {children}
    </aside>
  )
}

export default AsideBar