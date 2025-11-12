

const   About = () => {


  return (
  
<>

  <section className="relative overflow-hidden font-poppins bg-light p-2 md:p-0 mb-16 text-dark bg-green-50">

    

    
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-light to-secondary/5 -z-10"></div>

    <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/10 animate-float -z-10"></div>
    <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-secondary/10 animate-float-reverse -z-10"></div>
    <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-primary/15 animate-float -z-10"></div>
    <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-secondary/15 animate-float-reverse -z-10"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  md:pt-16 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* image */}
        <div className="relative md:px-16 animate__animated animate__fadeIn md:flex md:w-auto">
             <img
              className="relative w-full h-96 md:h-[550px] object-cover object-top transition-transform duration-500 ease-in-out transform hover:scale-105"
              src="https://plus.unsplash.com/premium_photo-1681842130240-8fb4d3ada35f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Digital Marketing"
            />
        
          <div className="absolute bottom-8 left-4 bg-white px-4 py-3 rounded-lg shadow-lg flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium">Belajar Efektif Bareng Mentor</span>
          </div>
       
        </div>

        <div className="md:text-left">
          <span className="inline-block px-3 text-start mb-8  py-1 text-xs font-semibold tracking-wider text-gray-800 rounded-full bg-green-150 mb-4">
          Tentang Kami
          </span>
          <h1 className="text-3xl text-start sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-gray-900 text">Les Privat Berkualitas, Belajar Jadi Lebih Mudah</span>
          </h1>
          <p className="md:text-md text-sm text-justify text-gray-600 mb-8 max-w-lg">
            Dapatkan pengalaman belajar personal dengan guru berpengalaman. Metode pembelajaran disesuaikan dengan kebutuhan siswa, jadwal fleksibel, dan hasil yang terukur. Tingkatkan prestasi akademik dengan bimbingan one-on-one yang efektif.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Guru Terverifikasi</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Jadwal Fleksibel</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Pembelajaran Personal</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Harga Terjangkau</span>
            </div>
          </div>
          <div className="flex  sm:flex-row gap-4 py-8 text-start">
            <a
              href="#"
              className="px-8 py-3.5 rounded-lg bg-green-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Mulai Sekarang
            </a>
           
          </div>

         
        </div>
      </div>
    </div>



  </section>
</>

  )
}

export default About