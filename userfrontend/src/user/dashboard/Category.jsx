
import { useRef } from "react";
import { getDataCategoryBelajar } from "../../lib/data/getDataCategoryBelajar";

const Category = () => {

  const scrollRef = useRef(null);
const categories = getDataCategoryBelajar();


  return (
    <div className="mb-4 md:pt-4">
      <div className="flex mx-auto  px-2 md:px-8 items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-800">📚 Kategori Pelajaran</h2>
      </div>

     <div className="hidden md:grid px-2 md:px-8 grid-cols-2  sm:grid-cols-2 lg:grid-cols-4 gap-10">
  {categories.map(({ id, judul, icon, review }) => (
    <div
      key={id}
      className="flex flex-col items-center p-6 rounded-3xl shadow-lg bg-green-50 border-gray-900 hover:scale-105 transform transition-transform duration-300 cursor-pointer"
    >
      <div className="mb-4 text-4xl md:text-4xl" aria-label={judul}>
        {icon}
      </div>
      <h3 className="md:text-sm text-xs font-bold mb-3 text-gray-800 text-center">{judul}</h3>
      <p className="text-center text-gray-600 md:text-md text-xs italic max-w-xs">
        {`"${review}"`}
      </p>
    </div>
  ))}
</div>


   <div 
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide cursor-grab scroll-smooth focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        tabIndex={0}
      >
        


       <div className="flex md:hidden px-2 md:px-8 justify-end">
        {categories.map(({ id, judul, icon }) => (
           <div key={id} className="relative group flex-shrink-0 w-40 h-full py-2 p-2 md:p-0">
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          
          <div
         
            className={`flex flex-col items-center p-6 rounded-3xl shadow-lg bg-green-50 boder-gray-900 hover:scale-105 transform transition-transform duration-300 cursor-pointer`}
          >
            <div className={`mb-4 text-3xl md:text-6xl `} aria-label={judul}>
              {icon}
            </div>
            <h3 className="md:text-sm text-xs  font-bold mb-3 text-gray-800 text-center">{judul}</h3>
          </div>
          </div>
          </div>
        ))}
      </div>
      </div>

    </div>
  );
};

export default Category;