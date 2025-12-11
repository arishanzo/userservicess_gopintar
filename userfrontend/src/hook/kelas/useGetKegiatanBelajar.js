import { useEffect, useState } from "react";
import { getFetchCache } from "../../lib/fetchCahce/getFetchCache";
import { getKegiatanBelajarServices } from "../../lib/services/kegiatanBelajarServices";

export const UseGetKegiatanBelajar = (idbookingprivate) => {
  const [kegiatanBelajar, setKegiatanBelajar] = useState(null);
  const [loadingKegiatanBelajar, setLoadingKegiatanBelajar] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const controller = new AbortController();

    const fetchKegiatanBelajar = async () => {
      try {

        setLoadingKegiatanBelajar(true);
        const result = await getFetchCache( () => getKegiatanBelajarServices(idbookingprivate, { signal: controller.signal }), 5, 3000);
    
        setKegiatanBelajar(result.data || []);

       } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setKegiatanBelajar(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
        setLoadingKegiatanBelajar(false);
      }

    };

      fetchKegiatanBelajar();

    return () => controller.abort();

  }, [idbookingprivate]);

  return { kegiatanBelajar, loadingKegiatanBelajar, error };
};
