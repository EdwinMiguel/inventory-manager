import { createContext, useState } from "react"

export const ProductContext = createContext()

export const ProductProvider = ({children}) => {
  const [products, setProducts ] = useState([])
  const [ isOpenCreateProductModal, setIsOpenCreateProductModal] = useState(false)

  const [productToShow, setProductToShow ] = useState()

  const [isStockFormOpen, setIsStockFormOpen ] = useState(false)
  const openStockFormOpen = () => setIsStockFormOpen(true)
  const closeStockFormOpen = () => setIsStockFormOpen(false)

  const [isProductDetailOpen, setIsProductDetailOpen ] = useState(false)
  const openProductDetail = () => {
    setIsProductDetailOpen(true)
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

  const [quantityValue, setQuantityValue ] = useState('')
  const [quantities, setQuantities] = useState([])

  const [ isEditProductOn, setIsEditpProductOn ] = useState(false)

  return (
    <ProductContext.Provider value={{
      isOpenCreateProductModal,
      setIsOpenCreateProductModal,
      products, 
      setProducts,
      openProductDetail,
      openStockFormOpen,
      isStockFormOpen,
      notification,
      closeNotification,
      isProductDetailOpen,
      notificationToShow,
      closeProductDetail,
      productToShow,
      setProductToShow,
      setQuantityValue,
      quantityValue,
      isEditProductOn,
      setIsEditpProductOn,
      quantities,
      setQuantities,
      showNotification,
      closeStockFormOpen,
    }}>
      {children}
    </ProductContext.Provider>
  )
}