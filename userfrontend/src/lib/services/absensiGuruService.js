import  { serviceClient }  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getAbsensiGuruService = async (idprofilguru) => {
    try {
        const response = await getFetchCache(() => serviceClient.getAbsensiGuru(idprofilguru));
      
        // Return array guru langsung
        return response.data?.data || [];
    } catch (error) {
        console.error('Service error:', error); // Debug log
        throw error.response?.data?.message || "Terjadi kesalahan";
    }
}