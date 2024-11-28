import { useContext } from "react"
import { OrderContext } from "../../Context/OrderContext"
import Item from "../Item"

const TableBody = ({items, handleUpdateStatus }) => {
  const { filteredItems } = useContext(OrderContext)
  
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