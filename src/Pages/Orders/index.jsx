import { useState, useEffect, useContext } from "react"
import { InventoryContext } from  "../../Context" 
import Layout from "../../Components/Layout"
import Item from "../../Components/Item"
import OrderDetails from "../../Components/OrderDetails"

function Orders() {
  const { items, openOrderDetails } = useContext(InventoryContext)
 const sortedItems = items?.sort((a, b) => {
    const aValue = parseInt(a["ID PEDIDO"])
    const bValue = parseInt(b["ID PEDIDO"])
    return bValue - aValue
  })

  return (
    <Layout>
      <h2 className="mt-6 text-5xl ml-8">Pedidos</h2>
      <div className="ml-8 flex gap-4">
      <select>
        <option>Type</option>
        <option>Type 2</option>
      </select>
      <select>
        <option>Status</option>
        <option>Type 2</option>
      </select>
      <select>
        <option>Order Date</option>
        <option>Type 2</option>
      </select>
      </div>

      <div className="ml-8 flex-1 overflow-y-auto">
        <table className="w-full solid border-gray-300">
          <thead className="text-left sticky top-0 bg-white shadow-sm">
            <tr className="text-gray-400">
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Fecha de entrega</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              sortedItems?.map((item) => (
                <Item key={item["ID PEDIDO"]} data={item} />
              ))
            }
          </tbody>
        </table>
      </div>

      <OrderDetails />
    </Layout>
  );
}

export default Orders
