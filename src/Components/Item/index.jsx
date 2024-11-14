import { useContext } from "react"
import { InventoryContext } from "../../Context"
import { ChatBubbleLeftEllipsisIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid"

const Item = (data) => {
  const { openOrderDetails, setOrderToShow } = useContext(InventoryContext)
  
  const showOrder = (orderDetails) => {
    openOrderDetails()
    setOrderToShow(orderDetails)
  }

  return (
      <tr 
      className="hover:bg-slate-400"
      onClick={() => showOrder(data.data)}>
        <td className="flex">
          <input type="checkbox" />
          <span>{data.data["ID PEDIDO"]}</span>
          <span>{data.data.OBSERVACIONES ? <ChatBubbleLeftEllipsisIcon className="w-6 h-6 ml-2 text-green-500"></ChatBubbleLeftEllipsisIcon> : null}</span>
        </td>
        <td>{data.data.SEDE}</td>
        <td>{data.data["FECHA ENTREGA"]}</td>
        <td>
          <select>
            <option>Entregado</option>
            <option>Liquidado</option>
          </select>
        </td>
        <td>{data.data.costWithService}</td>
        <td className="relative">
          <EllipsisHorizontalIcon 
          className="w-6 h-6 cursor-pointer"
          ></EllipsisHorizontalIcon><div className="hidden w-10 h-10 p-2 rounded border solid absolute bg-white top-3 -left-3">Ver</div></td>
        
      </tr>
  )
}

export default Item