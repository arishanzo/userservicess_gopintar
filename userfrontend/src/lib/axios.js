// src/lib/axios.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest", // penting untuk Sanctum
    "Accept": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});


// Auto-detect content type
axiosClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  config.withCredentials = true; 
  return config;
});

// Handle response errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Biarkan component handle 401, jangan auto-redirect
    return Promise.reject(error);
  }
);


// Service Communication Helper
export const serviceClient = {

  
  // Ambil daftar semua guru dari guruservices
  getAllGurus: () => {
    return axiosClient.get('/api/guru/daftarguru', {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY
      }
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error('API Error:', error.response || error); // Debug log
        throw error;
      });
  },
  
  // Ambil data gabungan dari kedua service
  getCrossServiceData: (userId, guruId) => {
    return axiosClient.post('/api/services/cross-data', {
      user_id: userId,
      guru_id: guruId
    }, {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY
      }
    });
  },

  // Ambil kegiatan belajar dari userservices
  getKegiatanBelajar: (idbookingprivate) => {
    return axiosClient.get(`/api/kegiatanbelajar/daftarkegiatanbelajar/${idbookingprivate}`, {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY
      }
    });
  },

  getAbsensiGuru: (idprofilguru) => {
    return axiosClient.get(`/api/guru/daftarabsensiguru/${idprofilguru}`, {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY
      }
    });
  },

    putSaldoGuru: async (idguru, formSaldoMasuk) => {
    try {
      console.log('Calling putSaldoGuru with:', { idguru, formSaldoMasuk });
      
      const response = await axiosClient.put(`/api/guru/saldomasuk/${idguru}`, formSaldoMasuk, {
        headers: {
          'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        timeout: 10000
      });
      
      return response;
    } catch (error) {
      console.error('putSaldoGuru error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: `/api/guru/saldomasuk/${idguru}`,
        method: 'PUT'
      });
      throw error;
    }
  },

   putTugasKelas: (idtugasbelajar, statusTugas) => {
    return axiosClient.put(`/api/tugaskelas/tugaskelas/${idtugasbelajar}`, statusTugas,{
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
          "Accept": "application/json",
      }
    });
  },




    // Ambil kegiatan belajar dari userservices
  getTugasKelas: (idbookingprivate) => {
    return axiosClient.get(`/api/tugaskelas/daftartugaskelas/${idbookingprivate}`, {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY
      }
    });
  }


};

export default axiosClient;
