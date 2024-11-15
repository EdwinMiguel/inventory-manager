import { ChevronUpDownIcon, XMarkIcon, PencilSquareIcon, PrinterIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid"
import { useContext, useState } from "react"
import { InventoryContext } from "../../Context"

const ProductDetail = () => {
  const {
    closeProductDetail,
    productToShow,
    setQuantityValue,
    quantityValue,
    isEditProductOn,
    setIsEditpProductOn } = useContext(InventoryContext)


  const [quantities, setQuantities] = useState([])

  const addQuantityToList = (quantity) => {
    if (typeof(quantity) !== String) {
      const combinedQuantities = [...quantities, quantity]
      const uniqueQuantities = [...new Set(combinedQuantities)]
      setQuantities(uniqueQuantities)
      setQuantityValue('')
    }
  }

  const updateProduct = (newData) => {
    newData.preventDefault()
    const data = new FormData(newData.target)
    const dataToObject = Object.fromEntries(data)
    dataToObject.quantities = quantities
    console.log(dataToObject);
    console.log(productToShow);
  }
  return (
    <div className="w-96 h-screen p-4 border solid absolute bg-white right-0 rounded shadow-md">
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
        <button 
          className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm self-center text-sm"
          onClick={() => setIsEditpProductOn(true)}>
          <PencilSquareIcon 
            className="size-4 inline-block mr-1"></PencilSquareIcon>
          Editar</button>
        <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm">
          <PrinterIcon className="size-4 inline-block mr-1"></PrinterIcon>
          Imprimir</button>
        <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm">
          <EllipsisHorizontalIcon className="size-4 inline-block"></EllipsisHorizontalIcon>
        </button>
      </div>
      <span className="font-medium">Información del producto</span>
      
      {isEditProductOn ? (
        <form className="flex flex-col w-full gap-2" onSubmit={(event) => updateProduct(event)}>
          <div className="flex justify-between">
            <label className="text-gray-500">Id</label>
            <input className="text-right outline-none" type="number" value={productToShow["id_producto"]} name="id" readOnly/>
          </div>
          <div className="flex justify-between">
            <label className="text-gray-500">Nombre</label>
            <input 
            className="text-right bg-white border solid rounded outline-slate-300 shadow-inner" type="text" placeholder={productToShow.nombre} name="name"/>
          </div>
          <div className="flex justify-between">
            <label className="text-gray-500">Precio</label>
            <input 
              className="text-right bg-white border solid rounded outline-slate-300 shadow-inner" type="number" min={1} placeholder={productToShow.precio.replace('$', '')} name="price"/>
          </div>
          <div className="flex justify-between">
            <label className="text-gray-500">Categoria</label>
            <select className="bg-white border solid rounded outline-slate-300" name="category">
              <option value="quesos">quesos</option>
              <option value="cajas">cajas</option>
              <option value="Especias y condimentos">Especias y condimentos</option>
              <option value="masas">masas</option>
            </select>
          </div>
          <div className="flex justify-between" >
            <label className="text-gray-500">Presentaciones</label>
              <input className="w-6/12 mr-1 bg-white border solid rounded outline-slate-300 shadow-inner" type="number" value={quantityValue} onChange={(e) => setQuantityValue(e.target.value)} name="quantities" placeholder={productToShow.presentacion}/>
              <button 
                className="px-2 w-max bg-black rounded text-white shadow-sm self-center text-sm cursor-pointer"
                onClick={() => parseInt(quantityValue) > 0 && addQuantityToList(quantityValue)} type="button">+</button>
          </div>
          <span className="h-24 break-words">{`Cantidades de: ${quantities.length !== false && (quantities)}`}</span>
          <div className="flex justify-between">
            <label className="text-gray-500">Descripción</label>
            <textarea className="bg-white border solid rounded outline-slate-300 shadow-inner" name="description" placeholder={productToShow.descripcion}></textarea>
          </div>
          <div className="flex justify-between">
            <label className="text-gray-500">Stock</label>
            <input className="text-right bg-white border solid rounded outline-slate-300 shadow-inner" type="number" min={1} placeholder={productToShow.stock} name="stock"/>
          </div>
          <div className="flex justify-between">
            <label className="text-gray-500">Total</label>
            <input className="text-right bg-white border solid rounded outline-slate-300 shadow-inner" type="number" min={1} placeholder={productToShow.total.replace('$', '')} name="total"/>
          </div>
          <div className="flex justify-between">
              <button className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm self-center text-sm" type="submit">Guardar</button>
              <button 
                className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm"
                onClick={() => setIsEditpProductOn(false)}>Cancelar</button>
          </div>
      </form>
      ) : (
        <div className="flex flex-col w-full gap-2">         
        <p className="flex justify-between">
          <span className="text-gray-500">Id</span>
          <span className="text-right">{productToShow["id_producto"]}</span>
        </p>
        <p className="flex justify-between">
            <span className="text-gray-500">Nombre</span>
            <span className="text-right">{productToShow.nombre}</span>
          </p>
        <div className="flex justify-between">
          <span className="text-gray-500">Precio</span>
          <span className="text-right">{productToShow.precio}</span>
        </div>
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
      )}
    </div>
  )
}

export default ProductDetail