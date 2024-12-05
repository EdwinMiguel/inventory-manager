import { useContext, useState } from "react"
import { InventoryContext } from "../../Context"
import { ChevronUpDownIcon, XMarkIcon, PencilSquareIcon, PrinterIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid"

const RegistrationsDetail = () => {
  const { 
    setIsRegistrationDetailOpen,
    registrationToShow } = useContext(InventoryContext)
  console.log(registrationToShow);
  return (
    <div  className="absolute bg-white w-80 border rounded-sm">
      <div className="flex w-full justify-end">
        <span> 
          <ChevronUpDownIcon className="size-7 rotate-45 text-gray-600 mr-1"></ChevronUpDownIcon>
        </span>
        <span>
          <XMarkIcon 
            className="size-7 text-gray-600"
            onClick={() => setIsRegistrationDetailOpen(false)}></XMarkIcon>
        </span>
      </div>
      <span className="text-5xl font-bold w-full break-words hyphens-auto"></span>
      <div className="flex gap-2 mt-4 mb-4">
        <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm">
          <PrinterIcon className="size-4 inline-block mr-1"></PrinterIcon>
          Imprimir</button>
        <button className="py-1 px-2 h-8 w-max bg-white rounded self-center border solid text-sm shadow-sm">
          <EllipsisHorizontalIcon className="size-4 inline-block"></EllipsisHorizontalIcon>
        </button>
      </div>
      <span className="font-medium">Información del registro</span>
      
        <div className="flex flex-col w-full gap-2">         
        <p className="flex justify-between">
          <span className="text-gray-500">Id:</span>
          <span className="text-right">{registrationToShow.id}</span>
        </p>
        <p className="flex justify-between">
            <span className="text-gray-500">Proveedor:</span>
            <span className="text-right">{registrationToShow.supplier.name}</span>
          </p>
        <div className="flex justify-between">
          <span className="text-gray-500">Tipo de registro:</span>
          <span className="text-right">{registrationToShow.transaction}</span>
        </div>
        <p className="flex justify-between">
        <span className="text-gray-500">fecha:</span>
        <span className="text-right">{registrationToShow.date}</span>
        </p>
        <p className="flex justify-between">
        <span className="text-gray-500">Observaciones:</span>
        <span className="text-right">{registrationToShow.notes}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Cantidad:</span>
          <span className="text-right">{registrationToShow.product.quantity}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Nombre del producto:</span>
          <span className="text-right">{registrationToShow.product.name}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Costo total de ingreso:</span>
          <span className="text-right">{registrationToShow.product.totalCost}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Precio unitario:</span>
          <span className="text-right">{registrationToShow.product.unitPrice}</span>
        </p>
      </div>
    </div>
  )
}

export default RegistrationsDetail