import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getBookingAll } from "../lib/services/bookingAllServices";

export const UseGetBookingAll = () => {
  const [BookingAll, setBookingAll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    
    const controller = new AbortController();


    const fetchBookingAll = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getBookingAll({ signal: controller.signal }), 1, 0);
    
        setBookingAll(result.data || []);

      } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setBookingAll(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
        setLoading(false);
      }

    };

      fetchBookingAll();

    return () => controller.abort();
    
  }, []);

  return { BookingAll, loading, error };
};
