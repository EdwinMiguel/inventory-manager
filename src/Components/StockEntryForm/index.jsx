import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../../Context/ProductContext"
import { ArrowDownIcon, ChevronUpDownIcon,XMarkIcon } from "@heroicons/react/16/solid"

const StockEntryForm = () => {
  const {
    products,
    showNotification,
    closeStockFormOpen
  } = useContext(ProductContext)

  const [loading, setLoading ] = useState(false)
  const [suppliers, setSuppliers ] = useState([])

  async function getSuppliersData () {
    try {
      fetch("https://api-pizzeria.vercel.app/api/v2/suppliers")
        .then(response => response.json())
        .then(suppliersData => setSuppliers(suppliersData));
    } catch (error) {
      console.error('Error fetching suppliers data:', error);
      //Debería tener un estado de error: setError(error);
    }
  }

  useEffect(() => {
    getSuppliersData();
  }, []);

  const saveStock = async (event) => {
    try {
      setLoading(true)
      event.preventDefault()
      const formData = new FormData(event.target)
      const formDataToObject = Object.fromEntries(formData)
      console.log(formDataToObject);
      const response = await postData(formDataToObject)
      if (response.success === true) {
        showNotification(response.savedData)
        event.target.reset()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }
  
  const postData = async(data) => {
    try {
      const response = await fetch("https://api-pizzeria.vercel.app/api/v2/inventory", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if(!response.ok) {
        throw new Error(`error status: ${respond.status}`);
      }
      
      const rta = await response.json();
      console.log(rta);
      return rta;
    } catch (error) {
     console.error(error);
    }
  }
  
  return (
    <div className="w-96 h-screen p-4 border solid absolute bg-white right-0 rounded shadow-md">
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
          className="bg-white border solid rounded" name="idProduct" required>
          {products.map(product => <option key={product.idProduct} value={product.idProduct}>{product.name}</option>)}
        </select>
        <label>Cantidad:</label>
        <input className="bg-white border solid rounded outline-slate-300 shadow-inner" type="number" name="quantity" min="1" required />
        <label>Proveedor:</label>
        <select className="bg-white border solid rounded outline-slate-300" name="idSupplier">
          {
            suppliers.map(supplier => <option value={supplier.idSuppliers}>{supplier.name}</option>)
          }
        </select>
        <label htmlFor="notes">Observaciones</label>
        <textarea className="h-20 bg-white border solid rounded outline-slate-300 shadow-inner" name="notes"></textarea>
      </div>
      <div className="flex justify-between mt-4">
      <button
        className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm text-sm inline-flex items-center justify-center space-x-1" type="submit">
        <ArrowDownIcon className="size-3 inline-block mr-1"></ArrowDownIcon>
        Ingresar
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
          onClick={() => closeStockFormOpen()}>
        Cancelar</button>
      </div>
    </form>
    
    </div>
  )
}

export default StockEntryForm