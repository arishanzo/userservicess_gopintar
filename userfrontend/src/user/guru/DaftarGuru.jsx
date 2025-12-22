

import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import {  useEffect, useRef, useState } from 'react';
import { UseGetGuru } from "../../hook/useGetGuru";
import { UseGetBooking } from "../../hook/kelas/useGetBooking";
import { UseGetProfil } from "../../hook/useGetProfil";


const DesaName = ({ desaId, kecamatanId }) => {
  const [desaName, setDesaName] = useState("Lokasi");

 
  useEffect(() => {
    if (desaId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatanId}.json`)
        .then(res => res.json())
        .then(data => setDesaName(data.find(item => item.id === desaId).name || "Lokasi"))
        .catch(() => setDesaName("Lokasi"));
    }
  }, [desaId, kecamatanId]);
  
  return <span>{desaName}</span>;
  
};


const DaftarGuru = ( { result }) => {


  const scrollRef = useRef(null);
  

  const [showModal, setShowModal] = useState(false);
  
  const [showModalBooking, setShowModalBooking] = useState(false);

  const { profil } = UseGetProfil(result?.iduser || '');
  const { guru } = UseGetGuru();
  const { booking } = UseGetBooking(result?.iduser || '');

   const Navigate = useNavigate();

   const handleRedirectToPembayaran = () => {
        setShowModal(false);
        Navigate('/berlangganan');
    };
  
     const handleRedirectToGuru = () => {
        setShowModal(false);
        Navigate('/kelas/buatkelas');
    };

    
     const handleRedirectToKelas = () => {
        setShowModal(false);
        Navigate('/kelas');
    };
  
    
      const handleSubmit = async (idprofilguru) => {
           const secretKey = 'gopintarguru2025';
           const encrypted = CryptoJS.AES.encrypt(idprofilguru, secretKey).toString();
         
           const selectedGuruId = sessionStorage.getItem('selectedGuruId', encrypted);
     
             if(result.statuspembayaran === 'pending' || result.statuspembayaran === 'expire' || !result ){
               
               setShowModal(true);
             }else if (booking.length > 0) {
                setShowModalBooking(true);
             }else if (selectedGuruId) {
                setShowModal(true);
             }else{
             sessionStorage.setItem('selectedGuruId', encrypted);
             
             Navigate('/kelas/buatkelas');
             }
           }
     
  const guruTerdekat = guru?.filter(g => g.kecamatan === profil?.kecamatan);

    return (

        <>


<div className="pt-2 md:py-2 sm:py-8    overflow-x-hidden" id='mentor'>
  
 <div className="mx-auto py-8 px-2 md:px-8">
  <div className="mb-2 text-center">
    <div className="flex items-center justify-between gap-12">
      <h2 className="text-xl font-bold text-green-800 lg:text-xl">
        👨‍🏫 Guru Terdekat
      </h2>
      <a
        href="/guru"
        className="text-gray-400 font-underline text-sm font-semibold py-1 px-4"
      >
        Lihat Guru Lain
      </a>

    </div>
  </div>



  {/* Loading state */}
        {!guru ? (
          <div className="flex gap-12 pt-2 overflow-x-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-40 py-4">
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="animate-pulse bg-gray-300 rounded-xl h-40 w-40"></div>
                  <div className="p-4 space-y-2">
                    <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
                    <div className="animate-pulse bg-gray-300 h-3 w-3/4 rounded"></div>
                    <div className="animate-pulse bg-gray-300 h-3 w-1/2 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : guru.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Tidak ada guru ditemukan</p>
          </div>
        ) : (

    <div className="">
      <div 
        ref={scrollRef}
        className="flex gap-8 pt-2 overflow-x-auto scrollbar-hide cursor-grab scroll-smooth focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        tabIndex={0}
      >
        {guruTerdekat.map((mentor, i) => (
          <div key={i} className="relative group flex-shrink-0 w-40 py-4 ">
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
              <div className="bg-gray-200 rounded-xl overflow-hidden relative h-40 w-40">
               <img 
                  src={mentor.foto_profil ? `http://localhost:8000/api/photosuser/${encodeURIComponent(mentor.foto_profil)}` : 'https://via.placeholder.com/300'}
                  alt={mentor.user_guru?.name || "Mentor"}
                  className="w-full h-full object-cover object-center"
                  draggable={false}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                 <h3 className="text-xs font-semibold mb-2">{mentor.user_guru?.name || "Mentor Name"}</h3>
                <p className="text-green-600 font-bold text-sm mb-2">{mentor?.mapel || "Subject Expert"}</p>
                <span  className="text-gray-500  font-semibold text-xs">Lokasi:</span>
                <p className="text-gray-500  text-xs ">DESA <DesaName desaId={mentor?.kelurahan} kecamatanId={mentor?.kecamatan} /></p>
              </div>
             <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg rounded-t-lg">
                <p className="text-sm text-gray-700 mb-3">
                  {mentor.text || "Experienced mentor with years of teaching expertise."}
                </p>
                <button 
                type="button"
                onClick={() => handleSubmit(mentor?.iduser || '')}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200">
                  Pilih Guru 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

      )}

  {/* End Loading state */}

    {/* Modal Popup */}
            {showModal && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div 
                        className="bg-white rounded-lg p-6 max-w-sm mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            { result.statuspembayaran === 'pending' || result.statuspembayaran === 'expire' || !result  ? (
                              <>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">Maaf Anda Belum Berlangganan</h3>
                                <p className="text-sm text-gray-500 mb-4">Anda Belum Berlangganan Mohon Langganan Terlebih Dahulu</p>
                                  <button
                                onClick={handleRedirectToPembayaran}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                              Langganan Sekarang
                            </button>
                          </>
                            ) :(
                              <>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Guru Sudah Dipilih</h3>
                            <p className="text-sm text-gray-500 mb-4">Anda Sudah Memilih Guru Sebelumnya Silahkan Cek Kelas Anda</p>
                              <button
                                onClick={handleRedirectToGuru}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Cek Daftar Kelas
                            </button>
                          </>
                            ) }
                          
                        </div>
                    </div>
                </div>
            )}


     {/* Modal Popup */}
            {showModalBooking && (
               <div 
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  onClick={() => setShowModalBooking(false)}
>
  <div 
    className="bg-white rounded-lg p-6 max-w-sm mx-4 relative"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Tombol X */}
    <button
      onClick={() => setShowModalBooking(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
           className="h-5 w-5" 
           viewBox="0 0 20 20" 
           fill="currentColor">
        <path fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
                 1.414L11.414 10l4.293 4.293a1 1 0 
                 01-1.414 1.414L10 11.414l-4.293 
                 4.293a1 1 0 01-1.414-1.414L8.586 
                 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" />
      </svg>
    </button>

    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 
          2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 
          0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Maaf Anda Mempunyai Kelas</h3>
      <p className="text-sm text-gray-500 mb-4">Anda Bisa Lihat Kelas Anda Disni</p>
      <button
        onClick={handleRedirectToKelas}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Lihat Kelas
      </button>
    </div>
  </div>
</div>

            )}

</div>


</div>   


      
    </>
    );
}

export default DaftarGuru;