import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilGuru from "./form/ProfilGuru";
import ReviewForm from "./form/ReviewForm";
import KalenderJadwal from "./form/KalenderJadwal";
import FomulirBooking from "./form/FomulirBooking";
import { UseGetGuru } from "../../hook/useGetGuru";
import CryptoJS from 'crypto-js';
import Alert from "../components/alert/alert";
import axiosClient from "../../lib/axios";
import toast from "react-hot-toast";


const FormKelas = () => {

  
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Submit");
    
    const secretKey = 'gopintarguru2025';
    const encryptedId = sessionStorage.getItem('selectedGuruId');
    const [showModal, setShowModal] = useState(false);

    let selectedGuruId = null;

    if (encryptedId) {
      const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
      selectedGuruId = bytes.toString(CryptoJS.enc.Utf8);
    }


     const { guru, loading, error } = UseGetGuru();

     const navigate = useNavigate();
     const [currentStep, setCurrentStep] = useState(0);

  const datamentor = Array.isArray(guru) 
    ? guru.find(mentor => mentor.idprofilguru === selectedGuruId)
    : null;
    
    const [formData, setFormData] = useState({
        namamurid: "",
        namawalimurid: "",
        noteleponortu: "",
        catatanalamat: "",
        kelas: "",
        tingkatSekolah: "",
        catatanbooking: "",
        statusbooking: "Belum Mulai"
     });

    const [formTglDataBooking, setFormTglDataBooking] = useState([]);


        const steps = ["Profil Guru Private", "Jadwal", "Formulir" ,  "Review & Submit"];


        const handleRedirectToGuru = () => {
        
        sessionStorage.removeItem('selectedGuruId');
        navigate('/guru');

        };

        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
          
        };


      const nextStep = () => {
        if (
          currentStep === 2 &&
          (
            formData.namamurid === '' ||
            formData.namawalimurid === '' ||
            formData.noteleponortu === '' ||
            formData.catatanalamat === '' ||
            formData.catatanbooking === '' ||
            formData.tingkatSekolah === ''
            ||
            formData.kelas === ''
          )
        ) {
          setShowModal(true);

          return; 
        }


        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } 
      };


        const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
     
        };

        if (loading) {
          return (
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
          );
        }

        if (error) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-red-600">Error: {error}</div>
            </div>
          );
        }

        if (!guru || !Array.isArray(guru) || guru.length === 0) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-gray-600">Data guru tidak ditemukan</div>
            </div>
          );
        }




        
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      dataForm.append(key, val);
    });
    
   if (datamentor?.mapel && datamentor?.bidangngajar) {
    dataForm.append('idprofilguru', datamentor?.idprofilguru); // Gunakan ID yang sudah didekripsi
    dataForm.append('mapeldipilih', datamentor?.mapel);
    dataForm.append('tujuanpembelajaran', datamentor?.bidangngajar);
  }

    setDisabled(true);
    setTextButton("Prosess, mohon tunggu");

    
    const toastLoading = toast.loading("Prosess, Mohon Tunggu...");

    try {
      
     const response = await axiosClient.post("/api/booking", dataForm);

     if(response.data.status === 200){
       // Kirim setiap tanggal booking secara terpisah
       for (const tglData of formTglDataBooking) {
         const tglFormData = new FormData();
         tglFormData.append('idbookingprivate', response.data?.idbookingprivate);
         tglFormData.append('idprofilguru', tglData.idprofilguru);
         tglFormData.append('tglbooking', tglData?.tglbooking);
         tglFormData.append('sesi', tglData?.sesi);
         tglFormData.append('statusngajar', tglData?.statusngajar);
         
         await axiosClient.post("/api/tglbooking", tglFormData);
       }
     }
   
      toast.success("Sukses, Submit berhasil Anda Akan Di Ahlikan Ke Kelas.", {
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
      
    } catch (err) {
      console.error("Ubah Data error:", err);
      setStatus("Erorr, Ubah Data gagal. Silakan coba lagi.");
      setFormData("");
    } finally {
      setDisabled(false);
      setTextButton("Submit");
      setTimeout(() => setStatus(""), 3000);
     
      setTimeout(() => window.location.href = '/kelas', 3000);
      
      toast.dismiss(toastLoading);
    }
  };
    

    return (
        <>

                  
        {/* Step Forms */}
      <form >
          {currentStep === 0 && (<ProfilGuru datamentor={datamentor}/>)}
          {currentStep === 1 && (<KalenderJadwal  setFormTglDataBooking={setFormTglDataBooking} datamentor={datamentor}  formTglDataBooking={formTglDataBooking}/> )}
          {currentStep === 2 && (<FomulirBooking formData={formData} handleChange={handleChange} datamentor={datamentor} />  )}
          {currentStep === 3 && (<ReviewForm formData={formData} formTglDataBooking={formTglDataBooking} datamentor={datamentor} />  )}


           <div className="w-full  bg-white shadow-md rounded-xl p-8">

   

        {/* Progress Bar */}
        <div className="w-full  border  bg-green-100 rounded-full h-2 ">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

           </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
              >
                Previous
              </button>
            )}


          {currentStep === 0 && (
              <button
                type="button"
                onClick={handleRedirectToGuru}
                className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg"
              >
                 Pilih Guru Lain
              </button>
            )}
            
          

          {currentStep === steps.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
              disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''}
                     bg-green-600 text-white px-6 py-2 rounded-lg ml-auto`}
            >
                 {textButton}
              </button>
            ): (

                <button
              type='button'
              onClick={nextStep}
              disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''}
                     bg-green-600 text-white px-6 py-2 rounded-lg ml-auto`}
            >
             Next
            </button>

            )}
                       

          </div>

            {status && 
                                <div 
                                role="alert"
                                className={`text-center mt-4 mb-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }
        </form>
   

   
            {/* Modal Popup */}
            {showModal && (
                <Alert
              type="danger"
              title="Mohon Maaf!"
              message="Form / Jadwal Tanggal tidak boleh kosong. Silakan isi data dengan benar dan lengkap."
              onClose={() => setShowModal(false)}
            />
            )}
        </>
    )
}

export default FormKelas;


           