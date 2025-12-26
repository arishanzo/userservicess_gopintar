import { CheckCircle, Calendar, User,  } from "lucide-react";
import { useMemo, useState } from "react";
import { UseGetAbsensiGuru } from "../../hook/useGetAbsensiGuru";
import axiosClient, { serviceClient } from "../../lib/axios";
import toast from "react-hot-toast";
import { UseGetGuru } from "../../hook/useGetGuru";

const ReminderKelas = ({ booking }) => {

const now = new Date();
const { absensiGuru } = UseGetAbsensiGuru(booking[0]?.idprofilguru);
const { guru } = UseGetGuru();


const options = { day: "numeric", month: "long", year: "numeric" };


const [disabled, setDisabled] = useState(false);
const [ratingShow, setRatingShow] = useState(false);
const [rating, setRating] = useState(0);
const [hoverRating, setHoverRating] = useState(0);
const [ comment ,setComment] = useState('');

const cariIDGuru = guru?.find((g) => g.idprofilguru === booking[0]?.idprofilguru).user_guru?.idguru;

  const allBookingDates = useMemo(() => {
         return booking && booking.length > 0 
           ? booking.flatMap(item => item.tgl__booking__kelas || []) 
           : [];
       }, [booking]);

         const { end } = allBookingDates.reduce(
          (acc, item) => {
            const date = item.tglbooking;
            if (!acc.end || new Date(date) > new Date(acc.end)) acc.end = date;
            return acc;
          },
          { end: null }
        );


const tglAbsen = absensiGuru?.filter((item) => {
  const tglItem = item.tanggal;
  return tglItem === end;
});
 


  const konfirmasiSelesai = async (idbookingprivate) => {
     
      setDisabled(true);

     const formSaldoMasuk = new FormData();
     formSaldoMasuk.append('idbookingprivate', idbookingprivate);
     formSaldoMasuk.append('jumlahsaldomasuk', 310000)
     formSaldoMasuk.append('tglsaldomasuk', now);

        const toastLoading = toast.loading("Prosess...");
   try {
       
      await axiosClient.put(`/api/booking/${idbookingprivate}`, {
        status: 'Selesai'
      });
      
      await axiosClient.delete(`/api/midtrans//${booking[0]?.iduser}`)

     await serviceClient.putSaldoGuru(cariIDGuru, { formSaldoMasuk });
            
          toast.success("🎉 Komfirmasi Berhasil", {
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
            
        setRatingShow(true);

      } catch (err) {
        toast.error(`Maaf, Komfirmasi Tidak Berhasil. ${err.message}`, {  
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
         toast.dismiss(toastLoading);

      }
    };

    const beriRatingGuru = async () => {
   
    setDisabled(true);
    const toastLoading = toast.loading("Prosess...");

   try {
        setDisabled(true);
       
      await axiosClient.put(`/api/ratingguru`, {
        idprofilguru: booking[0]?.idprofilguru,
        idbookingprivate: booking[0]?.idbookingprivate,
        rating: rating,
        comment: comment,
      });
                    
          toast.success("🎉 Beri Rating Berhasil", {
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
          
        setTimeout(() => window.location.reload(), 1500);
        setRatingShow(false);

      } catch (err) {
        toast.error(`Maaf, Beri Rating Tidak Berhasil. ${err.message}`, {  
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
         toast.dismiss(toastLoading);
         setRatingShow(false);

      }
    };

  return (
    <>
    {tglAbsen.length > 0 && booking[0].statusbooking === 'Sudah Mulai' && (
 
    <div className=" bg-gradient-to-br from-slate-50 to-green-50 p-6 pb-8">
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="md:text-2xl text-xl font-bold bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent mb-2">
            Konfirmasi Kelas Selesai
          </h1>
        </div>

        <div className="grid gap-4">
          {booking.map((item) => (
            <div
              key={item.idbookingprivate}
              className={`group relative overflow-hidden backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02]  bg-white/80 border-green-200 hover:shadow-xl hover:shadow-green-100/50
              rounded-3xl p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full  bg-green-500
                    `} />
                    <h2 className="text-xl font-bold text-green-800">
                      {item.mapeldipilih}
                    </h2>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center gap-2 text-green-900">
                      <User size={16} className="text-green-500" />
                      <span>Guru: {guru?.find( (g) => g.idprofilguru === item.idprofilguru).user_guru.name} </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-900">
                      <Calendar size={16} className="text-green-500" />
                      <span>{new Date(item.created_at).toLocaleDateString("id-ID", options)} - {new Date(end).toDateString("id-ID", options)}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-6">
              
                    <button
                      onClick={() => konfirmasiSelesai(item.idbookingprivate)}
                       className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                     } bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      Konfirmasi Selesai
                    </button>
                </div>
              </div>
              
              <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                item.selesai ? 'from-green-400 to-emerald-400' : 'from-green-400 to-green-400'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
    )}


       {/* Modal Rating Guru */}
                  {ratingShow && (
                    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setRatingShow(false)}
      >
        <div 
          className="bg-white rounded-lg p-6 max-w-md mx-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tombol X */}
          <button
            onClick={() => setRatingShow(false)}
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
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
              <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">Berikan Rating Guru</h3>
            <p className="text-sm text-gray-500 mb-6">Bagaimana pengalaman Anda dengan guru ini?</p>
            
            {/* Rating Bintang */}
          <div className="flex flex-col items-center gap-4 mb-6">
            {/* STAR RATING */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-colors duration-200"
                >
                  <svg
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>

            {/* COMMENT */}
            <textarea
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tulis komentar Mu..."
              className="w-72 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={3}
            />
          </div>

            <div className="grid grid-cols-2 gap-4">
              <button
               onClick={() => beriRatingGuru()}
                       disabled={disabled}
                       className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200`} >
                Kirim Rating
              </button>
              <button
                onClick={() => {
                  setRatingShow(false);
                  setRating(0);
                  setHoverRating(0);
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Lewati
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default ReminderKelas;