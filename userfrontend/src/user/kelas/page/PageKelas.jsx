import { useState } from "react";
import KelasAktif from "./pagetab/KelasAktif";
import MateriKelas from "./pagetab/MateriKelas";
import TugasKelas from "./pagetab/TugasKelas";

const PageKelas = ( { booking}) => {
    
      const [activeTab, setActiveTab] = useState('kelas');
    return (
        <>
       {/* Tab Navigation */}
<div className=" rounded-lg shadow-sm  mb-6">
  <div className="border-b border-gray-200">
    <nav className="flex overflow-x-auto flex-nowrap space-x-6 px-4 md:px-6 scrollbar-hide">
      {/* Tab: Kelas */}
      <button
        onClick={() => setActiveTab("kelas")}
        className={`py-3 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 shrink-0 ${
          activeTab === "kelas"
            ? "border-green-500 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Icon Buku */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v12m0-12C10.5 5.5 9 5 7.5 5S4.5 5.5 3 6v12c1.5-.5 3-1 4.5-1S10.5 17.5 12 18m0-12c1.5-.5 3-1 4.5-1s3 .5 4.5 1v12c-1.5-.5-3-1-4.5-1s-3 .5-4.5 1"
          />
        </svg>
        <span className="whitespace-nowrap">Kelas</span>
      </button>

      {/* Tab: Materi Kelas */}
      <button
        onClick={() => setActiveTab("materi")}
        className={`py-3 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 shrink-0 ${
          activeTab === "materi"
            ? "border-green-500 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Icon Dokumen */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 7h10M7 11h10M7 15h6m5 6H6a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
          />
        </svg>
        <span className="whitespace-nowrap">Materi</span>
      </button>

      {/* Tab: Tugas & Nilai */}
      <button
        onClick={() => setActiveTab("tugas")}
        className={`py-3 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 shrink-0 ${
          activeTab === "tugas"
            ? "border-green-500 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Icon Clipboard */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5h6m-6 4h6m-6 4h4m1-9V3h-4v2H7v18h10V5h-2z"
          />
        </svg>
        <span className="whitespace-nowrap">Tugas & Nilai</span>
      </button>
    </nav>
  </div>

  {/* Tab Content */}
  <div className="p-4">
    {activeTab === "kelas" && <KelasAktif booking={booking} />}
    {activeTab === "materi" && <MateriKelas booking={booking} />}
    {activeTab === "tugas" && <TugasKelas booking={booking} />} 

 
  </div>
</div>
</>
    )
}   

export default PageKelas;