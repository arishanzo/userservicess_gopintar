import { useEffect, useState } from "react";
import { getFetchCache } from "../../lib/fetchCahce/getFetchCache";
import { getKegiatanBelajarServices } from "../../lib/services/kegiatanBelajarServices";

export const UseGetKegiatanBelajar = (idbookingprivate) => {
  const [kegiatanBelajar, setKegiatanBelajar] = useState(null);
  const [loadingKegiatanBelajar, setLoadingKegiatanBelajar] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchKegiatanBelajar = async () => {
      try {

        setLoadingKegiatanBelajar(true);
        const result = await getFetchCache( () => getKegiatanBelajarServices(idbookingprivate), 5, 3000);
    
        if (isMounted) setKegiatanBelajar(result.data || []);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setKegiatanBelajar(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Kegiatan Belajar"
            );
          }
        }

      } finally {
        if (isMounted) setLoadingKegiatanBelajar(false);
      }

    };

    const timer = setTimeout(() => {
      fetchKegiatanBelajar();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { kegiatanBelajar, loadingKegiatanBelajar, error };
};
