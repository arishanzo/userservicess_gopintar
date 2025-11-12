import  { serviceClient }  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getKegiatanBelajarServices = async (idbookingprivate) => {
    try {
        const response = await getFetchCache(() => serviceClient.getKegiatanBelajar(idbookingprivate));
        
       return response.data;

    } catch (error) {
        console.error('Service error:', error); // Debug log
        throw error.response?.data?.message || "Terjadi kesalahan";
    }
}