import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

const CardLangganan = () => {
    const navigate = useNavigate();
    
    return (
        <div className=" md:pt-24 pt-16 py-16  ">
            <div className='py-4'>
                <h2 className="text-2xl font-bold text-center sm:text-4xl">Paket Berlangganan</h2>
                <p className="max-w-3xl mx-auto text-xs md:text-xl py-2 text-center">Pilih paket yang sesuai untuk pembelajaran anak Anda</p>
            </div>
            
            <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="relative border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                    <div className="flex-1 h-96 md:h-full">
                        <DotLottieReact
                            src="https://lottie.host/9e33d5c6-ff1e-4897-8069-ed63546f8e6d/k5fkgTOyUR.lottie"
                            loop
                            autoplay
                        />
                    </div>
                </div>
                
                <div className="p-8 border border-gray-200 rounded-2xl shadow-sm ">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold">Premium</h3>
                        <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                            Terpopuler
                        </p>
                        <p className="mt-4 flex items-baseline">
                            <span className="text-5xl font-extrabold tracking-tight">Rp355.000</span>
                            <span className="ml-1 text-xl font-semibold">/ 15 Pertemuan</span>
                        </p>
                        <p className="mt-6">Untuk pembelajaran optimal anak</p>
                        <ul role="list" className="mt-6 space-y-6">
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3">Memantau Pembelajaran Anak</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3">Absensi Otomatis, Apabila Tidak Bisa Hadir</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3">Terdapat Tugas, Untuk Mengukur Kemampuan Anak</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3">Rekap Nilai Untuk Mengetahui Perkembangan Anak</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3">Dukungan Admin 1x24 Jam Apabila Ada Masalah Aplikasi atau Les Private</span>
                            </li>
                        </ul>
                    </div>
                    <button
                        className="bg-emerald-500 text-white hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                        onClick={() => navigate('/berlangganan/form')}>
                        Berlangganan Sekarang
                    </button>
                </div>
            </div>
        </div> 
    )
}

export default CardLangganan;