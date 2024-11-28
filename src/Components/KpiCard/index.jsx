import { useContext, useEffect, useState } from "react"
import { OrderContext } from "../../Context/OrderContext"

const KpiCard = () => {
  const { items } = useContext(OrderContext)

  const [pollo, setPollo] = useState(0)
  const [loading, setLoading] = useState(true)
  const [dough350, setDough350] = useState(0)
  const [dough140, setDough140] = useState(0)
  const [dough450, setDough450] = useState(0)
  const [dough700, setDough700] = useState(0)

  useEffect(() => {
    if (!loading && items.length > 0) {
      countDoughAndPollo();
    }
  }, [loading, items])

  useEffect(() => {
    if (items) {
      setLoading(false); // Cambia el estado cuando los items estén disponibles
    }
  }, [items])
  
  const getTodayDate = () => {
    const now = new Date();
    // Convertir a hora de Colombia (UTC-5)
    const colombiaTime = new Date(now.getTime() - (5 * 60 * 60 * 1000));

    // Formatear la fecha y hora
    const year = colombiaTime.getUTCFullYear();
    const month = String(colombiaTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(colombiaTime.getUTCDate()).padStart(2, '0');

    // Crear string formateado
    const timestamp = `${year}-${month}-${day}`;

    return timestamp;
  }

  const countDoughAndPollo = () => {
    let filteredPollo = []
    let pollo = 0
    let filteredDough140 = []
    let dough140 = 0
    let filteredDough350 = []
    let dough350 = 0
    let filteredDough450 = []
    let dough450 = 0
    let filteredDough700 = []
    let dough700 = 0
    items.forEach(element => {
      if (element.deliveryDate === getTodayDate()) {
        console.log(element.deliveryDate);
        let polloProduct
        let dough140Product
        let dough350Product
        let dough450Product
        let dough700Product
        if (element.products) {
          polloProduct = element.products.filter(item => item.name.includes("POLLO"))
          dough350Product = element.products.filter(item => item.name.includes("MASA x 350gr"))
          dough140Product = element.products.filter(item => item.name.includes("MASA x 140gr"))
          dough450Product = element.products.filter(item => item.name.includes("MASA x 450gr"))
          dough700Product = element.products.filter(item => item.name.includes("MASA x 700gr"))
        }
  
        if (polloProduct.length > 0) {
          filteredPollo.push(polloProduct)
        }
  
        if (dough140Product.length > 0) {
          filteredDough140.push(dough140Product)
        }
        
        if (dough350Product.length > 0) {
          filteredDough350.push(dough350Product)
        } 
        
        if (dough450Product.length > 0) {
          filteredDough450.push(dough450Product)
        }
        
        if (dough700Product.length > 0) {
          filteredDough700.push(dough700Product)
        }
      }
    })
    filteredPollo.flat().forEach(element => {
      pollo += element.quantity
    })
    setPollo(pollo)
    
    filteredDough140.flat().forEach(element => {
      dough140 += element.quantity
    })
    setDough140(dough140)
    
    filteredDough350.flat().forEach(element => {
      dough350 += element.quantity
    })
    setDough350(dough350)
    
    filteredDough450.flat().forEach(element => {
      dough450 += element.quantity
    })
    setDough450(dough450)
    
    filteredDough700.flat().forEach(element => {
      dough700 += element.quantity
    })
    setDough700(dough700)
  }

  return (
    <div className="flex items-center gap-4 ml-8 my-8">
        <div className="flex flex-col self-end w-56 h-24 p-4 bg-slate-300 rounded shadow-sm">
          <span>🐔 Total de pollos pedidos para hoy:</span>
          <span className="font-medium text-3xl">{pollo}</span>
        </div>
        <div>
          <h3 className="text-3xl mb-2">🍕 Total de masas para hoy:</h3>
          <div className="flex gap-4">
            <div className="flex flex-col justify-center w-40 h-24 p-4 bg-slate-300 rounded shadow-sm">
              <span className="font-medium text-lg">{`MASA x 140gr: ${dough140}`}</span>
            </div>
            <div className="flex flex-col justify-center w-40 h-24 p-4 bg-slate-300 rounded shadow-sm">
              <span className="font-medium text-lg">{`MASA x 350gr: ${dough350}`}</span>
            </div>
            <div className="flex flex-col justify-center w-40 h-24 p-4 bg-slate-300 rounded shadow-sm">
              <span className="font-medium text-lg">{`MASA x 450gr: ${dough450}`}</span>
            </div>
            <div className="flex flex-col justify-center w-40 h-24 p-4 bg-slate-300 rounded shadow-sm">
              <span className="font-medium text-lg">{`MASA x 700gr: ${dough700}`}</span>
            </div>
          </div>
        </div>

      </div>
  )
}

export default KpiCard