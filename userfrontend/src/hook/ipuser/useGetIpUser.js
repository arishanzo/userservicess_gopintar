import { useEffect, useState } from "react";

export const useGetIpUser = () => {
   const [ip, setIp] = useState('');


useEffect(() => {
    // Ambil IP publik dari ipify
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
      })
      .catch((err) => console.error('Gagal ambil IP:', err));
  }, []);


    return { ip };
}