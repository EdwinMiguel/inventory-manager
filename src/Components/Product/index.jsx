import { useContext, useState } from "react"
import { EllipsisHorizontalIcon, PencilSquareIcon, EyeIcon, TrashIcon } from "@heroicons/react/16/solid"
import { ProductContext } from "../../Context/ProductContext"

const Product = ({data}) => {
  const {
    openProductDetail, 
    setProductToShow,
    setIsEditpProductOn } = useContext(ProductContext)

  const [productMenu, setProductMenu ] = useState(false)

  const showProducDetail = (productData) => {
    setProductToShow(productData)
    openProductDetail()
  }

  return (
    <tr 
      className="hover:bg-slate-200 relative">
        <td className="flex">
          <input type="checkbox" />
          <span>{data.name}</span>
        </td>
        <td>{data.category.name}</td>
        <td>{data.stock}</td>
        <td>{new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(data.price)}</td>
        <td>
          <EllipsisHorizontalIcon 
            className="w-6 h-6 cursor-pointer"
            onClick={() => setProductMenu(!productMenu)}></EllipsisHorizontalIcon>
          {productMenu && (
            <div 
              className="flex w-max h-max p-2 rounded border solid absolute bg-white top-6 right-6 z-10">
              <p className="flex flex-col">
                <span 
                  className="flex hover:bg-slate-100 cursor-pointer"
                  onClick={() => {
                    showProducDetail(data)
                    setProductMenu(false)
                    setIsEditpProductOn(false)
                  }}><EyeIcon className="size-4 inline-block mr-1 self-center"></EyeIcon>Ver</span>
                <span 
                  className="flex hover:bg-slate-100 cursor-pointer"
                  onClick={() => {
                    showProducDetail(data)
                    setProductMenu(false)
                    setIsEditpProductOn(true)
                  }}><PencilSquareIcon 
                  className="size-4 inline-block mr-1 self-center"></PencilSquareIcon>Editar</span>
                <span className="flex hover:bg-slate-100 cursor-pointer"><TrashIcon className="size-4 inline-block mr-1 self-center"></TrashIcon>Eliminar</span>
              </p>
            </div>
          )}  
        </td>
    </tr>
  )
}

export default Product