import axiosClient  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getRatingService = async () => {

    try {
     const respone = await  getFetchCache (() => axiosClient.get(`/api/ratingguru`) );
     return respone.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}