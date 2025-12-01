import { useState, useEffect } from "react";
import { getFetchCache }  from "../../lib/fetchCahce/getFetchCache";
import { getBooking } from "../../lib/services/bookingService";

export const UseGetBooking = (iduser) => {
   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [booking, setBooking] = useState(null);

      useEffect(() => {
        let isMounted = true;
        if (!iduser) {
          setLoading(false);
          return;
        }
    
        const fetchBooking = async () => {
          try {
    
            setLoading(true);
            const Bookingget = await getFetchCache( () => getBooking(iduser), 5, 3000);
            if (isMounted) setBooking(Bookingget.data || null);
    
          } catch (error) {
    
            if (isMounted) {
              if (error?.response?.status === 404) {
                setBooking(null);
              } else {
                setError(
                  error?.response?.data?.message ||
                    error?.message ||
                    "Gagal memuat Booking"
                );
              }
            }
    
          } finally {
            if (isMounted) setLoading(false);
          }
    
        };
    
        const timer = setTimeout(() => {
          fetchBooking();
        }, 100);
    
        return () => {
          isMounted = false;
          clearTimeout(timer);
        };
      }, [iduser]);
    
      return { booking, loading, error };



}

