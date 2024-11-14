import { useState, useEffect } from 'react';

const useProducts = () => {
  const [ products, setProducts ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://api-pizzeria.vercel.app/api/v1/products')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  };

  // Opcional: función para recargar los datos
  const refetch = () => {
    fetchProducts()
  };

  return { products, loading, error, refetch }
};

export default useProducts