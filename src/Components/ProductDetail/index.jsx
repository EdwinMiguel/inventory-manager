import { ChevronUpDownIcon, XMarkIcon, PencilSquareIcon, PrinterIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid"
import { useContext } from "react"
import { InventoryContext } from "../../Context"

const ProductDetail = () => {
  const {
    closeProductDetail,
    productToShow
  } = useContext(InventoryContext)

  return (
    <div className="w-80 h-screen p-4 border solid absolute bg-white right-0 rounded shadow-md">
      <div className="flex w-full justify-end">
        <span> 
          <ChevronUpDownIcon className="size-7 rotate-45 text-gray-600 mr-1"></ChevronUpDownIcon>
        </span>
        <span>
          <XMarkIcon 
            className="size-7 text-gray-600"
            onClick={() => closeProductDetail()}></XMarkIcon>
        </span>
      </div>
      <span className="text-5xl font-bold w-full break-words hyphens-auto">{productToShow.nombre}</span>
      <div className="flex gap-2 mt-4 mb-4">
        <button className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm self-center text-sm">
          <PencilSquareIcon className="size-4 inline-block mr-1"></PencilSquareIcon>
          Editar</button>
        <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm">
          <PrinterIcon className="size-4 inline-block mr-1"></PrinterIcon>
          Imprimir</button>
        <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm">
          <EllipsisHorizontalIcon className="size-4 inline-block"></EllipsisHorizontalIcon>
        </button>
      </div>
      <span className="font-medium">Información del producto</span>
      <div className="flex flex-col w-full gap-2">
        <p className="flex justify-between">
          <span className="text-gray-500">Id</span>
          <span className="text-right">{productToShow["id_producto"]}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Precio</span>
          <span className="text-right">{productToShow.precio}</span>
        </p>
        <p className="flex justify-between">
        <span className="text-gray-500">Categoria</span>
        <span className="text-right">{productToShow.categoria}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Presentaciones</span>
          <span className="text-right">{productToShow.presentacion}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Descripción</span>
          <span className="text-right">{productToShow.descripcion}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Stock</span>
          <span className="text-right">{productToShow.stock}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Total</span>
          <span className="text-right">{productToShow.total}</span>
        </p>
      </div>
    </div>
  )
}

export default ProductDetail