import { createContext, useState } from "react"
import useOrders from "../Hooks/useOrders";
import useProducts from "../Hooks/useProducts";

export const InventoryContext = createContext()

export const InventoryProvider = ({children}) => {
  // data fetched
  const { items, loading, error, refetch } = useOrders();
  
  const [orderToShow, setOrderToShow ] = useState({})
  const [ productToShow, setProductToShow ] = useState({})

  // fetch products data
  //const {products } = useProducts();

  //
  const [ openModal, setOpenModal ] = useState(false)
  const toggleOpenModal = () => {
    setOpenModal(!openModal)
  }
  
  // Order details open/close
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const openOrderDetails = () => setIsOrderDetailsOpen(true)
  const closeOrderDetails = () => setIsOrderDetailsOpen(false)

  const itemsCount = items ? items.length : 0;

  const [isStockFormOpen, setIsStockFormOpen ] = useState(false)
  const openStockFormOpen = () => setIsStockFormOpen(true)
  const closeStockFormOpen = () => setIsStockFormOpen(false)

  const [isProductDetailOpen, setIsProductDetailOpen ] = useState(false)
  const openProductDetail = () => {
    setIsProductDetailOpen(true)
    setProductMenu(false)
  }
  const closeProductDetail = () => {
    setIsEditpProductOn(false)
    setIsProductDetailOpen(false)
  }

  const [notification, setNotification ] = useState(false)
  const [notificationToShow, setNotificationToShow ] = useState({})
  const showNotification = (data) => {
    setNotificationToShow(data)
    setNotification(true)
  }

  const closeNotification = () => setNotification(false)

  const [ productMenu, setProductMenu ] = useState(false)
  const toggleOpenProductMenu = (productId) => {
    setProductMenu(productMenu === productId ? null : productId)
  }


  const [ isOpenCreateProductModal, setIsOpenCreateProductModal] = useState(false)

  const [quantityValue, setQuantityValue ] = useState('')
  const [quantities, setQuantities] = useState([])

  const [ isEditProductOn, setIsEditpProductOn ] = useState(false)

  return (
    <InventoryContext.Provider value={{
      items,
      itemsCount,
      loading, 
      error, 
      refetch,
      openOrderDetails,
      closeOrderDetails,
      isOrderDetailsOpen,
      orderToShow, 
      setOrderToShow,
      openModal,
      toggleOpenModal,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      notification,
      showNotification,
      notificationToShow,
      closeNotification,
      toggleOpenProductMenu,
      productMenu,
      isStockFormOpen,
      openStockFormOpen,
      closeStockFormOpen,
      productToShow,
      setProductToShow,
      isOpenCreateProductModal,
      setIsOpenCreateProductModal,
      quantityValue, 
      setQuantityValue,
      quantities, 
      setQuantities,
      isEditProductOn,
      setIsEditpProductOn
    }}>
      {children}
    </InventoryContext.Provider>
  )
}