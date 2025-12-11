import { useState, useEffect } from "react";
import { getFetchCache }  from "../../lib/fetchCahce/getFetchCache";
import { getBooking } from "../../lib/services/bookingService";

export const UseGetBooking = (iduser) => {
   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [booking, setBooking] = useState(null);

      useEffect(() => {
       const controller = new AbortController();
    
        if (!iduser) {
          setLoading(false);
          return;
        }
    
        const fetchBooking = async () => {
          try {
    
            setLoading(true);
            const Bookingget = await getFetchCache( () => getBooking(iduser, { signal: controller.signal }), 5, 3000);
             setBooking(Bookingget.data || null);
    
            } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setBooking(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
            setLoading(false);
          }
    
        };
    
    
          fetchBooking();
      
    
        return () => controller.abort();
        
      }, [iduser]);
    
      return { booking, loading, error };



}

