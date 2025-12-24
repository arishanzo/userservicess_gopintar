import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getAbsensiGuruService } from "../lib/services/absensiGuruService";

export const UseGetAbsensiGuru = (idprofilguru) => {
  const [absensiGuru, setAbsensiGuru] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const controller = new AbortController();

    if (!idprofilguru) {
      setLoading(false);
      return;
    }

    const fetchabsensi = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getAbsensiGuruService(idprofilguru, { signal: controller.signal }), 5, 3000);
        setAbsensiGuru(result || []);

       } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setAbsensiGuru(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
        setLoading(false);
      }

    };

   
      fetchabsensi();

  
    return () => controller.abort();
    
  }, [idprofilguru]);

  return { absensiGuru, loading, error };
};
