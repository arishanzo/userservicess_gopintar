import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getGuruService } from "../lib/services/guruService";

export const UseGetGuru = () => {
  const [guru, setGuru] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGuru = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getGuruService(), 5, 3000);
    
        if (isMounted) setGuru(result || []);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setGuru(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat profil"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchGuru();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { guru, loading, error };
};
