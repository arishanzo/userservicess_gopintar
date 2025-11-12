const PageNonKelas = ( { handleRedirectToGuru }) => {
    return (
        <div className="flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold text-gray-800">Kamu Belum Memiliki Kelas</h1>
    <p className="text-gray-600">Silahkan Pilih Guru Les Private Dulu</p>
    <button
      onClick={handleRedirectToGuru}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
    >
      Pilih Guru
    </button>
  </div>
    )
}   

export default PageNonKelas;