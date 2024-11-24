import { createContext, useState } from "react"

export const OrderContext = createContext()

export const OrderProvider = ({children}) => {
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
    }}>
      {children}
    </OrderContext.Provider>
  )
}