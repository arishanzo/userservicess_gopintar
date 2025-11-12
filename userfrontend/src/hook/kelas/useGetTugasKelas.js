import { useEffect, useState } from "react";
import { getFetchCache } from "../../lib/fetchCahce/getFetchCache";
import { getTugasKelasServices } from "../../lib/services/tugasKelasServices.";

export const UseGetTugasKelas = (idbookingprivate) => {
  const [tugasKelas, setTugasKelas] = useState(null);
  const [loadingTugasKelas, setLoadingTugasKelas] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTugasKelas = async () => {
      try {

        setLoadingTugasKelas(true);
        const result = await getFetchCache( () => getTugasKelasServices(idbookingprivate), 5, 3000);
    
        if (isMounted) setTugasKelas(result.data || []);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setTugasKelas(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Tugas Kelas"
            );
          }
        }

      } finally {
        if (isMounted) setLoadingTugasKelas(false);
      }

    };

    const timer = setTimeout(() => {
      fetchTugasKelas();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { tugasKelas, loadingTugasKelas, error };
};
