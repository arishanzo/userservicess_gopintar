import UsePageLoadig from "../../hook/usePageLoading";
import SideNav from "../components/SideNav";
import AbsensiForm from "./AbsensiForm";

const AbsensiIndex = () => {
  
    

  return (

    <>
  <div className="flex bg-gradient-to-r from-green-50 via-indigo-10 to-purple-50">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
     
              <div className="w-full h-full py-20 p-4 sm:pt-24 ">
          <AbsensiForm />
        </div>

    

      </div>
 
 

  </div>


</>
  );
}   
export default AbsensiIndex;