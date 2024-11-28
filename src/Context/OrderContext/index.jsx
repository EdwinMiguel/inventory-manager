import { createContext, useEffect, useState } from "react"

export const OrderContext = createContext()

export const OrderProvider = ({children}) => {
  const [items, setItems] = useState(null)
  
  const [filteredItems, setFilteredItems] = useState([])
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://api-pizzeria.vercel.app/api/v2/orders')
      const data = await response.json()
      const ordersSortById = data.sort((a, b) => b.idOrder - a.idOrder)
      setItems(ordersSortById)
    } catch (err) {
      console.log(err.message)
    } finally {
    }
  }

  // // Order details open/close
  const [ isOrderDetailsOpen, setIsOrderDetailsOpen ] = useState(false)
  const openOrderDetails = () => setIsOrderDetailsOpen(true)
  
  const [orderToShow, setOrderToShow ] = useState({})

  return (
    <OrderContext.Provider value={{
      isOrderDetailsOpen,
      setIsOrderDetailsOpen,
      openOrderDetails,
      orderToShow, 
      setOrderToShow,
      items,
      setItems,
      filteredItems, 
      setFilteredItems
    }}>
      {children}
    </OrderContext.Provider>
  )
}