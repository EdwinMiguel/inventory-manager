import { useContext } from "react"
import { InventoryContext } from "../../Context"

const RigthSideBar = () => {
  const { itemsCount } = useContext(InventoryContext)
  return (
    <div className="w-full border-l solid col-start-3">
      <div className="p-4">
        <h2 className="text-xl font-bold">Estadísticas</h2>
      </div>
      <div className="flex gap-4 mt-4 px-4 mb-6">
        <p className="flex flex-col">
          <span className="font-medium">{itemsCount}</span>
          <span>total de pedidos</span>
        </p>
        <p className="flex flex-col">
          <span className="font-medium">$1.34m</span>
          <span>147 enviados</span>
        </p>
      </div>
      <div className="border-t p-4">
        <p className="flex justify-between">
          <span className="text-lg font-medium">ORDERS STATUS</span>
          <span>Active v</span>
        </p>
        <p className="flex justify-between mb-4">
          <span>Pagado</span>
          <span>89%</span>
        </p>
        <p className="flex justify-between mb-4">
          <span>Cancelado</span>
          <span>8%</span>
        </p>
        <p className="flex justify-between mb-4">
          <span>Liquidado</span>
          <span>3%</span>
        </p>
      </div>
      <div className="flex flex-col px-4 border-t">
        <p className="flex justify-between mt-4 mb-6">
          <span className="font-medium">Resumen</span>
          <span>Este mes v</span>
        </p>
        <div className="flex flex-col gap-4 mb-6">
          <p className="flex flex-col">
            <span className="font-medium">2,246.75</span>
            <span className="text-gray-400">Average order</span>
          </p>
          <p className="flex flex-col">
            <span className="font-medium">16 min</span>
            <span className="text-gray-400">Processing time</span>
          </p>
          <p className="flex flex-col">
            <span className="font-medium">0.32%</span>
            <span className="text-gray-400">Pending orders</span>
          </p>
        </div>
      </div>
      <div className="px-4 border-t">
        <p className="flex justify-between">
          <span className="font-medium">Más vendidos</span>
          <span>Este mes v</span>
        </p>
      </div>
    </div>
  )
}

export default RigthSideBar