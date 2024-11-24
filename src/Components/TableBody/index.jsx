import Item from "../Item"

const TableBody = ({items, handleUpdateStatus }) => {
  return (
    <tbody>
      {
        items?.map((item) => (
          <Item key={item.idOrder} data={item} handleUpdateStatus={handleUpdateStatus} />
        ))
      }
    </tbody>
  )
}

export default TableBody