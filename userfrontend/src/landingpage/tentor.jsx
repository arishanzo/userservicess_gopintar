

import { getDataMentor } from "../assets/data/datatentor";
import {  useRef } from 'react';

const Tentor = () => {
  const scrollRef = useRef(null);
  const datamentor = getDataMentor();


  
    

    return (

        <>


<div class="bg-white h-full py-6 md:py-16 sm:py-8 lg:py-12 pt-8  overflow-x-hidden" id='mentor'>
  
    <div class="mx-auto md:max-w-[80%] px-8 md:px-8"  >
        <div className="mb-4 text-center">
            <div className="flex items-center justify-center gap-12">
               <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">Top Mentor Kami</h2>
       
            </div>
           <p className="text-gray-600 mt-2">Temukan mentor terbaik untuk membantu Anda belajar dengan efektif.</p>


       
        </div>



    <div className="py-8">
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide cursor-grab scroll-smooth focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        tabIndex={0}
      >
        {datamentor.map((mentor, i) => (
          <div key={i} className="relative group flex-shrink-0 w-72 py-8">
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
              <div className="bg-gray-200 rounded-xl overflow-hidden relative h-80">
                <img 
                  src={mentor.img || 'https://via.placeholder.com/300'}
                  alt={mentor.Name || "Mentor"}
                  className="w-full h-full object-cover object-center"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{mentor.Name|| "Mentor Name"}</h3>
                <p className="text-green-600 mb-4">{mentor.subject || "Subject Expert"}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg rounded-t-lg">
                <p className="text-sm text-gray-700">
                  {mentor.text || "Experienced mentor with years of teaching expertise."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


</div>


</div>   
      
    </>
    );
}

export default Tentor;