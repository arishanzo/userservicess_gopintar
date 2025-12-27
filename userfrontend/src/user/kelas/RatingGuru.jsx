import { Star, UserCircle2, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { UseGetRatingGuru } from "../../hook/useGetRatingGuru";
import RatingGuruSkeleton from "./RatingGuruSkeleton";
import { UseGetProfil } from "../../hook/useGetProfil";
import { useAuth } from "../../context/AuthContext";

const RatingGuru = ({ datamentor }) => {
  const { ratingGuru, loading} = UseGetRatingGuru()
  
   const { user } = useAuth();
  const { profil }  = UseGetProfil(user?.iduser)
  

const options = { day: "numeric", month: "long", year: "numeric" };

  const [selectedReply, setSelectedReply] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (id) => {
    setSelectedReply(selectedReply === id ? null : id);
    setReplyText("");
  };

  const handleSendReply = (id) => {
    if (replyText.trim()) {
      console.log(`Balasan untuk ID ${id}: ${replyText}`);
      setSelectedReply(null);
      setReplyText("");
    }
  };

  console.log(ratingGuru)
 
  const testimonials = ratingGuru?.filter((i) => i?.idprofilguru === datamentor?.idprofilguru)

  return (
    <section className="w-full px-6 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">⭐ Rating Murid ke Guru</h2>
        <p className="text-gray-500">Penilaian siswa terhadap guru mereka</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <RatingGuruSkeleton key={i} />
            ))
          :
          testimonials.map((item) => (
          <div
            key={item.idratingguru}
            className="relative bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-all duration-200 w-80 flex-shrink-0"
          >
            {/* Header Card */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <UserCircle2 className="w-7 h-7 text-green-600" />  <img
              className="h-12 w-12 rounded-full object-cover"
              src={`${import.meta.env.VITE_API_URL}/api/photos/${encodeURIComponent(profil?.foto_profil)}`
                  
              }
              alt="Profile"
            />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{item.booking.namawalimurid}</h2>

                <p className="text-sm text-gray-500">{item.booking.tujuanpembelajaran}</p>
                
                <p className="text-sm text-gray-500">{new Date(item.booking.updated_at).toLocaleDateString("id-ID", options)}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < item.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Pesan */}
            <p className="text-gray-700 italic leading-relaxed mb-4">
              “{item.comment}”
            </p>

            {/* Tombol Balas */}
            <button
              onClick={() => handleReply(item.id)}
              className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition"
            >
              <MessageSquare className="w-4 h-4" />
              {selectedReply === item.id ? "Batal Balas" : "Balas Admin"}
            </button>

            {/* Form Balas */}
            {selectedReply === item.id && (
              <div className="mt-3 bg-gray-50 p-3 rounded-xl border space-y-3 animate-fadeIn">
                <textarea
                  rows="3"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tulis balasan Anda..."
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSendReply(item.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                  >
                    <Send className="w-4 h-4" /> Kirim Balasan
                  </button>
                </div>
              </div>
            )}
            </div>
          ))}
          
      </div>
    </section>
  );
};

export default RatingGuru;
