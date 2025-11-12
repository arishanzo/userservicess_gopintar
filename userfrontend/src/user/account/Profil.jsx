import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import FormProfil from "./FormProfil";
import Keamanan from "./Keamanan";

const Profil = () => {

  const [activeTab, setActiveTab] = useState('profil');
  
  return (
    <>
      {/* Navbar di atas */}
      <NavbarUser />

      <div className="flex bg-green-10">
        {/* Sidebar di kiri */}
        <Sidebar />

        {/* Main content area */}
       <div className="flex-1  py-24 px-6 top-0 min-h-screen w-[80%]">
                 {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button 
                onClick={() => setActiveTab('profil')}
               
               className={`py-4 px-1 border-b-2 font-medium text-sm  ${activeTab === "profil" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  Ubah Profil
                </button>
              
                <button 
                 onClick={() => setActiveTab('keamanan')}
                className={`py-4 px-1 border-b-2 font-medium text-sm  ${activeTab === "keamanan" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  Keamanan
                </button>
              </nav>
            </div>

            {/* Profile Content */}
            <div className="">
             

              {/* Form Fields */}
               
               {activeTab === 'profil' && <FormProfil />}
               {activeTab === 'keamanan' && <Keamanan />}
                
               
                </div>
             </div>   
        </div>
      </div>
    </>
  );
};

export default Profil;