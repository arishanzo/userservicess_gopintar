
import Category from "./Category";
import GuruPrivate from "../guru/GuruPrivate";
import { useAuth } from "../../context/AuthContext";
import SideNav from "../components/SideNav";
import { UseGetOrder } from "../../hook/useGetOrder";
import ReminderKelas from "./ReminderKelas";
import {getDataMenu} from "../../lib/data/getDataMenu";
import { UseGetBooking } from "../../hook/kelas/useGetBooking";

const Dashboard = () => {
    const { user } = useAuth();
    
     const { booking } = UseGetBooking(user?.iduser) ;
      
     const { result, loading  } = UseGetOrder(user?.iduser);

    const data = getDataMenu();

  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
     {loading ? (

              <div className="w-full h-full py-16 p-4 sm:pt-20 ">

<div className="mb-4 md:pt-8 md:px-8 animate-pulse">
  {/* Header */}
  <div className="flex mx-auto px-2 md:px-8 items-center justify-between mb-6">
    <div className="h-6 w-48 bg-gray-300 rounded"></div>
  </div>

  {/* Grid Desktop */}
  <div className="hidden md:grid px-2 md:px-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="flex flex-col items-center p-6 rounded-3xl shadow-lg bg-gray-50 border border-gray-200"
      >
        <div className="mb-4 w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="h-3 w-24 bg-gray-300 rounded mb-3"></div>
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>

  {/* Scrollable Mobile View */}
  <div
    className="flex gap-2 overflow-x-auto scrollbar-hide cursor-grab scroll-smooth focus:outline-none md:hidden px-2"
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    tabIndex={0}
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="relative group flex-shrink-0 w-40 h-full py-2 p-2"
      >
        <div className="relative overflow-hidden bg-white rounded-xl shadow-lg transition-transform transform duration-300">
          <div className="flex flex-col items-center p-6 rounded-3xl shadow-lg bg-gray-50 border border-gray-200">
            <div className="mb-4 w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      </div>
    ))}
    
  </div>
</div>




       {/* Main content area (Loading State) */}
<div className="w-full h-full py-16 p-4 sm:pt-20 animate-pulse">
  <div className="mb-4 py-4 pt-8 md:px-8">
    {/* Judul Menu */}
    <div className="mb-6 px-2 md:hidden">
      <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-48 bg-gray-200 rounded"></div>
    </div>

    {/* Grid Skeleton */}
    <div className="grid md:grid-cols-4 grid-cols-3 gap-4 mb-8 md:hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border-2 rounded-2xl p-4 bg-gray-50 shadow-sm shadow-gray-100"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full mb-3"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      
      
</div>
            
       ) : (

         // Main content area 
              <div className="w-full h-full py-16 p-2 sm:pt-20 ">
          
          
        <div className="mb-4 p-4 pt-12 md:px-8">
         
          <ReminderKelas booking={booking} />
          
          <Category />

           <div className="mb-6 px-2 md:hidden">
        <h2 className="text-lg font-semibold text-green-800 mb-1">Menu Utama</h2>
        <p className="text-sm text-gray-500">Pilih menu untuk mengakses fitur</p>
      </div>

    

      {/* Menu Grid */}
      <div className="grid md:grid-cols-4 grid-cols-3 gap-4 mb-8 md:hidden">
        {data.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer"
          >
            <div className={`${item.color} border-2 rounded-2xl p-4 hover:shadow-lg active:scale-95 transition-all duration-200`}>
              <a href={item.link} className="text-center">
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-gray-700 font-medium text-xs md:text-sm leading-tight">
                  {item.judul}
                </h3>
              </a>
            </div>
          </div>
        ))}
      </div>

            <GuruPrivate result={result} />
        </div>

        
</div>
       )}



      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Dashboard;