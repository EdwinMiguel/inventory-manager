import { useContext } from "react";
import { OrderContext } from '../../Context/OrderContext'

const SearchBar = () => {
  const { items, setFilteredItems } = useContext(OrderContext)

  const search = (event) => {
    const value = event.target?.value.toLowerCase()

    if (value === "") {
      setFilteredItems([]);
    }

    let filtered = []
    items.forEach(element => {
      let filteredProduct;
      if (element.products) {
        filteredProduct = element.products.filter(item => item.name.toLowerCase().includes(value))
      }
      if (filteredProduct.length > 0) {
        filtered.push(element)
      }
    })

    setFilteredItems(filtered)
  }

  return (
    <input className="w-full h-8 self-center p-2 mt-8 rounded-full bg-transparent solid border-2 border-slate-700 text-white" type="text" placeholder={`Buscar`} onChange={(event) => search(event)}/>
  )
}

export default SearchBar