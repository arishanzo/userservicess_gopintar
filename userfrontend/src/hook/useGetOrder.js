import { useState, useEffect } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getOrder } from "../lib/services/orderService";

export const UseGetOrder = (iduser) => {
   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

      useEffect(() => {
        let isMounted = true;
        if (!iduser) {
          setLoading(false);
          return;
        }
    
        const fetchOrder = async () => {
          try {
    
            setLoading(true);
            const resultget = await getFetchCache( () => getOrder(iduser), 5, 3000);
            if (isMounted) setResult(resultget || null);
    
          } catch (error) {
    
            if (isMounted) {
              if (error?.response?.status === 404) {
                setResult(null);
              } else {
                setError(
                  error?.response?.data?.message ||
                    error?.message ||
                    "Gagal memuat Order"
                );
              }
            }
    
          } finally {
            if (isMounted) setLoading(false);
          }
    
        };
    
        const timer = setTimeout(() => {
          fetchOrder();
        }, 100);
    
        return () => {
          isMounted = false;
          clearTimeout(timer);
        };
      }, [iduser]);
    
      return { result, loading, error };



}

