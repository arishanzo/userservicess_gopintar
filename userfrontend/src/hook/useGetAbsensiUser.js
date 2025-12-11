import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getAbsensiUser } from "../lib/services/absensiUserService";

export const UseGetAbsensiUser = (iduser) => {
  const [absensiUser, setAbsensiUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const controller = new AbortController();

    if (!iduser) {
      setLoading(false);
      return;
    }

    const fetchabsensi = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getAbsensiUser(iduser, { signal: controller.signal }), 5, 3000);
        setAbsensiUser(result.data || []);

       } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setAbsensiUser(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
        setLoading(false);
      }

    };

   
      fetchabsensi();

  
    return () => controller.abort();
    
  }, [iduser]);

  return { absensiUser, loading, error };
};
