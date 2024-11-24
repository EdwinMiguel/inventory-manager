const TableHeader = () => {
  return (
    <thead className="text-left sticky top-0 bg-white shadow-sm z-10">
      <tr className="text-gray-400">
        <th>Pedido</th>
        <th>Cliente</th>
        <th>Fecha de entrega</th>
        <th>Estado</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
  )
}

export default TableHeader