
import DaftarGuru from "./DaftarGuru";
import GuruPrivate from "./GuruPrivate";
import SideNav from "../components/SideNav";
import { UseGetOrder } from "../../hook/useGetOrder";
import { useAuth } from "../../context/AuthContext";
import Category from "../dashboard/Category";
import { UseGetGuru } from "../../hook/useGetGuru";

const Guru = () => {
 const { user } = useAuth();
 const { result, loading } = UseGetOrder(user?.iduser);

 const { guru } = UseGetGuru();
 

  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
  
                  <div className="w-full h-full py-16 p-4 sm:pt-28 ">
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
  </>


) : (
  <>

            <Category/>
            <GuruPrivate  result={result} guru={guru} />
            </>
)}

        </div>


      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Guru;