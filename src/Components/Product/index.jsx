import { EllipsisHorizontalIcon, PencilSquareIcon, EyeIcon, TrashIcon } from "@heroicons/react/16/solid"
import { useContext } from "react"
import { InventoryContext } from "../../Context"

const Product = (data) => {
  const { 
    toggleOpenProductMenu, 
    productMenu, 
    openProductDetail, 
    setProductToShow,
    setIsEditpProductOn } = useContext(InventoryContext)

  const showProducDetail = (productData) => {
    setProductToShow(productData)
    openProductDetail()
  }

  return (
    <tr 
      className="hover:bg-slate-200 relative">
        <td className="flex">
          <input type="checkbox" />
          <span>{data.data.nombre}</span>
        </td>
        <td>{data.data.categoria}</td>
        <td>{data.data.stock}</td>
        <td>{data.data.precio}</td>
        <td>
          <EllipsisHorizontalIcon 
            className="w-6 h-6 cursor-pointer"
            onClick={() => toggleOpenProductMenu(data.data["id_producto"])}></EllipsisHorizontalIcon>
        </td>
        {productMenu === data.data["id_producto"] && (
          <div 
            className="flex w-max h-max p-2 rounded border solid absolute bg-white top-6 right-6 z-10">
            <p className="flex flex-col">
              <span 
                className="flex hover:bg-slate-100 cursor-pointer"
                onClick={() => {
                  showProducDetail(data.data)
                  setIsEditpProductOn(false)
                }}><EyeIcon className="size-4 inline-block mr-1 self-center"></EyeIcon>Ver</span>
              <span 
                className="flex hover:bg-slate-100 cursor-pointer"
                onClick={() => {
                  showProducDetail(data.data)
                  setIsEditpProductOn(true)
                }}><PencilSquareIcon 
                className="size-4 inline-block mr-1 self-center"></PencilSquareIcon>Editar</span>
              <span className="flex hover:bg-slate-100 cursor-pointer"><TrashIcon className="size-4 inline-block mr-1 self-center"></TrashIcon>Eliminar</span>
            </p>
        </div>
        )}
    </tr>
  )
}

export default Product