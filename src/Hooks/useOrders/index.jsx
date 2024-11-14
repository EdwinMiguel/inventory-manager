import { useState, useEffect } from 'react';

const useOrders = () => {
  const [ items, setItems ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api-pizzeria.vercel.app/api/v1/orders');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Opcional: función para recargar los datos
  const refetch = () => {
    fetchOrders();
  }



  return { items, loading, error, refetch };
};

export default useOrders