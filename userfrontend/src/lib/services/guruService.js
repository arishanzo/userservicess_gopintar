import  { serviceClient }  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getGuruService = async () => {
    try {
        const response = await getFetchCache(() => serviceClient.getAllGurus());
      
        // Return array guru langsung
        return response.data?.data || [];
    } catch (error) {
        console.error('Service error:', error); // Debug log
        throw error.response?.data?.message || "Terjadi kesalahan";
    }
}