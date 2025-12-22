
import DaftarGuru from "./DaftarGuru";
import GuruPrivate from "./GuruPrivate";
import SideNav from "../components/SideNav";
import { UseGetOrder } from "../../hook/useGetOrder";
import { useAuth } from "../../context/AuthContext";
import Category from "../dashboard/Category";

const Guru = () => {
 const { user } = useAuth();
 const { result, loading  } = UseGetOrder(user?.iduser);
 


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
</div>
            
       ) : (

         // Main content area 
                  <div className="w-full h-full py-16 p-4 sm:pt-28 ">
            <Category/>
            <GuruPrivate  result={result} />
        </div>

       )}

      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Guru;