import { useContext } from "react"
import { OrderContext } from "../../Context/OrderContext"
import Item from "../Item"

const TableBody = () => {
  const { 
    items, 
    setItems, 
    filteredItems } = useContext(OrderContext)
  
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // Llamada a tu API para actualizar el estado
      const response = await fetch(`https://api-pizzeria.vercel.app/api/v2/orders/${orderId}/status`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

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
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };
  
  
  return (
    <tbody>
      {
        filteredItems.length > 1 ? (
        filteredItems?.map((item) => (
          <Item key={item.idOrder} data={item} handleUpdateStatus={handleUpdateStatus} />
        ))
        ) : (
          items?.map((item) => (
            <Item key={item.idOrder} data={item} handleUpdateStatus={handleUpdateStatus} />
          ))
        )
      }
    </tbody>
  )
}

export default TableBody