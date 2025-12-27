const ProfilGuru = ( { datamentor }) => {

    return (

       <div className="pb-8 py-4 via-white to-emerald-50 ">
            
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-start md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-8 text-center">
          Profil Guru Private
        </h2>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-3xl">
          <div className="relative">
            {/* Header gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-r from-green-400 to-emerald-500 opacity-10"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                    <img
                      src={datamentor.foto_profil ? `http://localhost:8000/api/photosuser/${encodeURIComponent(datamentor.foto_profil)}` : 'https://via.placeholder.com/300'}
                      alt="Profile Picture"
                      className="relative w-32 h-32 md:w-48 md:h-48 object-cover rounded-3xl shadow-xl transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 leading-tight">
                    {datamentor.user_guru?.name || ''}
                  </h1>
                  
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6">
                    <span className="text-green-700 font-semibold text-lg">{datamentor?.mapel || ''}</span>
                  </div>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl">
                    {datamentor?.aboutguru || ''}
                  </p>
                  
                  {/* Skills Section */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center lg:justify-start">
                      <span className="w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full mr-3"></span>
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {[datamentor?.skillpertama, datamentor?.skillkedua, datamentor?.skillketiga, datamentor?.skillkeempat]
                        .filter(skill => skill)
                        .map((skill, index) => (
                          <span 
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            {skill}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                  
                  {/* Teaching Field */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center lg:justify-start">
                      <span className="w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full mr-3"></span>
                      Bidang Mengajar
                    </h3>
                    <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-2 border-l-4 border-green-400">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {datamentor?.bidangngajar || ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    )
}

export default ProfilGuru;