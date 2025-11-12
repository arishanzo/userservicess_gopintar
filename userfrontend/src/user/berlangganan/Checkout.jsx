
import { UseGetOrder } from "../../hook/useGetOrder";
import { useAuth } from "../../context/AuthContext";
import { UseGetProfil } from "../../hook/useGetProfil";
import { useEffect, useState } from "react";
import axiosClient from "../../lib/axios";
import toast from "react-hot-toast";

const Checkout = () => {

    const { user } = useAuth();
    const { result, loading } = UseGetOrder(user?.iduser); 
    const { profil } = UseGetProfil(user?.iduser); 
    
    const [statuspembayaran, setStatuspembayaran] = useState(null);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (!result) return;
        setStatuspembayaran(result.statuspembayaran);
    }, [result]);

    console.log(statuspembayaran)
    useEffect(() => {
        if (!result || statuspembayaran === 'settlement' || statuspembayaran === 'expire') return;

        const fetchOrderDetails = async () => {
            try {
                const response = await axiosClient.get(`api/midtrans/cek-status/${result?.order_id}`);
                const newStatus = response.data?.transaction_status;
                
                if (newStatus && newStatus !== statuspembayaran) {
                    setStatuspembayaran(newStatus);
                    
                    // Update order status in backend
                    try {
                        await axiosClient.put(`api/midtrans/updateStatus/${result.order_id}`, {
                            statuspembayaran: newStatus
                        });
                    } catch (updateError) {
                        console.error("Error updating payment status:", updateError);
                        // Continue even if update fails
                    }

                    if (newStatus === 'settlement') {
                        toast.success("Sukses, Pembayaran Berhasil...", {
                            style: {
                                border: '1px solid #16A34A',
                                background: '#ECFDF5', 
                                color: '#065F46',
                                fontWeight: '500',
                            },
                            iconTheme: {
                                primary: '#16A34A',
                                secondary: '#ECFDF5',
                            },
                        });
                    } else if (newStatus === 'expire') {
                        toast.error("Pembayaran telah kadaluarsa", {
                            style: {
                                border: '1px solid #DC2626',
                                background: '#FEF2F2',
                                color: '#991B1B',
                            },
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
                // Don't show error toast for network issues to avoid spam
            } 
        };

        const interval = setInterval(fetchOrderDetails, 5000);
        return () => clearInterval(interval);
    }, [result, statuspembayaran]);

    useEffect(() => {
        if (statuspembayaran === "settlement" && timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
    }, [statuspembayaran, timer]);

    useEffect(() => {
    if ( timer === 0) {
       window.location.reload();
    }
    }, [timer]);



    return (

        <>
       

    {loading ? (

       <div className="min-h-screen flex items-center justify-center">
 <div className="p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/6"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="mt-8 h-10 bg-gray-200 rounded"></div>
          </div>
            </div>

       ) : (

        

        <div className=" md:pt-24 pt-16 py-8 ">
      
                  <div className="mb-8 ">
        <nav aria-label="breadcrumb ">
          <ol class="flex space-x-2 text-sm md:text-md text-gray-600">
            <li>
              <span class="text-gray-600 font-semibold">
                Status Langanan Anda Masih <span className="bg-yellow-100 p-2 rounded-full text-xs text-gray-900">
                    
                    { statuspembayaran !== "pending" ? 
                        (
                          "Pembayaran Berhasil"
                        ) : (
                          "Belum Bayar"
                    )}
                   
                    
                    </span>
              </span>
            </li>
           
          
          </ol>
        </nav>

        </div>
                
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white rounded-t-2xl md:rounded-2xl md:mb-6">
                    <h1 className="text-3xl font-bold mb-2">Struk Pembayaran</h1>
                    <p className="text-green-100 opacity-80">Silahkan Selesaikan Pembayaran Anda</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Payment Form Section */}
                    <div className="bg-white pt-0 rounded-2xl shadow-xl ">
        
        {result && (
            <div className="bg-white border rounded-lg shadow-lg px-6 max-w-full mx-auto mt-8 py-8 p-4">
                <h1 className="font-bold md:text-3xl lg:text-4xl my-4 text-center text-green-600">GoPintar</h1>
                <hr className="mb-2 py-2"/>
                <div className="flex justify-between mb-6">
                    <h1 className="text-lg font-bold">Invoice</h1>
                    <div className="text-gray-700">
                        <div>Tanggal: {result?.created_at ? new Date(result.created_at).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "numeric", 
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        }) : '-'}</div>
                        <div>Invoice #: {result?.order_id || '-'}</div>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">Tagihan Kepada:</h2>
                    <div className="text-gray-700 mb-2">{user?.nama_user || ''}</div>
                    <div className="text-gray-700 mb-2">{profil?.alamatlengkap || ''}</div>
                    <div className="text-gray-700">{user?.email || ''}</div>
                </div>
                <table className="w-full mb-8">
                    <thead>
                        <tr>
                            <th className="text-left font-bold text-gray-700">Total Pembayaran</th>
                            <th className="text-right font-bold text-gray-700">
                                {result?.jumlahpembayaran ? 
                                    `Rp ${result.jumlahpembayaran.toLocaleString("id-ID")}` : 
                                    'Rp -'
                                }
                            </th>
                        </tr>
                    </thead>
                </table>
                <div className="text-gray-700 text-center mb-2">Thank you for your business!</div>
                <div className="text-gray-700 text-center font-bold text-sm">Lakukan Pembayaran sebelum <br/> {result?.tglberakhirpembayaran || '-'}</div>
              
              {statuspembayaran === "settlement" && (
                   <div className="text-gray-700 text-center font-bold text-sm">
                <p className="text-gray-500">
                Pembayaran Anda Berhasil{" "}
                <span className="font-semibold text-green-600">{timer}</span> detik...
                </p>
                </div>
              )}
             

            </div>
        )}
</div>

                    {/* Payment Detail Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Detail Pembayaran</h2>
                        
                        {result?.metodepembayaran === "qris" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* QRIS Image */}
                                <div className="flex flex-col items-center space-y-4">
                                    <img 
                                        src={result?.qris_url || ''} 
                                        alt="QRIS Code" 
                                        className="w-full max-w-xs h-auto rounded-lg shadow-md"
                                    />
                                    <a
                                        href={result?.qris_url || ''}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download="qris-code.png"
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download QRIS
                                    </a>
                                </div>
                                
                                {/* Payment Instructions */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg text-gray-800">Cara Pembayaran QRIS:</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                        <li>Buka aplikasi e-wallet atau mobile banking</li>
                                        <li>Pilih menu Scan QR atau QRIS</li>
                                        <li>Arahkan kamera ke kode QR di samping</li>
                                        <li>Masukkan nominal pembayaran</li>
                                        <li>Konfirmasi pembayaran</li>
                                    </ol>
                                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Penting:</strong> Pastikan nominal yang dibayar sesuai dengan tagihan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Bank Transfer */}
                        {result?.metodepembayaran === "bank_transfer" && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-gray-800">Cara Pembayaran Virtual Account:</h3>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="font-semibold text-blue-800">Nomor Virtual Account: {result?.va_number || '-'}</p>
                                </div>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Buka aplikasi mobile banking {result?.bank.toUpperCase() || ''} atau ATM {result?.bank.toUpperCase() || ''}</li>
                                    <li>Pilih menu Transfer atau Bayar</li>
                                    <li>Pilih Virtual Account atau VA</li>
                                    <li>Masukkan nomor VA di atas</li>
                                    <li>Konfirmasi nominal dan lakukan pembayaran</li>
                                    
                                </ol>
                            </div>
                        )}

                        {/* GoPay */}
                        {result?.metodepembayaran === "gopay" && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-gray-800">Cara Pembayaran GoPay:</h3>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                     
                                    <p className="font-semibold text-blue-800">Bayar dengan {result.metodepembayaran.toUpperCase() || ''}</p>
                                       <a
                                        href={result.redirect_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Klik di sini untuk lanjut ke {result.metodepembayaran}
                                    </a>
                                </div>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Buka aplikasi Gojek</li>
                                    <li>Pastikan saldo GoPay mencukupi</li>
                                    <li>Klik notifikasi pembayaran yang muncul</li>
                                    <li>Atau masuk ke menu GoPay - Riwayat</li>
                                    <li>Konfirmasi pembayaran dengan PIN GoPay</li>
                                </ol>
                                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Penting:</strong> Pastikan nominal yang dibayar sesuai dengan tagihan
                                        </p>
                                    </div>
                            </div>
                        )}

                        {/* ShopeePay */}
                        {result?.metodepembayaran === "shopeepay" && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-gray-800">Cara Pembayaran ShopeePay:</h3>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                     
                                    <p className="font-semibold text-blue-800">Bayar dengan {result.metodepembayaran.toUpperCase() || ''}</p>
                                       <a
                                        href={result.redirect_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Klik di sini untuk lanjut ke {result.pmetodepembayaran}
                                    </a>
                                </div>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Buka aplikasi Shopee</li>
                                    <li>Masuk ke menu ShopeePay</li>
                                    <li>Pastikan saldo ShopeePay mencukupi</li>
                                    <li>Cari transaksi pending di riwayat</li>
                                    <li>Konfirmasi pembayaran dengan PIN ShopeePay</li>
                                </ol>
                                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Penting:</strong> Pastikan nominal yang dibayar sesuai dengan tagihan
                                        </p>
                                    </div>
                            </div>
                        )}

                        {/* Dana */}
                        {result?.metodepembayaran === "dana" && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-gray-800">Cara Pembayaran DANA:</h3>
                                   <div className="bg-blue-50 p-4 rounded-lg">
                                     
                                    <p className="font-semibold text-blue-800">Bayar dengan {result.metodepembayaran.toUpperCase() || ''}</p>
                                       <a
                                        href={result.redirect_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Klik di sini untuk lanjut ke {result.pmetodepembayaran}
                                    </a>
                                </div>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Buka aplikasi DANA</li>
                                    <li>Pastikan saldo DANA mencukupi</li>
                                    <li>Cek notifikasi pembayaran</li>
                                    <li>Atau masuk ke menu Riwayat Transaksi</li>
                                    <li>Konfirmasi pembayaran dengan PIN DANA</li>
                                </ol>
                                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Penting:</strong> Pastikan nominal yang dibayar sesuai dengan tagihan
                                        </p>
                                    </div>
                            </div>
                        )}

                        {/* Credit Card */}
                        {result?.metodepembayaran === "credit_card" && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-gray-800">Cara Pembayaran Kartu Kredit:</h3>
                                   <div className="bg-blue-50 p-4 rounded-lg">
                                     
                                    <p className="font-semibold text-blue-800">Bayar dengan {result.metodepembayaran.toUpperCase() || ''}</p>
                                       <a
                                        href={result.redirect_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Klik di sini untuk lanjut ke {result.pmetodepembayaran}
                                    </a>
                                </div>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Masukkan nomor kartu kredit</li>
                                    <li>Isi tanggal expired (MM/YY)</li>
                                    <li>Masukkan CVV (3 digit di belakang kartu)</li>
                                    <li>Isi nama pemegang kartu</li>
                                    <li>Klik bayar dan masukkan OTP jika diminta</li>
                                </ol>
                            </div>
                        )}

                        {/* Indomaret */}
                        {result?.metodepembayaran === "cstore" && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-gray-800">Cara Pembayaran di Indomaret:</h3>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="font-semibold text-red-800">Kode Pembayaran: {result?.payment_code || '-'}</p>
                                </div>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Datang ke {result?.store.toUpperCase() || ''} terdekat</li>
                                    <li>Berikan kode pembayaran di atas ke kasir</li>
                                    <li>Kasir akan memproses pembayaran</li>
                                    <li>Bayar sesuai nominal yang tertera</li>
                                    <li>Simpan struk sebagai bukti pembayaran</li>
                                </ol>
                                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Penting:</strong> Pastikan nominal yang dibayar sesuai dengan tagihan
                                        </p>
                                    </div>
                            </div>
                        )}

                      

                     
                    </div>
                    
                
                </div>
        </div>
       
      )
       
       }


         </>

    )
}   

export default Checkout;
