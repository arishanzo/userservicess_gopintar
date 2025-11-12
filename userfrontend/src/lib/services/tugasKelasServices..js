import  { serviceClient }  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getTugasKelasServices = async (idbookingprivate) => {
    try {
        const response = await getFetchCache(() => serviceClient.getTugasKelas(idbookingprivate));
        console.log('API Response:', response.data); // Debug log
        
       return response.data;

    } catch (error) {
        console.error('Service error:', error); // Debug log
        throw error.response?.data?.message || "Terjadi kesalahan";
    }
}