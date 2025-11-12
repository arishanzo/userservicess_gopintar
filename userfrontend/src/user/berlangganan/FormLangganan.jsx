import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { UseGetProfil } from "../../hook/useGetProfil";
import { useAuth } from "../../context/AuthContext";
import { getDataBank } from "../../lib/data/getDataBank";
import { getDataPayment } from "../../lib/data/getDataPayment";
import axiosClient from "../../lib/axios";
import toast from "react-hot-toast";
import { UseGetOrder } from "../../hook/useGetOrder";

const FormLangganan = () => {

      const { user } = useAuth();
      const { profil, loading} = UseGetProfil(user?.iduser);
      const { result } = UseGetOrder(user?.iduser);


        const databank = getDataBank();
        const datapayment = getDataPayment();

        const namapaket = 'Paket Berlangganan 1 Bulan'

  
          const [method, setMethod] = useState("");
          const [bank, setBank] = useState("");
          const [amount, setAmount] = useState(355000);

          const [tax, setTax] = useState(0);

          const total = amount + (amount * tax / 100);

            const [disabled, setDisabled] = useState(false);
           const [textButton, setTextButton] = useState('Bayar Sekarang');

      useEffect(() => {
        if (method === "qris") {
          setTax(0.7);
        } else if (method === "dana") {
          setTax(1.5);
        } else if (method === 'shopeepay'){
          setTax(2);
        } else if (method === 'gopay'){
          setTax(2);
        } else if (method === 'credit_card'){
          setTax(5);
        } else if (method === 'cstore_indomaret'){
          setTax(1);
        } else if (method === 'cstore_alfamart'){
          setTax(0.5);
        }
        else {
          setTax(0);
        }
      }, [method, total]);


   const handleSubmit = async (e) => {

    e.preventDefault();

    if (!method) {
      alert("Pilih metode pembayaran!");
      return;
    }
    
    const toastLoading = toast.loading("Prosess Pembuatan Pesanan...");
    
    try {
       
    setDisabled(true);
    setTextButton("Prosess");

     await axiosClient.post("/api/midtrans/charge", {
        total,
        method,
        namapaket,
        bank
      });

     toast.success("Pemesanan Berhasil Di Buat..", {
          duration: 3000, // durasi toast (ms)
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

        setTimeout(() => {
        window.location.href = '/berlangganan';
      }, 5000); // delay sesuai durasi toast
     
    } catch (err) {
      console.error(err);
      setDisabled(false);
      setTextButton("Bayar Sekarang");
    }finally {
      toast.dismiss(toastLoading);
      setDisabled(false)
      setTextButton("Bayar Sekarang");
    }
  };

  
    useEffect(() => {
     if (!result) return;
    
      if (result && result.order_id) {
        window.location.href = '/berlangganan';
      }


    }, [result]);



    return (

        <>
 <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
   
    <div className="flex-1  py-24 top-0 min-h-screen w-[80%]">
          

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

         // Main content area 
         <div className="w-full h-full  flex items-center justify-start md:px-12 px-2  md:pt-8 ">
        <section class="bg-gray-50  px-6 w-full">
      
  <div class="max-w-6xl border-t border-gray-200 py-4  bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
    
    
 
    <div class="p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
      <div class="space-y-5">

         <div class="flex gap-4">
          <div class="w-1/2">
            <label class="block mb-1 text-sm text-gray-600">Nama Wali Murid</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"> {user?.nama_user || ''}</p>
               </div>
          <div class="w-1/2">
             <label class="block mb-1 text-sm text-gray-600">No HP</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">{profil?.no_telp || ''}</p>
         </div>
        </div>

          <div class="flex gap-4">
          <div class="w-1/2">
                     <label class="block mb-1 text-sm text-gray-600">Nama Anak</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"> {profil?.nama_anak || ''}</p>
          </div>
          <div class="w-1/2">
              <label class="block mb-1 text-sm text-gray-600">Usia Anak</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"> {profil?.usia_anak || ''}</p>
     </div>
        </div>

        <div>
          <label class="block mb-1 text-sm text-gray-600">Email</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"> {user?.email || '' }</p>
        </div>
        
           </div>

           
        <hr className="pt-8 border-t border-gray-200 space-y-2" />
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
       <h1 className="text-lg font-semibold text-green-800 mb-2">Catatan Penting:</h1>
       <ul className="text-xs text-green-700 space-y-1">
         <li>• Berlangganan akan aktif setelah pembayaran berhasil</li>
         <li>• Akses premium berlaku untuk 1 anak sesuai data profil</li>
         <li>• Pembayaran akan diperpanjang otomatis setiap bulan</li>
         <li>• Hubungi customer service untuk bantuan teknis</li>
       </ul>
     </div>
      
      
    </div>

           {/* Hasil transaksi */}
            <form onSubmit={handleSubmit} className="space-y-4">
    <div class="bg-gray-50 p-8 border-l border-gray-200">
      <h3 class="text-xl font-semibold text-gray-700 mb-6">Choose Payment Method</h3>

      <div class="space-y-4">
      
      {/* Metode Pembayaran */}
<div>
  <label className="block mb-2 font-semibold text-lg">Metode Pembayaran</label>

 
      <div className="py-4">
         <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="text-sm">-- pilih metode --</option>
            {datapayment.map((m) => (
              <option key={m.id} value={m.value}>
                {m.judul}
              </option>
            ))}
          </select>
      </div>

        {/* Bank VA (hanya muncul kalau pilih VA) */}
        {method === "bank_transfer" && (
          <div>
            <label className="block mb-1 font-medium">Pilih Bank</label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- pilih bank --</option>
              {databank.map((b) => (
                <option key={b.id} value={b.value}>
                  {b.judul}
                </option>
              ))}
            </select>
          </div>
        )}

</div>
    

      <div class="mt-10 border-t pt-6">
        <h4 class="text-gray-700 font-semibold mb-2">Total Pembayaran</h4>
        <div class="flex justify-between text-gray-600">
          <span>Harga Langganan</span>
           <input
           readOnly
           disabled
            value={amount.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
            onChange={(e) => setAmount(e.target.value)}
            className=" text-end  py-2"
          />
        </div>
        <div class="flex justify-between text-gray-600 mt-1">
          <span>Biaya Admin</span>
          
          {tax} %
        </div>
        <div class="flex justify-between text-lg font-bold text-gray-800 mt-4">
          <span>Total</span>
         <span>{total.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}</span>
        </div>

         <button
         type="submit" 
         disabled={disabled}
           className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide text-sm font-semibold bg-green-700 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>                 
         
                      {textButton}
            </button>
  
      </div>
      </div>
      </div>
        </form>
   
      
   
    </div>

</section>
        </div>


       )
       
       }

</div>
</div>
         </>


  
    )
}

export default FormLangganan;