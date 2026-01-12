import axiosClient  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getBookingAll = async () => {

    try {
     const respone = await  getFetchCache (() => axiosClient.get(`/api/bookingall`) );
     return respone.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}