import { Users, Video, Image, FileText } from "lucide-react";
import { UseGetGuru } from "../../../../hook/useGetGuru";
import { UseGetKegiatanBelajar } from "../../../../hook/kelas/useGetKegiatanBelajar";
import { useState } from "react";
import ModalVideo from "../../showmodal/ModalVideo";
import ModalImage from "../../showmodal/ModalImage";

const KelasAktif = ({ booking }) => {
 console.log('Booking di KelasAktif:', booking);
      const { guru, loading } = UseGetGuru();
      const  {kegiatanBelajar, loadingKegiatanBelajar } = UseGetKegiatanBelajar(booking[0]?.idbookingprivate);
     


      const datamentor = Array.isArray(guru) 
        ? guru.find(mentor => mentor.idprofilguru === booking[0]?.idprofilguru)
        : null;

        

    const [showModalVideo, setShowModalVideo] = useState(false);
    const [videoKegiatan, setVideoKegiatan] = useState(null);


    const [showModalImage, setShowModalImage] = useState(false);
    const [linkFotoKegiatan, setLinkFotoKegiatan] = useState(null);

      const video = (videokegiatan) => {
           if (!videokegiatan) return;

              setVideoKegiatan(videokegiatan);
              setShowModalVideo(true);
            
          };

    const foto = (fotokegiatan) => {
              setLinkFotoKegiatan(fotokegiatan);
              setShowModalImage(true);

          };

    const link = (linkmateri) => {
              window.open(linkmateri, "_blank");

          }
  
     
    return (
       <>
          {/* Loading state */}
        {loading ? (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200 animate-pulse">
          <div className="flex-1">
            <div className="h-3 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
          </div>
        </div>
        ) : (
               <div className="md:p-6 space-y-6">


     {/* Kotak Peringatan */}
          <div className="flex items-start  gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-sm w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-yellow-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5.93 5.93a10 10 0 0112.14 0
                  10 10 0 010 12.14 10 10 0 01-12.14 0
                  10 10 0 010-12.14z"
              />
            </svg>
            <div className="text-sm text-yellow-800 space-y-1">
              <p>
                <strong>Penting:</strong> Jika Guru Belum Komfirmasi Kelas{' '}
                <span className="font-semibold">
                 Anda Bisa Melakukan Komfirmasi Dengan Klik Tombol Contact Guru
                </span>{' '}
                supaya Jadwal Kelas Bisa Dimulai.
              </p>
            
            </div>
          </div>
        



      {/* Header Kelas */}
      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200">
             <div className="flex-1">
             <p className="text-gray-500 text-sm flex items-center gap-2 mb-2">
                Nama Kelas
             </p>
          <h1 className=" text-xl font-bold text-green-800 mb-4">{booking[0]?.mapeldipilih}</h1>
          <p className="text-gray-500 text-sm flex items-center gap-2 mb-2">

            <Users size={18} /> Max 1 - 3 Siswa
             
          </p>
       
       
        <div className="mt-4">
        <p className="text-gray-500 text-sm flex items-center gap-2 mb-1">Guru: <span className="font-bold">{datamentor?.user_guru?.name || 'Guru Belum Dipilih'}</span></p>
              </div>
        </div>

        <div className=" gap-3">
        
        {booking[0]?.statusbooking === 'Belum Mulai' ? (
          <div className="bg-red-100 py-1 rounded-full p-2 text-xs text-center font-semibold md:px-6 mb-4 text-base text-red-700 mb-3" role="alert">
         {booking[0]?.statusbooking}
          </div>
        ) : booking[0]?.statusbooking === 'Sudah Mulai' ? (
          <div className="bg-yellow-100 py-1 rounded-full p-2 text-center font-semibold md:px-6 mb-4 text-base text-yellow-700 mb-3" role="alert">
         {booking[0]?.statusbooking}
          </div>
        ) :booking[0]?.statusbooking === 'Selesai' &&  (
              <div class="bg-green-100 py-1  rounded-full p-2 text-center md:px-6 mb-4 text-base text-green-700 mb-3" role="alert">
         {booking[0]?.statusbooking}
       </div>
          
        )}
        
      { booking[0]?.statusbooking === 'Belum Mulai' ? (
          <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            Hubungi Guru
          </button>
        ) : booking[0]?.statusbooking === 'Sudah Mulai' && (
           <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            Contact Guru
          </button>
        )}
        </div>

      </div>

     {booking[0]?.statusbooking === 'Belum Mulai' && (
        <p className="text-green-600 bg-green-50 p-4 md:text-sm  text-xs flex items-center mb-2">
          *Menunggu Komfirmasi Guru, Anda Bisa Klik Tombol Hubungi Guru Untuk <span className="font-bold px-1"> Komfirmasi</span>
        </p>
     )}



 {loadingKegiatanBelajar ? (
             <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200 animate-pulse">
          <div className="flex-1">
            <div className="h-3 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
          </div>
        </div>
        ) : (
          <div className="space-y-6">
            {kegiatanBelajar && kegiatanBelajar.length === 0 ? (
              <p className="text-gray-500 text-sm">Belum ada kegiatan belajar untuk kelas ini.</p>
            ) : (
              <>
  <div className="flex items-center justify-between mb-4 pt-4">
          <h3 className="text-lg font-bold text-green-800">Kegiatan Siswa</h3>
        </div>
        <div className="space-y-4">
          
            {kegiatanBelajar.map((kegiatan) => (
              
              <div key={kegiatan.idkegiatanbelajar} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200">
     
         <div className="flex-1">
                <h4 className="md:text-2xl text-xl font-bold text-green-800 mb-2">{kegiatan.namakegiatan}</h4>
                <p className="text-gray-600 text-sm mb-1">{kegiatan.deskripsikegiatan}</p>
                <p className="text-gray-500 text-xs">Tanggal: {new Date(kegiatan.tglkegiatan).toLocaleDateString('id-ID')}</p>
             </div>

            <div className="md:flex-2  items-center gap-4 text-gray-500 mt-auto ">
              <button
                onClick={() => video(kegiatan?.videokegiatan)}
               className="flex items-center py-2 hover:text-blue-600">
                <Video className="w-6 h-6" /> 
              </button>
              <button 
              onClick={() => foto(kegiatan?.fotokegiatan)}
              className="flex items-center py-2 hover:text-blue-600">
                <Image className="w-6 h-6" /> 
              </button>
              <button 
               onClick={() => link(kegiatan?.linkmateri)}
              className="flex items-center py-2 hover:text-blue-600">
                <FileText className="w-6 h-6" /> 
              </button>
            </div>
           </div>

              
            ))}
            
        </div>
        </>
                 )}
                 </div>
        )}

    
    </div>
        )}


         <ModalVideo
                  isOpen={showModalVideo}
                  onClose={() => setShowModalVideo(false)}
                  linkvideo={videoKegiatan}
                />

                <ModalImage
                  isOpen={showModalImage}
                  onClose={() => setShowModalImage(false)}
                  linkImage={linkFotoKegiatan}
                />

        </>
    )
}

export default KelasAktif;