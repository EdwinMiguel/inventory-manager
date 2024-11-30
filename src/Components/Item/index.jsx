import { useContext } from "react"
import { OrderContext } from "../../Context/OrderContext"
import { ChatBubbleLeftEllipsisIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid"

const Item = ({ data, handleUpdateStatus }) => {
  const { openOrderDetails, setOrderToShow } = useContext(OrderContext)
  
  const showOrder = (orderDetails) => {
    openOrderDetails()
    setOrderToShow(orderDetails)
  }
  
   // Estados disponibles para los pedidos
   const orderStatuses = {
    pendiente: "Pendiente",
    entregado: "Entregado",
    pagado: "Pagado"
  };

  // Función para obtener el color según el estado
  const getStatusColor = (status) => {
    const colors = {
      pendiente: "text-red-600 bg-red-100",
      entregado: "text-green-600 bg-green-100",
      pagado: "text-blue-600 bg-blue-100"
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };
  
  return (
      <tr 
      className="hover:bg-slate-400">
        <td className="flex">
          <input type="checkbox" />
          <span>{data.idOrder}</span>
          <span>{data.orderNotes ? <ChatBubbleLeftEllipsisIcon className="w-6 h-6 ml-2 text-green-500"></ChatBubbleLeftEllipsisIcon> : null}</span>
        </td>
        <td>{data.user}</td>
        <td>{data.deliveryDate}</td>
        <td>
          <div className="flex items-center gap-2">
            <select
              value={data.status}
              onChange={(e) => handleUpdateStatus(data.idOrder, e.target.value)}
              className={`block w-32 rounded-md border-gray-300 shadow-sm 
                        text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        py-2 px-3 leading-tight ${getStatusColor(data.status)}`}
            >
              {Object.entries(orderStatuses).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </td>
        <td>{new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              }).format(data.surchargedPrice)}</td>
        <td className="relative">
          <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" onClick={() => showOrder(data)}></EllipsisHorizontalIcon>
          <div className="hidden w-10 h-10 p-2 rounded border solid absolute bg-white top-3 -left-3">Ver</div>
        </td>
      </tr>
  )
}

export default Item