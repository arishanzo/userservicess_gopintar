import { useEffect, useState } from "react";
import { getFetchCache } from "../../lib/fetchCahce/getFetchCache";
import { getTugasKelasServices } from "../../lib/services/tugasKelasServices.";

export const UseGetTugasKelas = (idbookingprivate) => {
  const [tugasKelas, setTugasKelas] = useState(null);
  const [loadingTugasKelas, setLoadingTugasKelas] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const controller = new AbortController();

    const fetchTugasKelas = async () => {
      try {

        setLoadingTugasKelas(true);
        const result = await getFetchCache( () => getTugasKelasServices(idbookingprivate, { signal: controller.signal }), 5, 3000);
    
        setTugasKelas(result.data || []);

        } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setTugasKelas(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
        setLoadingTugasKelas(false);
      }

    };

      fetchTugasKelas();


   
    return () => controller.abort();
    
  }, [idbookingprivate]);

  return { tugasKelas, loadingTugasKelas, error };
};
