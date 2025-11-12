import { MapContainer, TileLayer, Marker,  useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";


function FlyToUser({ lokasi }) {
  const map = useMap();

  useEffect(() => {
    if (lokasi) {
      map.flyTo([lokasi.lat, lokasi.lng], 15, {
        animate: true,
        duration: 2, // detik animasi
      });
    }
  }, [lokasi, map]);

  return null;
}


const FomulirBooking = ( { formData, handleChange, datamentor}) => {

 const [lokasi, setLokasi] = useState();

  
  useEffect(() => {
    if (!lokasi && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLokasi(coords);
          formData.catatanalamat = `Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)}`;
        },
        (err) => {
          alert("Izinkan akses lokasi untuk mendapatkan fitur ini.");
          console.error("Gagal ambil lokasi:", err);
        }
      );
    }
  }, [lokasi]);
 
    return (

            <div className="max-full mx-auto mb-8">
        <header className="mb-6">
            <h1 className="text-2xl md:text-xl text-green-800 font-bold">Fomulir Booking</h1>
            <p className="text-sm text-slate-600">Isi Fomulir Dengan Data Yang Benar Pastikan Fomulit Disi Semua.</p>
        </header>
         <section className="bg-white border rounded-lg p-4 shadow-sm">
    
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm">
                <span>Nama Siswa / Nama Anak</span>
                <input name="namamurid" value={formData.namamurid} onChange={handleChange} className="mt-1 w-full border rounded p-2" placeholder="Nama siswa / wali" />
              </label>

                    <label className="text-sm">
                <span>Nama Orangtua / Wali Murid</span>
                <input name="namawalimurid" value={formData.namawalimurid} onChange={handleChange} type="text" className="mt-1 w-full border rounded p-2" placeholder="Nama Wali Atau Orang Tua" />
              </label>

              

              <label className="text-sm">
                <span>No Telepon</span>
                <input name="noteleponortu" value={formData.noteleponortu} onChange={handleChange} className="mt-1 w-full border rounded p-2" placeholder="Masukan No Telepon 0812xxxx" />
              </label>

            <label className="text-sm pb-4">
                <span>Alamat Lengkap</span>

         <MapContainer
  center={[-6.2, 106.8]} // posisi default (misalnya Jakarta)
  zoom={13}
  style={{ height: "400px" }}
  className="z-20 mb-2 rounded-lg border"
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  {lokasi && <Marker position={[lokasi.lat, lokasi.lng]} />}
  <FlyToUser lokasi={lokasi} />
</MapContainer>
              { lokasi && (
                <p className="text-xs text-gray-500 mt-1">Lokasi Anda: Lat {lokasi.lat.toFixed(4)}, Lng {lokasi.lng.toFixed(4)}</p>
              )}
                <input name="catatanalamat" value={formData.catatanalamat} onChange={handleChange} className="mt-1 w-full border rounded p-2" placeholder="(Note: Nama Gedung / RT, RW, Gang, dll)" />
                 </label>



              <div className="grid grid-cols-2 gap-2">

                 <label className="text-sm">
                <span>Kelas</span>
                <input name="kelas" required value={formData.kelas} onChange={handleChange} className="mt-1 w-full border rounded p-2" placeholder="Kelas Siswa" />
                 </label>

            <label className="text-sm">
                  <span>Tingkat Sekolah</span>
                  <select name="tingkatSekolah" required value={formData.tingkatsekolah} onChange={handleChange} className="mt-1 w-full border rounded p-2">
                    <option value='SD'>SD</option>
                    <option>SMP</option>
                    <option>SMA/SMK</option>
                  </select>
                </label>

            </div>
        
        

              <div className="grid grid-cols-2 gap-2">
               <label className="text-sm">
                <span>Pelajaran Yang Di Pilih</span>
                <input name="mapeldipilih" required readOnly value={datamentor.mapel} onChange={handleChange} className="mt-1 w-full border rounded p-2" />
              </label>

                <label className="text-sm">
                  <span>Fokus Untuk</span>
                  <input name="tujuanpembelajaran" required readOnly value={datamentor.bidangngajar} onChange={handleChange} className="mt-1 w-full border rounded p-2" />
                </label>

              </div>

              <label className="text-sm">
                <span>Catatan (opsional)</span>
                <textarea name="catatanbooking" required value={formData.catatanbooking} onChange={handleChange} className="mt-1 w-full border rounded p-2" rows={3} placeholder="Detail Alamat (Note: Nama Gedung / RT, RW, Gang, dll)" ></textarea>
              </label>

            </div>
       
        </section>
        </div>
    )

    
}

export default FomulirBooking;