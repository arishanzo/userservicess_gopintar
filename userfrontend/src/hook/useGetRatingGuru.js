import { useState, useEffect } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getRatingService } from "../lib/services/ratingGuruService";

export const UseGetRatingGuru = () => {
   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [ratingGuru, setratingGuru] = useState(null);

      useEffect(() => {

        
    const controller = new AbortController();

        const fetchOrder = async () => {
          try {
    
            setLoading(true);
            const ratingGuruget = await getFetchCache( () => getRatingService({ signal: controller.signal }), 5, 3000);
            setratingGuru(ratingGuruget?.data || null);
    
       } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setratingGuru(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
          setLoading(false);
          }
    
        };
    
       
          fetchOrder();
      
     return () => controller.abort();

      }, []);
    
      return { ratingGuru, loading, error };



}

