import { createContext, useState } from "react"

export const InventoryContext = createContext()

export const InventoryProvider = ({children}) => {
  const [orderToShow, setOrderToShow ] = useState({})

  
  // // Order details open/close
  const [ isOrderDetailsOpen, setIsOrderDetailsOpen ] = useState(false)
  const openOrderDetails = () => setIsOrderDetailsOpen(true)
  const closeOrderDetails = () => setIsOrderDetailsOpen(false)

  const [isRegistrationDetailOpen, setIsRegistrationDetailOpen]= useState(false)

  const [registrationToShow, setRegistrationToShow ] = useState({})
  return (
    <InventoryContext.Provider value={{
      isOrderDetailsOpen,
      orderToShow, 
      setOrderToShow,
      closeOrderDetails,
      openOrderDetails,
      isRegistrationDetailOpen, 
      setIsRegistrationDetailOpen,
      registrationToShow, 
      setRegistrationToShow
    }}>
      {children}
    </InventoryContext.Provider>
  )
}