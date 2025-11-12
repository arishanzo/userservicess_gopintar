import axiosClient  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getAbsensiUser = async (iduser) => {

    try {
     const respone = await  getFetchCache (() => axiosClient.get(`/api/user/absensiuser/${iduser}`) );
     return respone.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}