
import DaftarGuru from "./DaftarGuru";
import GuruPrivate from "./GuruPrivate";
import SideNav from "../components/SideNav";
import { UseGetOrder } from "../../hook/useGetOrder";
import { useAuth } from "../../context/AuthContext";
import Category from "../dashboard/Category";
import { UseGetGuru } from "../../hook/useGetGuru";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { UseGetProfil } from "../../hook/useGetProfil";
import { UseGetBooking } from "../../hook/kelas/useGetBooking";
import { UseGetRatingGuru } from "../../hook/useGetRatingGuru";
import { UseGetBookingAll } from "../../hook/useGetBookingAll";
const Guru = () => {
    const { user } = useAuth();
    const { profil } = UseGetProfil(user?.iduser || '');

    const { BookingAll } = UseGetBookingAll();

    const { result, loading } = UseGetOrder(user?.iduser);
    const { booking } = UseGetBooking(user?.iduser || '');

    const { guru } = UseGetGuru();
    const { ratingGuru } =  UseGetRatingGuru();

  return (

    <>
  <div className="flex bg-gradient-to-r from-green-50 via-indigo-10 to-purple-50">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
                  <div className="w-full h-full py-24 p-6 sm:pt-28 ">
                    {loading ? (
                        <>
                          {/* Header */}
  <div className="flex mx-auto px-2 md:px-8 items-center justify-between mb-6">
    <div className="h-6 w-48 bg-gray-300 rounded"></div>
  </div>

    <div className="hidden md:grid px-2 md:px-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 py-8 gap-10">

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center p-6 rounded-3xl shadow-lg bg-gray-100 animate-pulse"
        >
          {/* Icon skeleton */}
          <div className="w-16 h-16 rounded-full bg-gray-300 mb-4" />

          {/* Title skeleton */}
          <div className="h-4 w-24 bg-gray-300 rounded mb-3" />

          {/* Review skeleton */}
          <div className="h-3 w-full bg-gray-300 rounded mb-2" />
          <div className="h-3 w-3/4 bg-gray-300 rounded" />
        </div>
      ))}
    </div>

       <div className="flex md:hidden gap-2 px-2 overflow-x-auto scrollbar-hide">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-40 py-2 p-2"
        >
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-100 shadow-lg animate-pulse">
            
            {/* Icon skeleton */}
            <div className="w-12 h-12 rounded-full bg-gray-300 mb-4" />

            {/* Title skeleton */}
            <div className="h-3 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>

         <div className=" px-2 md:px-8 grid grid-cols-2 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-10">
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
  </>


) : (
  <>
        <div className="flex items-center space-x-2 md:pl-8 py-2 mb-2 ">
      <button
        onClick={() => window.history.back()}
        className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-md"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
   
      </div>
                  <Category/>
            <GuruPrivate  result={result} guru={guru}  user={user} profil={profil} ratingGuru={ratingGuru} booking={booking} BookingAll={BookingAll}/>
            </>
)}

        </div>


      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Guru;