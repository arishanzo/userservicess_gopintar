

import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import {  useEffect,  useState } from 'react';
import { UseGetGuru } from "../../hook/useGetGuru";
import { UseGetBooking } from "../../hook/kelas/useGetBooking";
import { UseGetProfil } from "../../hook/useGetProfil";
import { UseGetRatingGuru } from "../../hook/useGetRatingGuru";




const DesaName = ({ desaId, kecamatanId }) => {
  const [desaName, setDesaName] = useState("");


 
  useEffect(() => {
    if (desaId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatanId}.json`)
        .then(res => res.json())
        .then(data => setDesaName(data.find(item => item.id === desaId).name || ""))
        .catch(() => setDesaName(""));
    }
  }, [desaId, kecamatanId]);
  
  return <span>{desaName}</span>;
  
};


const KabupatenName = ({ kecamatanId, kabupatenId }) => {
  const [kecamatanName, setKecamatanName] = useState("");

 
  useEffect(() => {
    if (kabupatenId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupatenId}.json`)
        .then(res => res.json())
        .then(data => setKecamatanName(data.find(item => item.id === kecamatanId).name || ""))
        .catch(() => setKecamatanName(""));
    }
  }, [kabupatenId, kecamatanId]);
  
  return  <span>
          {kecamatanName.charAt(0).toUpperCase() + kecamatanName.slice(1).toLowerCase()}
        </span>

  
};


const GuruPrivate = ( { result, user }) => {
   const [kategori, setKategori] = useState("Filter");

  const [showModal, setShowModal] = useState(false);
  
  const [showModalBooking, setShowModalBooking] = useState(false);


  
    const { profil } = UseGetProfil(user?.iduser || '');
    const { guru } = UseGetGuru();
    const { booking } = UseGetBooking(user?.iduser || '');
    const { ratingGuru } =  UseGetRatingGuru();


  const queryParams = new URLSearchParams(window.location.search);
 const query = queryParams.get('cariguru') || '';
   

  const hasilFilter = query
    ? guru?.filter(mentor =>
        mentor.user_guru?.name?.toLowerCase().includes(query.toLowerCase()) ||
        (mentor.mapel && Array.isArray(mentor.mapel) && mentor.mapel.some(mp => mp?.toLowerCase().includes(query.toLowerCase())))
      )
    : guru?.filter(mentor =>mentor.kecamatan === profil?.kecamatan  && (kategori === "Filter" ? true : mentor.bidangngajar === kategori)
      );
 
      
   const Navigate = useNavigate();
 
 
   const kembali = () => {
    Navigate('/guru');
    setKategori("Filter");
   };

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
        
          // sessionStorage.removeItem('selectedGuruId');

           const secretKey = 'gopintarguru2025';
           const encrypted = CryptoJS.AES.encrypt(idprofilguru, secretKey);
     
           const selectedGuruId = sessionStorage.getItem('selectedGuruId', encrypted);
     
             if(result === null || result?.statuspembayaran === 'pending' || result?.statuspembayaran === 'expire' ){
               
               setShowModal(true);
             }else if (booking.statusbooking === 'Sudah Mulai') {
                setShowModalBooking(true);
             }else if (selectedGuruId) {
                setShowModal(true);
             }else{
             sessionStorage.setItem('selectedGuruId', encrypted);
             
             Navigate('/kelas/buatkelas');
             }
           }
     
    return (

        <>


<div className="pt-2 md:py-2 sm:py-8 overflow-x-hidden" id='mentor'>
   <div className="mx-auto py-8 px-2 md:px-8">
      <div className="mb-2 text-center">
        <div className="flex items-center justify-between gap-12">
          <h2 className="text-xl font-bold text-green-800 lg:text-xl">
             👨‍🏫 Guru di Kecamatan <KabupatenName kabupatenId={profil?.kabupaten} kecamatanId={profil?.kecamatan} />
          </h2>

          {/* Dropdown */}
          <div className="relative">
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
               className="px-4 py-2 border rounded-lg bg-white shadow focus:ring-1 focus:ring-green-500 focus:border-green-500 w-[100px]"
>

                <option disabled>{kategori}</option>
             <option value="Fokus Akademik Umum (SD, SMP, SMA)">Fokus Akademik Umum (SD, SMP, SMA)</option>
                        <option value="Persiapan Ujian & Tes Khusus">Persiapan Ujian & Tes Khusus</option>
                        <option value="Keterampilan & Mapel Non-Akademik"> Keterampilan & Mapel Non-Akademik</option>
                        <option value="Pendekatan Belajar Khusus">Pendekatan Belajar Khusus</option>
                        <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>
      </div>




  {/* Loading state */}
        {!guru ? (
          
     <div className="hidden md:grid px-2 md:px-8 grid-cols-2  sm:grid-cols-3 lg:grid-cols-6 gap-10">
            {[...Array(20)].map((_, i) => (
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
    <div className="md:grid px-2 md:px-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">
  {hasilFilter.length === 0 ? (
    <div className="col-span-full flex justify-center items-center py-16 px-4">
      <div className="rounded-2xl p-8 max-w-md w-full text-center">

    {!query ? (
      <>
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Guru Tidak Ditemukan</h3>
                <p className="text-gray-500 text-sm mb-6">Tidak ada guru yang sesuai dengan Lokasi Anda Saat Ini, Perbarui Lokasi Anda Di Menu Profil</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => Navigate('/profil')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Perbarui Profil
                </button>
            
              </div>
</>

    ) : (
      <>
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Guru Tidak Ditemukan</h3>
                <p className="text-gray-500 text-sm mb-6">Tidak ada guru yang sesuai dengan pencarian / Lokasi Anda Saat Ini, Perbarui Lokasi Anda Di Menu Profil</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => kembali()}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reload
                </button>
                <button
                  onClick={() => kembali()}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali
                </button>
              </div>

</>
    )}
       
            </div>
          </div>
        ) : (
          <>
        {hasilFilter.map((mentor, i) => (
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
                <p className="text-gray-500  text-xs mb-2"><DesaName kecamatanId={mentor?.kecamatan} desaId={mentor?.kelurahan} /></p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-gray-700 font-semibold text-xs"> {(
                        (ratingGuru?.filter((i) => i.idprofilguru === mentor.idprofilguru)
                          .reduce((sum, r) => sum + r.rating, 0) || 0) /
                        (ratingGuru?.filter((i) => i.idprofilguru === mentor.idprofilguru).length || 1)
                      ).toFixed(1)}
                    </span>
                  <span className="text-gray-500 text-xs">({ratingGuru?.filter((i) => i.idprofilguru === mentor.idprofilguru).length || 0} ulasan)</span>
                </div>
              </div>
             <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg rounded-t-lg">
                <p className="text-sm text-gray-700 mb-3">
                  {mentor.text || "Experienced mentor with years of teaching expertise."}
                </p>
                <button 
                type="button"
                onClick={() => handleSubmit(mentor?.idprofilguru || '')}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200">
                  Pilih Guru 
                </button>
              </div>
            </div>
          </div>
        ))}
        </>
            )}
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
                            { result?.statuspembayaran === 'pending' || result?.statuspembayaran === 'expire' || result === null  ? (
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

export default GuruPrivate;