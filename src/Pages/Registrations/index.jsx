import { useContext, useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import Table from "../../Components/Table"
import { InventoryContext } from "../../Context"
import RegistrationsDetail from "../../Components/RegistrationDetail"
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid"

const Registrations = () => {
  const { 
    isRegistrationDetailOpen,
    setIsRegistrationDetailOpen,
    setRegistrationToShow } = useContext(InventoryContext)
  
  const [registrations, setRegistrations] = useState([])
  
  useEffect(() => {
    fetchRegistrations();
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('https://api-pizzeria.vercel.app/api/v2/inventory')
      const data = await response.json()
      setRegistrations(data)
    } catch (err) {
      console.log(err.message)
    } finally {
    }
  }

  const handleShowRegistration = (currentRegistration) => {
    setRegistrationToShow(currentRegistration)
    setIsRegistrationDetailOpen(true)
  }

  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold">Registros</h1>
        <p>Registros de entrada y salida de productos</p>
      </div>
      <div className="ml-8 flex-1 overflow-y-auto z-0">
        <Table>
        <thead className="text-left sticky top-0 bg-white shadow-sm z-10">
          <tr className="text-gray-400">
            <th>ID Ingreso</th>
            <th>Proveedor</th>
            <th>tipo</th>
            <th>Fecha</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            registrations.map(element => (
              <tr className="hover:bg-slate-400" key={element.id}>
                <td>
                  <input type="checkbox" />
                  <span>{element.id}</span>
                </td>
                <td>
                  <span>{element.supplier.name}</span>
                </td>
                <td>
                  <div className={`max-w-max border rounded-md p-1 ${element.transaction === "salida" ? "bg-red-100 border-red-400" : "bg-green-100 border-green-400"}`}>{element.transaction}</div>
                </td>
                <td>
                  <span>{element.date}</span>
                </td>
                <td>
                <EllipsisHorizontalIcon 
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleShowRegistration(element)}></ EllipsisHorizontalIcon>
                </td>
              </tr>
            ))
          }
        </tbody>
        </Table>
      </div>
      {isRegistrationDetailOpen && <RegistrationsDetail />}
    </Layout>
  )
}

export default Registrations