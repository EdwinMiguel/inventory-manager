import { ChevronUpDownIcon, DocumentPlusIcon, XMarkIcon } from "@heroicons/react/16/solid"
import { useContext, useState } from "react"
import { InventoryContext } from "../../Context";


const CreateProduct = () => {
  const { 
    setIsOpenCreateProductModal,
    quantityValue, 
    setQuantityValue,
    quantities, 
    setQuantities,
    showNotification,
    setProducts } = useContext(InventoryContext)

  const [loading, setLoading ] = useState(false)

  const createNewProduct = async (event) => {
    event.preventDefault()
    
    try {
      setLoading(true)

      const values = new FormData(event.target)
      const data = Object.fromEntries(values)
      data.quantities = quantities
      console.log(data);

      const response = await fetch("https://api-pizzeria.vercel.app/api/v2/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      
      if(!response.ok) {
        // Si el servidor responde con un error
        throw new Error(responseData.message || `Error al crear producto. Estado: ${response.status}`);
      }
      // Verificar que los datos devueltos son correctos
      if (responseData.success) {
        // const refreshResponse = await fetch("https://api-pizzeria.vercel.app/api/v1/products");
        // const refreshData = await refreshResponse.json();
        // setProducts(refreshData);

        showNotification({
          success: responseData.success,
          message: responseData.message
        });
      
      event.target.reset();
      setQuantities([]);
    } else {
      throw new Error('Respuesta del servidor incompleta');
    }

    } catch (error) {
        //Manejar diferentes tipos de errores
        if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
          showNotification({
            success: 'error',
            message: error.message
          });
        } else {
          showNotification({
            success: 'error',
            message: error.message || 'Error al crear el producto'
          });
        }
        
        // Opcional: Loguear el error para debugging
        console.error('Error creating product:', error);
    
      } finally {
         setLoading(false);
        }
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
      <input className="bg-white border solid rounded outline-slate-300 shadow-inner" type="text" name="name" required/>
      <label >Descripción:</label>
      <textarea className="bg-white border solid rounded outline-slate-300 shadow-inner" name="description" placeholder="escribe una descrición del producto"></textarea>
      <label>precio por unidad:</label>
      <input className="bg-white border solid rounded outline-slate-300 shadow-inner" type="number" min="1" name="price" required />
      <label>categoría:</label>
      <select className="bg-white border solid rounded outline-slate-300" name="idCategory">
        <option value="1">Pescados y Mariscos</option>
        <option value="2">Azúcares</option>
        <option value="3">Verduras y Conservas</option>
        <option value="4">Carnes</option>
        <option value="5">Pasta y Fideos</option>
        <option value="6">Harinas y Masa</option>
        <option value="7">Lácteos</option>
        <option value="8">Especias y Condimentos</option>
        <option value="9">Aceites y Salsas</option>
        <option value="10">Embalajes</option>
        <option value="11">Otros</option>
      </select>
      <label>unidad de almacenamiento:</label>
      <input className="bg-white border solid rounded outline-slate-300 shadow-inner" type="text" name="measurementUnit" required/>
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
        className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm text-sm inline-flex items-center justify-center space-x-1" type="submit">
        <DocumentPlusIcon className="size-3 inline-block mr-1"></DocumentPlusIcon>
        Crear
        {loading && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="ml-1"
            >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              r="35"
              strokeDasharray="164.93361431346415 56.97787143782138"
              transform="rotate(275.845 50 50)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                calcMode="linear"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        )}
        </button>
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