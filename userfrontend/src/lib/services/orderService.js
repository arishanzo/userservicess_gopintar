import axiosClient  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getOrder = async (iduser) => {

    try {
     const respone = await  getFetchCache (() => axiosClient.get(`/api/midtrans/${iduser}`) );
     return respone.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}