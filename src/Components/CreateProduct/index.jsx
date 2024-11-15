import { ChevronUpDownIcon, DocumentPlusIcon, XMarkIcon } from "@heroicons/react/16/solid"
import { useContext, useState } from "react"
import { InventoryContext } from "../../Context";

const CreateProduct = () => {
  const { 
    setIsOpenCreateProductModal,
    quantityValue, 
    setQuantityValue,
    quantities, 
    setQuantities } = useContext(InventoryContext)

  const createNewProduct = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const formDataToObject = Object.fromEntries(data)
    formDataToObject.quantities = quantities
    console.log(formDataToObject);
  }

  const addQuantityToList = (quantity) => {
    if (typeof(quantity) !== String) {
      const combinedQuantities = [...quantities, quantity]
      const uniqueQuantities = [...new Set(combinedQuantities)]
      setQuantities(uniqueQuantities)
      setQuantityValue('')
    }
  }

  return (
    <div className="w-96 p-4 h-full border solid absolute bg-white rounded shadow-md top-0 right-0">
      <div className="flex w-full justify-end">
        <span> 
          <ChevronUpDownIcon className="size-7 rotate-45 text-gray-600"></ChevronUpDownIcon>
        </span>
        <span> 
          <XMarkIcon
            className="size-7 text-gray-600"
            onClick={() => {
              setQuantities('')
              setIsOpenCreateProductModal(false)
            }}></XMarkIcon>
        </span>
      </div>
    <form className="flex flex-col" onSubmit={(event) => createNewProduct(event)}>  
      <label>Nombre del Producto:</label>
      <input className="bg-white border solid rounded outline-slate-300 shadow-inner" type="text" name="productName" required/>
      <label >Descripción:</label>
      <textarea className="bg-white border solid rounded outline-slate-300 shadow-inner" name="description" placeholder="escribe una descrición del producto"></textarea>
      <label>precio por unidad:</label>
      <input className="bg-white border solid rounded outline-slate-300 shadow-inner" type="number" min="1" name="price" required />
      <label>categoría:</label>
      <select className="bg-white border solid rounded outline-slate-300" name="category">
        <option value="quesos">quesos</option>
        <option value="cajas">cajas</option>
        <option value="Especias y condimentos">Especias y condimentos</option>
        <option value="masas">masas</option>
      </select>
      <label>unidad de almacenamiento:</label>
      <input className="bg-white border solid rounded outline-slate-300 shadow-inner" type="text" name="unit" required/>
      <div className="flex flex-col">
        <label>Se vende por cantidades de:</label>
          <div>
            <input className="mr-1 bg-white border solid rounded outline-slate-300 shadow-inner" type="number" value={quantityValue} onChange={(e) => setQuantityValue(e.target.value)} name="quantities"/>
            <button 
              className="px-2 w-max bg-black rounded text-white shadow-sm self-center text-sm cursor-pointer"
              onClick={() => parseInt(quantityValue) > 0 && addQuantityToList(quantityValue)} type="button">+</button>
          </div>
        <span className="h-24 break-words">{`Cantidades de: ${quantities.length !== false && (quantities)}`}</span>
      </div>  
      <div className="flex justify-between mt-4">
      <button 
        className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm self-center text-sm" type="submit">
        <DocumentPlusIcon className="size-3 inline-block mr-1"></DocumentPlusIcon>
        Crear</button>
        <button 
          className="py-1 px-2 h-8 w-max bg-white rounded shadow-sm self-center text-sm border" type="button"
          onClick={() => {
            setQuantities('')
            setIsOpenCreateProductModal(false)
          }}>
        Cancelar</button>
      </div>
    </form>
    
    </div>
  )
}

export default CreateProduct