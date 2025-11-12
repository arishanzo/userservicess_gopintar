const ProfilGuru = ( { datamentor }) => {

    return (

       <>
            
      <h2 className="md:text-xl md:pl-24 text-md text-green-700 font-bold mb-4">Profil Guru Private</h2>
              <div class="bg-white py-8 mb-4 border border-gray-100 shadow shadow-md shadow-green-100 rounded-xl transition-all duration-300 animate-fade-in">
        <div class="flex flex-col md:flex-row p-2">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
            <div className="md:pl-20 w-full col-span-1 text-center mb-2">
                <img
                 src={datamentor.foto_profil ? `http://localhost:8000/api/photosuser/${encodeURIComponent(datamentor.foto_profil)}` : 'https://via.placeholder.com/300'}
                alt="Profile Picture"
                className="w-20 h-20 md:w-80 md:h-80 object-cover object-center rounded-xl mx-auto mb-4 transition-transform duration-300 hover:scale-105"
                />
            </div>
           
            </div>
            <div class="md:w-2/3 pl-8 md:pl-40">
              <h1 className="text-xl md:text-4xl font-bold text-green-800 mb-2">
                {datamentor.user_guru?.name || ''}
                </h1>
                <p className="text-gray-600  md:text-xl font-semibold mb-6">{datamentor?.mapel || ''}</p>
                <p class="text-gray-700 text-sm md:text-lg mb-6">
                    {datamentor?.aboutguru || ''}
                </p>
                <h2 class="text-xl font-semibold text-green-800  mb-4">Skills</h2>
                <div class="flex flex-wrap text-sm md:text-lg gap-2 mb-6">
                  
               <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{datamentor?.skillpertama || ''}</span>
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{datamentor?.skillkedua || ''}</span>
                 <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{datamentor?.skillketiga || ''}</span>
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{datamentor?.skillkeempat|| ''}</span>
               </div>

               
                <h2 class="text-xl font-semibold text-green-800  mb-2">Bidang Mengajar</h2>
                <p class="text-gray-700 text-sm md:text-lg mb-6">
                    {datamentor?.bidangngajar || ''}
                </p>
            </div>
        </div>
        </div>
     
</>
    )
}

export default ProfilGuru;