
import DaftarGuru from "./DaftarGuru";
import GuruPrivate from "./GuruPrivate";
import SideNav from "../components/SideNav";
import { UseGetOrder } from "../../hook/useGetOrder";
import { useAuth } from "../../context/AuthContext";
import Category from "../dashboard/Category";

const Guru = () => {
 const { user } = useAuth();
 const { result  } = UseGetOrder(user?.iduser);
 


  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
  
                  <div className="w-full h-full py-16 p-4 sm:pt-28 ">
            <Category/>
            <GuruPrivate  result={result} />
        </div>


      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Guru;