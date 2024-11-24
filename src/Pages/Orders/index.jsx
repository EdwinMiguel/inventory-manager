import { useContext } from "react"
import { OrderContext } from "../../Context/OrderContext"
import Layout from "../../Components/Layout"
import Table from "../../Components/Table"
import Filters from "../../Components/Filters"
import OrderDetails from "../../Components/OrderDetails";

function Orders() {
  const { isOrderDetailsOpen } = useContext(OrderContext);
  
  return (
    <Layout>
      <h2 className="mt-6 text-5xl ml-8">Pedidos</h2>
      <Filters />

      <div className="ml-8 flex-1 overflow-y-auto z-0">
        <Table />
      </div>
      {isOrderDetailsOpen && (<OrderDetails />)}
    </Layout>
  );
}

export default Orders
