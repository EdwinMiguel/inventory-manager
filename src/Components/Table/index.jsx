import { useEffect, useState } from "react";
import TableHeader from "../TableHeader"
import TableBody from "../TableBody"

const Table = () => {
  const [items, setItems] = useState(null)
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://api-pizzeria.vercel.app/api/v2/orders');
      const data = await response.json()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
    }
  }
  
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // Llamada a tu API para actualizar el estado
      const response = await fetch(`http://localhost:3000/api/v2/orders/${orderId}/status`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const data = await response.json()
        console.log(data);
        // Actualizar el estado local solo si la API responde correctamente
        setItems(items.map(order => 
          order.idOrder === orderId ? { ...order, status: newStatus } : order
        ));
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