import { Star, UserCircle2 } from "lucide-react";
import { UseGetRatingGuru } from "../../hook/useGetRatingGuru";
import RatingGuruSkeleton from "./RatingGuruSkeleton";
import { UseGetProfil } from "../../hook/useGetProfil";
import { useAuth } from "../../context/AuthContext";

const RatingGuru = ({ datamentor }) => {
  const { ratingGuru, loading} = UseGetRatingGuru()
  
   const { user } = useAuth();
  const { profil }  = UseGetProfil(user?.iduser)
  

const options = { day: "numeric", month: "long", year: "numeric" };

 

  console.log(ratingGuru)
 
  const testimonials = ratingGuru?.filter((i) => i?.idprofilguru === datamentor?.idprofilguru)

  return (
    <section className="w-full px-6 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">⭐ Rating Murid ke Guru</h2>
        <p className="ml-6text-gray-500 py-4">Penilaian siswa terhadap guru mereka</p>
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

                <p className="text-xs text-gray-500">{item.booking.tujuanpembelajaran}</p>
                
                <p className="text-xs text-gray-400 py-1">{new Date(item.booking.updated_at).toLocaleDateString("id-ID", options)}</p>
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

         
            </div>
          ))}
          
      </div>
    </section>
  );
};

export default RatingGuru;
