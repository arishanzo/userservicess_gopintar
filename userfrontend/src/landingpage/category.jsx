

const Category = () => {

    
  const data = [
    { id: 1, 
      judul: 'Matematika', 
      icon: 'http://svgrepo.com/show/362863/math-operations-bold.svg' 
    },


     { id: 2, 
      judul: 'Mapel Sains / IPA', 
      icon: 'https://www.svgrepo.com/show/455758/laboratory-test-tube.svg' 
    },
   
     { id: 3, 
      judul: 'Mapel IPS', 
      icon: 'https://www.svgrepo.com/show/454211/history-log-manuscript.svg' 
    },

     
     { id: 4, 
      judul: 'Bahasa Inggris', 
      icon: 'https://www.svgrepo.com/show/535472/language.svg' 
    },

       { id: 5, 
      judul: 'Bahasa Indonesia', 
      icon: 'https://www.svgrepo.com/show/403413/flag-for-indonesia.svg' 
    },

       { id: 6, 
      judul: 'Mapel Umum', 
      icon: 'https://www.svgrepo.com/show/502515/bar-chart.svg' 
    },

       { id: 7, 
      judul: 'Persiapan UTBK', 
      icon: 'https://www.svgrepo.com/show/282517/studying-exam.svg' 
    },

       { id: 8, 
      judul: 'Persiapan Ujian Nasional', 
      icon: 'https://www.svgrepo.com/show/282517/studying-exam.svg' 
    },

    // { id: 9, 
    //   judul: 'Ujian Masuk PTN', 
    //   icon: 'https://redpixelthemes.com/assets/images/icon-portfolio-green.svg' 
    // },

    //   { id: 10, 
    //   judul: 'Ujian SBMPTN', 
    //   icon: 'https://redpixelthemes.com/assets/images/icon-portfolio-green.svg' 
    // },


  ];

  return (
  
<>
<div className="container relative z-40 mx-auto md:py-24 px-4 py-16 sm:px-6 lg:px-8">
    <div className="text-center mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="md:text-md text-sm font-bold text-gray-900 mb-2">Kategori Pembelajaran</h2>
           </div>

    <div className="overflow-hidden max-w-7xl mx-auto">
      <div 
        className="flex gap-8  animate-scroll-category"
        style={{
          animation: 'scrollCategory 30s linear infinite',
          width: `${data.length * 2 * 120}px`
        }}
      >
        {data.concat(data).map((item, index) => (
            <a key={`${item.id}-${index}`} href="#" className="block py-3 text-center hover:bg-green-50 transition-colors duration-200 flex-shrink-0 w-28">
                <div>
                    <img src={item.icon} className="block mx-auto w-8 h-8" />
                    <p className="pt-2 text-xs font-medium capitalize text-gray-700">
                    {item.judul}     
                    </p>
                </div>
            </a>
        ))}
      </div>
    </div>

    <style>{`
      @keyframes scrollCategory {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>

</div>
</>

  )
}

export default Category;