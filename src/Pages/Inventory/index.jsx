import { useContext, useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import { InventoryContext } from "../../Context"
import Product from "../../Components/Product"
import Form from "../../Components/Form"
import { ArrowDownIcon, XMarkIcon, DocumentPlusIcon } from "@heroicons/react/16/solid"
import ProductDetail from "../../Components/ProductDetail"
import CreateProduct from "../../Components/CreateProduct"


const Inventory = () => {
  const [products, setProducts ] = useState([])
  const { isOpenCreateProductModal,
    setIsOpenCreateProductModal } = useContext(InventoryContext)

  const {
    openStockFormOpen,
    isStockFormOpen,
    notification,
    closeNotification,
    isProductDetailOpen,
    notificationToShow } = useContext(InventoryContext)

    useEffect(() => {
      fetch('https://api-pizzeria.vercel.app/api/v1/products')
        .then(response => response.json())
        .then(data => setProducts(data))
    }, [])

    return (
    <Layout>
      <div className="flex justify-between rounded-tl-lg relative">
      <h2 className="mt-8 text-5xl ml-8 font-bold">Inventario</h2>
      <div className=" flex h-full w-1/3 mr-8 gap-2 justify-end">
        <button 
          className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm self-center text-sm"
          onClick={()  => openStockFormOpen()} type="button">
          <ArrowDownIcon className="size-3 inline-block mr-1"></ArrowDownIcon>
          Ingresar stock</button>
        <button 
          className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm"
          onClick={() => setIsOpenCreateProductModal(true)}>
          <DocumentPlusIcon 
          className="size-3 inline-block mr-1"></DocumentPlusIcon>
          Crear producto</button>
      </div>
      </div>
      <div className="flex gap-4 ml-8 my-8">
        <div className="flex flex-col justify-center w-56 h-24 p-4 bg-slate-300 rounded shadow-sm">
          <span className="font-medium text-3xl">1,582</span>
          <span>Total en inventario</span>
        </div>
        <div className="flex flex-col justify-center w-56 h-24 p-4 bg-slate-300 rounded shadow-sm">
          <span className="font-medium text-3xl">$1,9M</span>
          <span>Total en inventario</span>
        </div>
        <div className="flex flex-col justify-center w-56 h-24 p-4 bg-slate-300 rounded shadow-sm">
          <span className="font-medium text-3xl">6.82</span>
          <span>Inventario</span>
        </div>
      </div>
      <div className="ml-8 flex gap-4 mb-2">
        <span className="py-1 px-4 w-max font-light rounded-sm bg-slate-200 cursor-pointer">All</span>
        <span className="py-1 px-4 w-max font-light rounded-sm bg-slate-200 cursor-pointer">Active</span>
        <span className="py-1 px-4 w-max font-light rounded-sm bg-slate-200 cursor-pointer">Draft</span>
        <span className="py-1 px-4 w-max font-light rounded-sm bg-slate-200 cursor-pointer">Archived</span>
      </div>

      <div className="ml-8 flex-1 overflow-y-auto relative z-0">
        <table className="w-full border-gray-300">
          <thead className="text-left sticky top-0 bg-white shadow-sm z-10">
            <tr className="text-gray-400">
              <th>Producto</th>
              <th>Categoria</th>
              <th>stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => (
              <Product key={item["product-name"]} data={item} />
            ))}
          </tbody>
        </table>
      </div>

      {isStockFormOpen && (
        <Form />
      )}

      {notification && (
        <div 
          className="flex flex-col w-80 h-auto p-4 mr-4 mb-4 border solid rounded border-green-900 absolute bottom-0 right-0 bg-green-100 shadow-md">
          <span>
            <XMarkIcon 
            className="size-6 place-self-end text-green-900"
            onClick={() => closeNotification()}></XMarkIcon>
          </span>
        <p 
          className="w--max h-max text-green-600 font-bold">{`Se registro ${notificationToShow.quantity} ${notificationToShow.unit} de ${notificationToShow["product-name"]}.`}</p>
      </div>  
    )}

    {isProductDetailOpen && (
      <ProductDetail />
    )}
    {isOpenCreateProductModal && (<CreateProduct />)}
    </Layout>
  )
}

export default Inventory