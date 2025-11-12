import { useAuth } from "../../context/AuthContext";
import { useEffect, useState} from "react";
import axiosClient from "../../lib/axios";
import { useWilayah } from "../../hook/useWilayah";
import { UseGetProfil } from "../../hook/useGetProfil";
import { useGetWilayah } from "../../hook/useGetWilayah";
import { getFetchCache } from "../../lib/fetchCahce/getFetchCache";


const FormProfil = () => {
  const { user } = useAuth();

  

   const [preview, setPreview] = useState("https://github.com/gaearon.png");
  //   const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPreview(URL.createObjectURL(file)); // bikin preview dari file lokal
  //   }
  // };

  
// set wilayah
const {
    provinsi, setProvinsi, listProvinsi,
    kabupaten, setKabupaten, listKabupaten,
    kecamatan, setKecamatan, listKecamatan,
    kelurahan, setKelurahan, listKelurahan,
  } = useWilayah();


  // ambil data profil per id
  const { profil, loading , error } = UseGetProfil(user?.iduser);
  

  const { getprovinsi, getkabupaten, getkecamatan, getkelurahan } = useGetWilayah(profil?.provinsi, profil?.kabupaten, profil?.kecamatan, profil?.kelurahan);

useEffect(() => {
  if (profil?.foto_profil) {
       getFetchCache (() => axiosClient.get(`/api/photos/${encodeURIComponent(profil.foto_profil)}`, { responseType: 'blob' }))
       .then(res => {
        const url = URL.createObjectURL(res.data);
        setPreview(url);
      })
      .catch(err => console.error(err));
  }
}, [profil]);
  

// form

const [formData, setFormData] = useState({
  namauser: "",
  alamatlengkap: "",
  no_telp: "",
  kelurahan: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
  kode_pos: "",
  nama_anak: "",
  usia_anak: "",
});

const [newPhoto, setNewPhoto] = useState(null);

useEffect(() => {
  if (profil) {
    setFormData((prev) => ({
      ...prev,
      namauser: profil.namauser || "",
      alamatlengkap: profil.alamatlengkap || "",
      no_telp: profil.no_telp || "",
      kelurahan: profil.kelurahan || "",
      kecamatan: profil.kecamatan || "",
      kabupaten: profil.kabupaten || "",
      provinsi: profil.provinsi || "",
      kode_pos: profil.kode_pos || "",
      nama_anak: profil.nama_anak || "",
      usia_anak: profil.usia_anak || "",
    }));

    setProvinsi(profil.provinsi || "");
    setKabupaten(profil.kabupaten || "");
    setKecamatan(profil.kecamatan || "");
    setKelurahan(profil.kelurahan || "");
  }
}, [profil]);


  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Simpan Perubahan");


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setNewPhoto(file);
        }
    };

    const handleChange = (e) => {
     
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      dataForm.append(key, val);
    });
    
    if (newPhoto) {
      dataForm.append('foto_profil', newPhoto);
    }
  
    setDisabled(true);
    setTextButton("Prosess");
    setErrors({}); // reset

    try {
      
    
    const response = await axiosClient.post("/api/profile", dataForm);
   

      console.log("Form response:", response.data);
      setStatus("Ubah Data berhasil.");

      
    } catch (err) {
      console.error("Ubah Data error:", err);
      const data = err.response?.data || {};
      setErrors(data.errors || { general: [data.message || "Ubah Data gagal."] });
      setStatus("Ubah Data gagal. Silakan coba lagi.");
      setFormData("");
    } finally {
      setDisabled(false);
      setTextButton("Simpan Perubahan");
      setTimeout(() => setStatus(""), 3000);
      setTimeout(() => window.location.reload(), 3000);
    }
  };







     // Ambil provinsi saat pertama kali render

  if (loading || !user) 
  return  <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>;

 if (error) return (
  <p style={{ color: "red" }}>
    {typeof error === "string" ? error : error.message || "Error"}
  </p>
);
     
    return (
        <>

         {/* Profile Header */}
         
    
 <form  onSubmit={handleSubmit}>
              <div className="flex items-center space-x-6 p-8">
                <div className="relative">
                  <img
                    className="h-24 w-24 rounded-full object-cover"
                     src={preview}
                    alt="Profile"
                  />
                  <label className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-2 hover:bg-green-700 cursor-pointer">
                    <input 
                    type="file" 
                    name="foto_profil" 
                    accept="image/*"  
                    onChange={handleFileChange} 
                    className="hidden" />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </label>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user?.nama_user || "Guest"}</h2>
                  <p className="text-gray-600">Student Premium</p>
                  <div className="flex items-center mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified
                    </span>
                  </div>

                  
                   {errors?.foto_profil?.[0] && <small style={{color: 'red'}}>{errors.foto_profil[0]}</small>}
                </div>
              </div>

                   {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }




