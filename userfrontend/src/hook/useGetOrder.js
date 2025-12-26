import { useState, useEffect } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getOrder } from "../lib/services/orderService";

export const UseGetOrder = (iduser) => {
   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

      useEffect(() => {

        
    const controller = new AbortController();

        if (!iduser) {
          setLoading(false);
          return;
        }
    
        const fetchOrder = async () => {
          try {
    
            setLoading(true);
            const resultget = await getFetchCache( () => getOrder(iduser, { signal: controller.signal }), 5, 3000);
            setResult(resultget?.data || null);
    
       } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setResult(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
          setLoading(false);
          }
    
        };
    
       
          fetchOrder();
      
     return () => controller.abort();

      }, [iduser]);
    
      return { result, loading, error };



}

