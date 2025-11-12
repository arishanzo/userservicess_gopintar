

const Herosection = () => {


  return (
  
<>

  <section className="relative overflow-hidden font-poppins bg-light p-2 md:p-0 text-dark bg-gray-100">

    

    
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-light to-secondary/5 -z-10"></div>

    <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/10 animate-float -z-10"></div>
    <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-secondary/10 animate-float-reverse -z-10"></div>
    <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-primary/15 animate-float -z-10"></div>
    <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-secondary/15 animate-float-reverse -z-10"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  md:pt-16 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="md:text-left ">
          <span className="inline-block px-3 text-start mb-8  py-1 text-xs font-semibold tracking-wider text-gray-800 rounded-full bg-green-150 mb-4">
            Go-Pintar - Solusi Les Privat
          </span>
          <h1 className="text-3xl text-start sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-gray-900 text">Mencari Guru Privat Profesional? Go-Pintar Solusinya. </span>
          </h1>
          <p className="md:text-md text-sm text-justify text-gray-600 mb-8 max-w-lg">
     Kami hadir untuk memudahkan orang tua menemukan guru privat terbaik yang siap datang ke rumah. Dengan pilihan guru terverifikasi dan sistem yang mudah, pendidikan terbaik untuk buah hati Anda kini ada dalam genggaman.
                    </p>
          <div className="flex  sm:flex-row gap-4 text-start">
            <a
              href="#"
              className="px-8 py-3.5 text-sm text-center rounded-lg bg-green-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Gabung Sekarang
            </a>
            <a
              href="#"
              className="px-8 py-3.5 text-center rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:bg-green-50 transition-all duration-300"
            >
              Cari Guru
            </a>
          </div>





          <div className="mt-12 flex items-center justify-center md:justify-start gap-6">
            <div className="flex -space-x-2">
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/12.jpg"
                alt="Client"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Client"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Client"
              />
            </div>
            <div>
              <div className="px-8 mb-2 text-xs font-semibold flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="px-8 text-sm text-gray-600">
               Dipercaya oleh 1000+ siswa dan 100+ guru
              </p>
            </div>
          </div>
        </div>



        {/* image */}

        <div className="relative md:px-16 animate__animated animate__fadeIn hidden  md:flex md:w-auto md:order-1">
             <img
              className="relative w-full h-96 md:h-[550px] object-cover object-top transition-transform duration-500 ease-in-out transform hover:scale-105"
              src="./img/gallery/herosection.png"
              alt="Digital Marketing"
            />
        

          
          <div className="absolute bottom-8 left-4 bg-white px-4 py-3 rounded-lg shadow-lg flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium">1000+ Siswa</span>
          </div>
          <div className="absolute top-12 right-16  bg-white px-4 py-3 rounded-lg shadow-lg">
            <span className="text-sm font-medium">📚 100+ Guru</span>
          </div>
        </div>
      </div>
    </div>



  </section>
</>

  )
}

export default Herosection