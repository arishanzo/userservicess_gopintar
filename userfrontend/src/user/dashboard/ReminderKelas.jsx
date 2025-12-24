import { CheckCircle, Clock, Calendar } from "lucide-react";
import { useState } from "react";
import { UseGetAbsensiGuru } from "../../hook/useGetAbsensiGuru";

const ReminderKelas = ({ booking }) => {

const { absensiGuru } = UseGetAbsensiGuru(booking[0]?.idprofilguru);

  const [kelas, setKelas] = useState([
    {
      id: 1,
      nama: "Pemrograman Web",
      waktu: "08:00 - 09:30",
      ruang: "Lab Komputer 1",
      selesai: false,
    }
  ]);

  const konfirmasiSelesai = (id) => {
    setKelas(
      kelas.map((item) =>
        item.id === id ? { ...item, selesai: true } : item
      )
    );
  };

  return (
    <>
    {absensiGuru.length > 0 && (
 
    <div className=" bg-gradient-to-br from-slate-50 to-green-50 p-6 pb-8">
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent mb-2">
            Konfirmasi Kelas
          </h1>
        </div>

        <div className="grid gap-4">
          {kelas.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] ${
                item.selesai 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100/50' 
                  : 'bg-white/80 border-green-200 hover:shadow-xl hover:shadow-green-100/50'
              } rounded-3xl p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.selesai ? 'bg-green-500' : 'bg-green-500'
                    }`} />
                    <h2 className="text-xl font-bold text-green-800">
                      {item.nama}
                    </h2>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex items-center gap-2 text-green-900">
                      <Clock size={16} className="text-green-500" />
                      <span className="font-medium">{item.waktu}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-900">
                      <Calendar size={16} className="text-green-500" />
                      <span>{item.ruang}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-6">
                  {item.selesai ? (
                    <div className="flex items-center gap-3 bg-blue-100 text-green-700 px-4 py-2 rounded-2xl font-semibold">
                      <CheckCircle size={20} />
                      <span>Selesai</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => konfirmasiSelesai(item.id)}
                      className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Konfirmasi Selesai
                    </button>
                  )}
                </div>
              </div>
              
              <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                item.selesai ? 'from-green-400 to-emerald-400' : 'from-green-400 to-green-400'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default ReminderKelas;