import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../Context/OrderContext";
import TableHeader from "../TableHeader"
import TableBody from "../TableBody"

const Table = () => {
  const { items, setItems } = useContext(OrderContext);
  
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
    <table className="w-full solid border-gray-300 relative">
      <TableHeader />
      <TableBody items={items} handleUpdateStatus={handleUpdateStatus} />
    </table>
  )
}

export default Table