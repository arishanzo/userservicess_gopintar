
import { UseGetKegiatanBelajar } from "../../../../hook/kelas/useGetKegiatanBelajar";

const MateriKelas = ( { booking }) => {
        
      const  {kegiatanBelajar, loadingKegiatanBelajar } = UseGetKegiatanBelajar(booking?.idbookingprivate);
     

        

    const link = (linkmateri) => {
              window.open(linkmateri, "_blank");

          }
  
  return (
    <>
   
       
          {/* Loading state */}
        {loadingKegiatanBelajar ? (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200 animate-pulse">
            <div className="flex-1">
              <div className="h-3 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
            </div>
          </div>
        ) : (
          
                <div className="md:p-6 space-y-6">
 {/* Jadwal Hari Ini */}
  <div className="flex items-center justify-between mb-4 pt-2">
          <h3 className="text-lg font-bold text-green-800">Materi Kelas</h3>
        </div>
        <div className="space-y-4">
          {kegiatanBelajar && kegiatanBelajar.length > 0 ? (
            kegiatanBelajar.map((kegiatan, i) => (
              <>
              <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200">
     
         <div className="flex-1">
                <h4 className="md:text-xl text-xl font-bold text-green-800 mb-2">Materi {kegiatan.namakegiatan}</h4>
                <p className="text-gray-500 text-md">Tanggal: {new Date(kegiatan.tglkegiatan).toLocaleDateString('id-ID')}</p>
             </div>

            <div className="md:flex-2  items-center gap-4 text-gray-500 mt-auto ">
             
              <button 
               onClick={() => link(kegiatan?.linkmateri)}
              className="flex items-center py-2 hover:text-blue-600">
                Lihat Materi
              </button>
            </div>
           </div>
</>
              
            ))
          ) : (
            <p className="text-gray-500 text-sm">Tidak ada Materi untuk hari ini.</p>
          )}
        </div>
    
    </div>
        )}



        </>
    );
};

export default MateriKelas;