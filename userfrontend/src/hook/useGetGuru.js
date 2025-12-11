import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getGuruService } from "../lib/services/guruService";

export const UseGetGuru = () => {
  const [guru, setGuru] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    
    const controller = new AbortController();


    const fetchGuru = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getGuruService({ signal: controller.signal }), 5, 3000);
    
        setGuru(result || []);

      } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setGuru(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
        setLoading(false);
      }

    };

      fetchGuru();

    return () => controller.abort();
    
  }, []);

  return { guru, loading, error };
};
