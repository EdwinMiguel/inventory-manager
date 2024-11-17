import { useContext } from 'react'
import { InventoryContext } from "../../Context"
import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderDetails = () => {
  const { isOrderDetailsOpen, closeOrderDetails, orderToShow } = useContext(InventoryContext)
  
  if (!isOrderDetailsOpen || !orderToShow) return null;
  return (
    <div 
    className={`flex w-80 flex-col border solid rounded-lg absolute bg-white overflow-hidden`}>
      <div className="bg-black text-white flex justify-between px-4 py-2">
      <h2>{`Pedido #${orderToShow["ID PEDIDO"]}`}</h2>
      <XMarkIcon 
        className="size-6 text-white cursor-pointer"
        onClick={() => closeOrderDetails()}></ XMarkIcon>
      </div>
      <div className="p-4">
        <p className="flex flex-col">
          <span className="font-medium text-2xl">{orderToShow.SEDE}</span>
          <span className="font-medium text-md mb-2">{orderToShow["FECHA ENTREGA"]}</span>
          <span>{orderToShow.OBSERVACIONES}</span>
        </p>
      </div>
      <div className='p-4 border-t border-b'>
        {orderToShow.products.map((product) => (
          <p className='flex justify-between' key={product.idProduct}>
            <span>{product.name}</span>
            <span>{product.quantity} x {product.totalPrice}</span>  
          </p>
        ))}
      </div>
      <p className='flex justify-between px-4'>
      <span>Total: </span>
      <span>{orderToShow.costWithService}</span>
      </p>
    </div>
  )
}

export default OrderDetails