

const Testimoni = () => {

    
  const data = [
    { 
      id: 1, 
      nama: 'Sarah Putri',
      profesi: 'Siswa SMA Kelas 12',
      testimoni: 'Guru les privat di Go-Pintar sangat sabar dan metode mengajarnya mudah dipahami. Nilai matematika saya meningkat dari 70 menjadi 90 dalam 3 bulan!',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    { 
      id: 2, 
      nama: 'Ahmad Rizki',
      profesi: 'Siswa SMP Kelas 9',
      testimoni: 'Belajar fisika jadi lebih menyenangkan dengan guru Go-Pintar. Sekarang saya tidak takut lagi dengan pelajaran sains dan siap menghadapi UN.',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    { 
      id: 3, 
      nama: 'Ibu Sari',
      profesi: 'Orang Tua Siswa',
      testimoni: 'Pelayanan Go-Pintar sangat memuaskan. Guru datang tepat waktu, profesional, dan anak saya jadi lebih percaya diri dalam belajar.',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg'
    },
  ];

  return (
  
<>
<div className="container bg-green-100 relative z-40 mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <div class="text-center">
                <p class="text-lg font-medium text-gray-600 font-pj">1000+ Murid Puas Dengan Privat Kami</p>
                <h2 class="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">Apa Kata Murid Tentang Privat Kami</h2>
            </div>

            </div>

      <div class="relative grid max-w-7xl grid-cols-1 gap-6 mx-auto md:max-w-7xl md:pt-16 lg:gap-10 md:grid-cols-3">
        {data.map((item) => (
             <div key={item.id} class="flex flex-col overflow-hidden shadow-xl">
                        <div class="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                            <div class="flex-1">
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg class="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg class="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg class="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg class="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                </div>

                                <blockquote class="flex-1 mt-8">
                                    <p class="text-lg leading-relaxed text-gray-900 font-pj">{item.testimoni}</p>
                                </blockquote>
                            </div>

                            <div class="flex items-center mt-8">
                                <img class="flex-shrink-0 object-cover rounded-full w-11 h-11" src={item.avatar} alt="" />
                                <div class="ml-4">
                                    <p class="text-base font-bold text-gray-900 font-pj">{item.nama}</p>
                                    <p class="mt-0.5 text-sm font-pj text-gray-600">{item.profesi}</p>
                                </div>
                            </div>
                        </div>
                    </div>
        ))}  

    </div>

</div>
</>

  )
}

export default Testimoni;