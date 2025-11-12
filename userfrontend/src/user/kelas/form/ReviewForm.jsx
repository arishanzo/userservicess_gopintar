const ReviewForm = ({ formData, formTglDataBooking, datamentor }) => {
  return (
    
    <div className="p-4 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Step 3: Review & Submit</h2>


      <div class="bg-white overflow-hidden grid md:grid-cols-1 mb-8 shadow rounded-lg border">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            User Information
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
        </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Nama Murid
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formData.namamurid || "-"}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Nama Orang Tua / Wali
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formData.namawalimurid || "-"}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    No Telepon
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                     {formData.noteleponortu || "-"}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Alamat Lengkap
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.catatanalamat || "-"}
                </dd>
            </div>

             <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Kelas
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.kelas || "-"}
                </dd>
            </div>

              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Tingkat Sekolah
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.tingkatSekolah || "-"}
                </dd>
            </div>

              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Pelajaran Yang Di Pilih
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {datamentor.mapel || "-"}
                </dd>
            </div>

                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Fokus Untuk
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {datamentor.bidangngajar || "-"}
                </dd>
            </div>

       <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Catatan
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.catatanbooking || "-"}
                </dd>
            </div>
        </dl>
    </div>
    </div>

  <div class="bg-white overflow-hidden py-4 pt-4 grid md:grid-cols-1 shadow rounded-lg border">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
           Jadwal Kelas Terpilih
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Jadwal dan Sesi Kelas yang sudah dipilih.
        </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
             {formTglDataBooking.map((data, index) => (
            <div key={index} class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Tanggal Booking {index + 1} 
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    {data.tglbooking || "-"}  
                </dd>
                 <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    {data.sesi || "-"}  
                </dd>
                
             </div>
             

             
            ))}
           
        </dl>
    </div>
    </div>
   
    
    </div>
  );
};

export default ReviewForm;
