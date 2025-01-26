import { useContext, useEffect, useRef, useState } from 'react'
import { OrderContext } from '../../Context/OrderContext'
import { XMarkIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalIcon, PencilSquareIcon, PrinterIcon } from '@heroicons/react/16/solid'

const OrderDetails = () => {
  const {
    setIsOrderDetailsOpen,
    orderToShow, setItems  } = useContext(OrderContext)
  
  const iframeRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false)

  const [editableOrderProducts, setEditableOrderProducts] = useState()

  const [loading, setLoading ] = useState(false)

  useEffect(() => {
    setEditableOrderProducts(
      orderToShow.products.map(product => ({
        ...product // Copia cada objeto de producto
      }))
    );
  }, [isEditing]);

  const [newInputValue, setNewInputValue] = useState()

  const changeQuantity = (index, newQuantity) => {
    setNewInputValue(newQuantity)
    const updatedProducts = [...editableOrderProducts]
    updatedProducts[index].quantity = newQuantity
    const calculateProductPrice = newQuantity * updatedProducts[index].unitPrice
    updatedProducts[index].totalPrice = calculateProductPrice
    const initialValue = 0
    orderToShow.surchargedPrice = updatedProducts.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, initialValue)
  }

  const isEditingCancel = () => {
    setEditableOrderProducts(
      orderToShow.products.map(product => ({
        ...product // Copia los datos originales de nuevo
      }))
    );
    const initialValue = 0
    const recalculateTotalPrice = orderToShow.products.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, initialValue)

    orderToShow.surchargedPrice = recalculateTotalPrice + parseInt(orderToShow.surcharge)
    setIsEditing(false)
  }

  const handleDeleteProduct = (productIndex) => {
    const updatedProducts = editableOrderProducts.filter((product, index) => index !== productIndex)
    const initialValue = 0
    orderToShow.surchargedPrice = updatedProducts.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, initialValue)
    setEditableOrderProducts(updatedProducts)
  }

  const closeOrderDetails = () => {
    // const initialValue = 0
    // const recalculateTotalPrice = orderToShow.products.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, initialValue)

    // orderToShow.surchargedPrice = recalculateTotalPrice + parseInt(orderToShow.surcharge)
    
    setIsOrderDetailsOpen(false)
  }

  const findDeletedProducts = (original, updated) => {
    const updatedProdutsIds = new Set(updated.map(product => product.idProduct))

    const deletedProducts = original.filter(product => !updatedProdutsIds.has(product.idProduct))
    return deletedProducts
  }

 const saveOrderEditing = async (event) => {
  event.preventDefault()
  try {
    setLoading(true)
    const productsToUpdate = []
    editableOrderProducts.forEach(product => {
      orderToShow.products.forEach(element => {
        if (element.idProduct === product.idProduct) {
          if (JSON.stringify(element) !== JSON.stringify(product)) {
            productsToUpdate.push(product)
          }
        }
      })
    })

    const deletedProducts = findDeletedProducts(orderToShow.products, editableOrderProducts)

    const dataToSend = {
      deletedProducts: deletedProducts,
      productsToUpdate: productsToUpdate
    }

    if (productsToUpdate.length !== 0 || deletedProducts.length !== 0) {
      const response = await fetch(`https://api-pizzeria.vercel.app/api/v2/orders/${orderToShow.idOrder}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        })
        
      if(!response.ok) {
        throw new Error(responseData.message || `Error al actualizar cantidad del producto. Estado: ${response.status}`)
      }
      
      const responseData = await response.json()
      
      // Verificar que los datos devueltos son correctos
      if (responseData.success) {
        const refreshResponse = await fetch(`https://api-pizzeria.vercel.app/api/v2/orders`)
        const refreshData = await refreshResponse.json()
        const ordersSortById = refreshData.sort((a, b) => b.idOrder - a.idOrder)
        setItems(ordersSortById)
      } else {
        throw new Error('Respuesta del servidor incompleta')
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
    setIsOrderDetailsOpen(false)
  }
 }

 const handlePrint = () => {
  const orderHtml = `
    <style> 
      .car_header{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        max-width: 400px;
        margin: 0 auto;
        padding: 20px 20px;
        border-bottom: 2px solid gray; 
      }
      
      .car_header img {
        display: flex;
        align-items:end;
        width: 200px;
      }

      .car_header h1 {
        display: flex;
        align-items:end;
        font-size: 30px;
        margin-top: 20px;
      }

      .car_container {
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: left;
        padding: 20px 0;
        margin: 0 auto;
        font-size: 16px;
      }

      .car_data_branch , .car_data_date {
        display: flex;
        justify-content: space-between;
        max-width: 400px;
        margin: 0 auto;    
      }

      .car_data_branch p , .car_data_date p {
        display: flex;
        justify-content: center;
        margin: 5px auto;
      }

      .car_data_branch p:nth-child(1) , .car_data_date p:nth-child(1) {
        font-weight: bold;
      }

      .table_head th {
        width: max-content;
        padding: 10px;
        border-bottom: 1px solid black;
      }

      .table_body td {
      padding: 5px;
      width: max-content;
      border-bottom: 1px solid black;
      }

      .table_body tr td:nth-child(2){
        font-weight: bold;
      }

      .car_product_list {
        color: black;
        width: 90%;
        margin: 20px auto;
        max-width: 400px;
        text-align: center;
        border-collapse: collapse;
        table-layout: fixed;
      
      }

      .car_data_observation {
        text-align: center; 
        padding: 20px; 
        border: 1px solid black; 
        margin: 20px 0;
        width: 80%;
        max-width: 400px; 
        margin-left: auto; 
        margin-right: auto; 
        border-radius: 8px; 
      }

      .car_data_observation p:nth-child(1) {
        font-weight: bold;
        margin-bottom: 20px;
      }

      .car_total {
        display: flex;
        font-weight: bold;
        width: 80%;
        justify-content: center;
        gap: 50px;
        margin: 5px auto;
      }

    </style>
    <header class="car_header">        
      <img id="logo-image" src="/assets/logo_drive.png" alt="logo drive pizza negro">
      <h1>PEDIDO SEDE</h1>
    </header>
      <form class="car_container">
        <div class="car_data_container">        
          <div class="car_data_branch">
            <p>SEDE</p>
            <p id="sede-name">${orderToShow.user}</p>
          </div>  
          <div class="car_data_date">
            <p>FECHA</p>
            <p id="delibery-date">${orderToShow.deliveryDate}</p>
          </div>
        </div>
        <table class="car_product_list">
          <thead class="table_head">
              <tr>
                  <th>PRODUCTO</th>
                  <th>CANTIDAD</th>
                  <th>VALOR</th>
              </tr>
          </thead>
          <tbody class="table_body" id="table-body">
            ${orderToShow.products.map(product => {
                return `<tr>
                  <td>${product.name}</td>
                  <td>${product.quantity}</td>
                  <td>${new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                  }).format(product.totalPrice)}</td>
                </tr>`
            }).join('')}
          </tbody>
        </table>
        <div class="car_data_observation">
            <p>OBSERVACIÓN:</p>
            <p id="comment">${orderToShow.orderNotes}</p>          
        </div>  
        <div class="car_total" id="total">
            Total Productos: <span id="total-amount">${orderToShow.products.length}</span>
        </div>
        <div class="car_total" id="valor-neto">
            Valor Neto: <span id="valor-neto-amount">${new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            }).format(orderToShow.netCost)}</span>
        </div>
        <div class="car_total" id="valor-servicio">
            Valor con servicio: <span id="valor-servicio-amount">${new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            }).format(orderToShow.surchargedPrice)}</span>
        </div>
      </form>
  `
  const iframe = iframeRef.current;
  if (iframe) {
    // Escribir el contenido en el iframe
    iframe.contentDocument.open()
    iframe.contentDocument.write(orderHtml)
    iframe.contentDocument.close()

    const logoImage = iframe.contentDocument.getElementById('logo-image')

    if (logoImage) {
      const printOnLoad = () => {
        // Disparar la acción de impresión
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
      }

      const tryPrint = () => {
        if (logoImage.complete) {
          printOnLoad()
        } else {
          setTimeout(tryPrint, 200)
        }
      }

      tryPrint()
    }
  }
 }

  return (
    <div 
      className={`flex w-96 flex-col border solid rounded-lg absolute bg-white overflow-hidden right-0 h-screen`}>
      <div className="bg-black text-white flex justify-between px-4 py-2">
        <h2>{`Pedido #${orderToShow.idOrder}`}</h2>
        <div>
          <ChevronUpDownIcon className='inline-block size-7 mr-2 rotate-45 cursor-pointer'></ChevronUpDownIcon>
          <XMarkIcon 
            className="inline-block size-6 text-white cursor-pointer"
            onClick={() => closeOrderDetails()}></ XMarkIcon>
        </div>
      </div>
      <div className='border-t'>
      {isEditing ? (
        <form className="flex flex-col p-4" onSubmit={(event) => saveOrderEditing(event)}>
          <span className="font-medium text-2xl">{orderToShow.user}</span>
          <div className="mb-4">
            <div className="flex gap-2 mt-4 mb-4">
              <button 
                className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm self-center text-sm"
                onClick={() => setIsEditing(true)} type='button'>
                <PencilSquareIcon 
                  className="size-4 inline-block mr-1"></PencilSquareIcon>
                Editar</button>
              <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm" type='button'>
                <PrinterIcon className="size-4 inline-block mr-1"></PrinterIcon>
                Imprimir</button>
              <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm" type='button'>
                <EllipsisHorizontalIcon className="size-4 inline-block"></EllipsisHorizontalIcon>
              </button>
            </div>
            <div className="mb-4">
            <div>
              <div className='flex justify-between'>
                <span>Fecha de entrega:</span>
                <span className="font-medium text-md mb-2">{orderToShow.deliveryDate}</span>
              </div>
              <div>
                <span className='block'>Obsevaciones:</span>
                <span>{orderToShow.orderNotes}</span>
              </div>
            </div>
          </div>
          </div>
          <div className='p-4 border-t border-b mb-4'>
            {editableOrderProducts.map((product, index) => (
              <div className='flex justify-between items-center mb-2' key={index}>
                <span>{product.name}</span>
                <input 
                  type="number" 
                  defaultValue={product.quantity} 
                  min="0"
                  className="w-12 border text-center mx-2"
                  name='product'
                  onChange={(e) => changeQuantity(index, parseInt(e.target.value))}
                />
                <span>{new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              }).format(product.totalPrice)}</span>
                <button 
                  type="button" 
                  className="text-red-500 ml-4"
                  onClick={() => handleDeleteProduct(index)}>Eliminar</button>
              </div>
            ))}
          </div>
          <p className='flex justify-between mb-4'>
            <span>Total Neto: </span>
            <span>
              {orderToShow.netCost}
            </span>
          </p>
          <p className='flex justify-between mb-4'>
            <span>Total:</span>
            <span>
              {orderToShow.surchargedPrice}
            </span>
          </p>
          <div className="flex justify-between">
            <button 
              className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm"
              onClick={() => isEditingCancel()} type='button'>Cancelar</button>
            <button className="py-1 px-2 h-8 w-max bg-black rounded text-white inline-flex items-center justify-center space-x-1 shadow-sm self-center text-sm" type="submit">
              Guardar
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
          </div>
        </form>
      ) : (
        <div className="flex flex-col p-4">
          <span className="font-medium text-2xl">{orderToShow.user}</span>
          <div className="flex gap-2 mt-4 mb-4">
            <button 
              className="py-1 px-2 h-8 w-max bg-black rounded text-white shadow-sm self-center text-sm"
              onClick={() => setIsEditing(true)}>
              <PencilSquareIcon 
                className="size-4 inline-block mr-1"></PencilSquareIcon>
              Editar</button>
            <button 
              className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm"
              onClick={handlePrint}
            >
              <PrinterIcon className="size-4 inline-block mr-1"></PrinterIcon>
              Imprimir</button>
            <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm">
              <EllipsisHorizontalIcon className="size-4 inline-block"></EllipsisHorizontalIcon>
            </button>
          </div>
          <div className="mb-4">
            <div>
              <div className='flex justify-between'>
                <span>Fecha de entrega:</span>
                <span className="font-medium text-md mb-2">{orderToShow.deliveryDate}</span>
              </div>
              <div>
                <span className='block'>Obsevaciones:</span>
                <span>{orderToShow.orderNotes}</span>
              </div>
            </div>
            <p className="flex flex-col">
            </p>
          </div>
          <div className='p-4 border-t border-b mb-4'>
            {orderToShow.products.map((product) => (
              <p className='flex justify-between' key={product.name}>
                <span>{product.name}</span>
                <span>{product.quantity}</span>
                <span>{new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              }).format(product.totalPrice)}</span>  
              </p>
            ))}
          </div>
            <p className='flex justify-between mb-4'>
              <span>Total Neto: </span>
              <span>
                {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              }).format(orderToShow.netCost)}
              </span>
            </p>
            <p className='flex justify-between mb-4'>
              <span>Total: </span>
              <span>
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }).format(orderToShow.surchargedPrice)}
              </span>
            </p>
        </div>
      )} 
      </div>
      <iframe ref={iframeRef} style={{display: 'none'}}></iframe>
    </div>
  )
}

export default OrderDetails