<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8">

        <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan nama lengkap"
                    value={user?.nama_user || formData.namauser}
                   onChange={handleChange}
                   readOnly
                  />
                </div>

             <div className="col-span-2 md:col-span-1 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={user?.email || "Guest"}
                    className="w-full px-4 bg-gray-100 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan email"
                    readOnly
                  />
                </div>

              <div className="col-span-2 md:col-span-1   mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                  <input 
                    type="tel" 
                    name="no_telp"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan nomor telepon"
                   value={formData.no_telp}
                   onChange={handleChange}
                   
                  />

                   {errors?.no_telp?.[0] && <small style={{color: 'red'}}>{errors.no_telp[0]}</small>}

                </div>



              <div className=" col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                  <select 
                  name="provinsi"
                  value={provinsi}
                  onChange={(e) => { setProvinsi(e.target.value); handleChange(e)}}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                     <option value="">{profil?.provinsi && getprovinsi?.name ? getprovinsi.name : 'Pilih Provinsi'}</option>
                        {listProvinsi.map((prov) => (
                            <option key={prov.id} value={prov.id}>
                            {prov.name}
                            </option>
                        ))}
                        </select>

                        
                </div>

                <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kabupaten/Kota</label>
                  <select 
                   name="kabupaten"
                   value={kabupaten}
                    onChange={(e) => {profil?.kabupaten && getkabupaten?.name ? setKabupaten(getkabupaten.name) : setKabupaten(e.target.value); handleChange(e)}}
                    disabled={ !provinsi}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                     <option value="">{profil?.kabupaten && getkabupaten?.name ? getkabupaten.name : 'Pilih Kabupaten'}</option>
                    {listKabupaten.map((kab) => (
                        <option key={kab.id} value={kab.id}>
                        {kab.name}
                        </option>
                    ))}
                  </select>
                </div>

         <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
                  <select 
                     name="kecamatan"
                     value={kecamatan}
                    onChange={(e) => {setKecamatan(e.target.value); handleChange(e)}}
                    disabled={!kabupaten}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">{profil?.kecamatan && getkecamatan?.name ? getkecamatan.name : 'Pilih Kecamatan'}</option>
                    {listKecamatan.map((kec) => (
                        <option key={kec.id} value={kec.id}>
                        {kec.name}
                        </option>
                    ))}
                  </select>
                </div>



               <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kelurahan</label>
                  <select 
                     name="kelurahan"
                     value={kelurahan}
                    onChange={(e) => {setKelurahan(e.target.value); handleChange(e)}}
                    disabled={!kecamatan}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">{profil?.kelurahan && getkelurahan?.name ? getkelurahan.name : 'Pilih Kelurahan'}</option>
                    {listKelurahan.map((kel) => (
                        <option key={kel.id} value={kel.id}>
                        {kel.name}
                        </option>
                    ))}
                  </select>
                </div>

             <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                  <input 
                    name="kode_pos"
                    value={formData.kode_pos}
                    onChange={handleChange}
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan kode Pos"
                  />

                    {errors?.kode_pos?.[0] && <small style={{color: 'red'}}>{errors.kode_pos[0]}</small>}

                </div>

                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Anak</label>
                  <input 
                    name="nama_anak"
                    value={formData.nama_anak}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan nama anak"
                  />
                    {errors?.nama_anak?.[0] && <small style={{color: 'red'}}>{errors.nama_anak[0]}</small>}

                </div>
              
             <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usia Anak</label>
                  <input 
                    name="usia_anak"
                    value={formData.usia_anak}
                    onChange={handleChange}
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Masukkan usia anak"
                  />

                    {errors?.usia_anak?.[0] && <small style={{color: 'red'}}>{errors.usia_anak[0]}</small>}

                </div>
              
                
                <div className="col-span-2 ">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                  <textarea 
                    name="alamatlengkap"
                    value={formData.alamatlengkap}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    rows="3"
                    placeholder="Masukkan alamat lengkap"
                  ></textarea>

                    {errors?.alamatlengkap?.[0] && <small style={{color: 'red'}}>{errors.alamatlengkap[0]}</small>}

                </div>
         

              {/* Action Buttons */}
              <div className="flex space-x-4 py-2">
             
                <button
               
                type="submit"

                disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide text-sm font-semibold bg-green-700 text-white w-[50%] py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>                 
                     
                     {textButton}
                </button>
              </div>


              </div>
         </form>
         </>
    )
}

export default FormProfil;