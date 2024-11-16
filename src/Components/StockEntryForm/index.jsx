import { useContext } from "react"
import { InventoryContext } from "../../Context"
import { ArrowDownIcon, ChevronUpDownIcon,XMarkIcon } from "@heroicons/react/16/solid"

const StockEntryForm = () => {
  const { 
    showNotification,
    isStockFormOpen,
    openStockFormOpen,
    closeStockFormOpen } = useContext(InventoryContext)

  const saveStock = async (event) => {
    try {
      event.preventDefault()
      const formData = new FormData(event.target)
      const formDataToObject = Object.fromEntries(formData)
      const response = await postData(formDataToObject)
      console.log(formDataToObject);
      if (response.status === 200) {
        showNotification(formDataToObject)
        event.target.reset() 
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al guardar los datos');
    }    
  }
  
  const postData = async(data) => {
    try {
      const response = await fetch("https://api-pizzeria.vercel.app/api/v1/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if(!response.ok) {
        throw new Error(`error status: ${respond.status}`);
      }
      
      const rta = await response;
      return rta;
    } catch (error) {
     console.error(error);
    }
  }
  
  return (
    <div className="w-96 p-4 border solid absolute bg-white right-0 rounded shadow-md">
      <div className="flex w-full justify-between">
      <h3 className="self-center font-bold text-3xl">Ingreso de stock</h3>
        <div className="flex self-center h-max">
          <span className="mr-2"> 
            <ChevronUpDownIcon className="size-7 rotate-45 text-gray-600"></ChevronUpDownIcon>
          </span>
          <span> 
            <XMarkIcon 
              className="size-7 text-gray-600"
              onClick={() => closeStockFormOpen()}></XMarkIcon>
          </span>
        </div>
      </div>
    <form onSubmit={(event) => saveStock(event)}>
        <div className="flex flex-col">
            <label>Nombre del Producto:</label>
            <select 
              className="bg-white border solid rounded" name="product-name" required>
                <option value="" disabled="">Selecciona un producto</option>
                <option value="ATÚN">ATÚN</option>
                <option value="AZUCAR BLANCA">AZUCAR BLANCA</option>
                <option value="AZUCAR MORENA">AZUCAR MORENA</option>
                <option value="CHAMPIÑONES">CHAMPIÑONES</option>
                <option value="CHORIZO">CHORIZO</option>
                <option value="ESPAGUETTI">ESPAGUETTI</option>
                <option value="FETUCCINI">FETUCCINI</option>
                <option value="HARINA">HARINA</option>
                <option value="MASA x 140gr">MASA x 140gr</option>
                <option value="MASA x 250gr">MASA x 250gr</option>
                <option value="MASA x 350gr">MASA x 350gr</option>
                <option value="MASA x 450gr">MASA x 450gr</option>
                <option value="MASA x 700gr">MASA x 700gr</option>
                <option value="NAPOLITANA">NAPOLITANA</option>
                <option value="OREGANO">OREGANO</option>
                <option value="PANELAS">PANELAS</option>
                <option value="PARMESANO">PARMESANO</option>
                <option value="PASTA LASAGNA">PASTA LASAGNA</option>
                <option value="PASTA PENE">PASTA PENE</option>
                <option value="PIÑA">PIÑA</option>
                <option value="POLLO">POLLO</option>
                <option value="QUESO">QUESO</option>
                <option value="QUESO CREMA">QUESO CREMA</option>
                <option value="SAL">SAL</option>
                <option value="SAL DE AJO">SAL DE AJO</option>
                <option value="SALAMIS">SALAMIS</option>
                <option value="CAJA PORCION">CAJA PORCION</option>
                <option value="CAJA PIZZETA">CAJA PIZZETA</option>
                <option value="CAJA PEQUEÑA">CAJA PEQUEÑA</option>
                <option value="CAJA MEDIANA">CAJA MEDIANA</option>
                <option value="CAJA GRANDE">CAJA GRANDE</option>
                <option value="CAJA MEDIA JUMBO">CAJA MEDIA JUMBO</option>
                <option value="PORTA PIZZAS">PORTA PIZZAS</option>
                <option value="PORTA PIZZETAS">PORTA PIZZETAS</option>
                <option value="CAJA HAMBURGUESA">CAJA HAMBURGUESA</option>
                <option value="ACEITE RIQUISIMO">ACEITE RIQUISIMO</option>
                <option value="ACEITE SALOMON">ACEITE SALOMON</option>
                <option value="MANTEQUILLA">MANTEQUILLA</option>
                <option value="MARGARINA">MARGARINA</option>
                <option value="PASTA DE TOMATE">PASTA DE TOMATE</option>
                <option value="PIMIENTA (libra)">PIMIENTA</option>
                <option value="ALBAHACA (libra)">ALBAHACA</option>
            </select>
            <label>Cantidad:</label>
            <input className="bg-white border solid rounded outline-slate-300 shadow-inner" type="number" name="quantity" min="1" required />
            <label>Unidad de Medida:</label>
            <select className="bg-white border solid rounded" name="unit" required="">
                <option value="unidades">Unidades</option>
                <option value="libras">libras</option>
                <option value="frascos">frasco</option>
                <option value="bloques">bloques</option>
                <option value="bandejas">bandejas</option>
            </select>
        </div>
        <div className="flex justify-between mt-4">
        <button 
          className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm self-center text-sm" type="submit">
          <ArrowDownIcon className="size-3 inline-block mr-1"></ArrowDownIcon>
          Ingresar</button>
          <button 
          className="py-1 px-2 h-8 w-max bg-white rounded shadow-sm self-center text-sm border" type="button">
          Cancelar</button>
        </div>
    </form>
    
    </div>
  )
}

export default StockEntryForm