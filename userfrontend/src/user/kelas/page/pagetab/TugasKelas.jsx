import React from "react";  
import { UseGetTugasKelas } from "../../../../hook/kelas/useGetTugasKelas";
import { Pencil, Check } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { serviceClient } from "../../../../lib/axios";

const TugasKelas = ( { booking }) => {
        
      const  {tugasKelas, loadingTugasKelas } = UseGetTugasKelas(booking[0]?.idbookingprivate);
      const [disabled, setDisabled] = React.useState(false);
     


  const options = { day: "numeric", month: "long", year: "numeric" };
   
  const komfirmasiTugas = async (idtugasbelajar) => {

     const selected = tugasKelas.find(
              (t) => t?.idtugasbelajar === idtugasbelajar
            );

             if (selected.statustugas === 'selesai') {
         toast.error("Maaf, Anda Sudah Mengumpulkan Tugas.", {
            style: {
            border: '1px solid #f63b3bff',
            padding: '16px',
            color: '#f1474dff',
            background: '#ffffffff',
            fontWeight: '500',
            },
            iconTheme: {
            primary: '#e6132fff',
            secondary: '#ffffffff',
            },
        });
        return;
    }

        if (selected.tgldeadlinetugas < new Date().toISOString()) {
         toast.error("Maaf, tugas ini sudah melewati batas waktu pengumpulan.", {
            style: {
            border: '1px solid #f63b3bff',
            padding: '16px',
            color: '#f1474dff',
            background: '#ffffffff',
            fontWeight: '500',
            },
            iconTheme: {
            primary: '#e6132fff',
            secondary: '#ffffffff',
            },
        });
        return;
        }

         try {
              
                setDisabled(true);

                const loadingToast = toast.loading("⏳ Sedang Mengirim  tugas...");

              await serviceClient.putTugasKelas(idtugasbelajar, { status: "selesai" });
        
               toast.dismiss(loadingToast);

           
              toast.success("🎉 Tugas berhasil dikumpulkan!", {
                style: {
                    border: '1px solid #16A34A',
                    background: '#ECFDF5',
                    color: '#065F46',
                    fontWeight: '500',
                },
                iconTheme: {
                    primary: '#16A34A',
                    secondary: '#ECFDF5',
                },
                });

              
              setTimeout(() => window.location.reload(), 3000);
              
            } catch (err) {
               err.response?.data || {};
               toast.error("Maaf, tugas Tidak Berhasil Di Kumpulkan.", {
                    style: {
                    border: '1px solid #f63b3bff',
                    padding: '16px',
                    color: '#f1474dff',
                    background: '#ffffffff',
                    fontWeight: '500',
                    },
                    iconTheme: {
                    primary: '#e6132fff',
                    secondary: '#ffffffff',
                    },
                });
            } finally {
              setDisabled(false);
             
            }



  }
  
  return (
    <>
   
       
          {/* Loading state */}
        {loadingTugasKelas ? (
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
          <h3 className="text-lg font-bold text-green-800">Tugas Kelas</h3>
        </div>

        
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
                <strong>Penting:</strong> Silahkan Klik Tombol Centang{' '}
                <span className="font-semibold">
                 Untuk Menyelesaikan Tugas
                </span>{' '}
                setelah mengerjakan tugas yang diberikan oleh guru.
              </p>
            
            </div>
          </div>

        <div className="space-y-4">
          {tugasKelas && tugasKelas.length > 0 ? (
            tugasKelas.map((t, i) => (
              <>
              <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200">
     

      <div className="flex-1">
    <h1 className="md:text-xl text-lg font-bold text-green-800 ">
     {t.namatugas}
    </h1>

    <div className="mt-2 space-y-2">
      <p className="text-gray-500 text-sm flex items-center gap-2 mb-4">
        <span className="font-medium"> {t.deskripsitugas}</span>
      </p>

      <p className="text-gray-500 text-sm flex items-center gap-2">
        Deadline: <span className="font-bold text-red-600">
          {new Date(t.tgldeadlinetugas).toLocaleDateString("id-ID", options)}
        </span>
      </p>
      <p className="text-gray-500 text-sm flex items-center gap-2">
        Link Tugas: 
        <button
        onClick={() =>
            window.open(`${t?.filetugas}`, '_blank', 'noopener,noreferrer')
          } className="font-semibold text-grey-500 underline">
            Lihat Tugas</button>
      </p>
      <p className="text-gray-500 text-sm flex items-center gap-2">
        Status: <span className="font-semibold text-gray-500">{t.statustugas}</span>
      </p>

       <p className="text-gray-500 text-sm flex items-center gap-2">
        Nilai: <span className="font-semibold text-gray-500">
           <span className="font-bold text-green-500"> { t.tgldeadlinetugas < new Date().toISOString() ? 'Terlambat' : t.nilai__tugas?.nilaitugas || "-"}</span>  {''}/100
        </span>
      </p>
    </div>
    
  </div>

   <div className="flex gap-3 pt-8">

 {/* Tombol Detail */}
      <div className="relative group">
        <button 
        disabled={disabled}
         onClick={() => (komfirmasiTugas(t.idtugasbelajar))}
        className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200">
          <Check className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1">
       Komfirmasi Tugas
        </span>
      </div>
      </div>
        
           </div>
</>
              
            ))
          ) : (
            <p className="text-gray-500 text-sm">Tidak ada Tugas  untuk hari ini.</p>
          )}
        </div>
    
    </div>
        )}



        </>
    );
};

export default TugasKelas;