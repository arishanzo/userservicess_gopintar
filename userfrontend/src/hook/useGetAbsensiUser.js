import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getAbsensiUser } from "../lib/services/absensiUserService";

export const UseGetAbsensiUser = (iduser) => {
  const [absensiUser, setAbsensiUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!iduser) {
      setLoading(false);
      return;
    }

    const fetchabsensi = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getAbsensiUser(iduser), 5, 3000);
        if (isMounted) setAbsensiUser(result.data || []);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setAbsensiUser([]);
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
      fetchabsensi();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [iduser]);

  return { absensiUser, loading, error };
};
