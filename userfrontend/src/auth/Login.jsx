
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import UsePageLoading from "../hook/usePageLoading";
import { ArrowLeftIcon } from "lucide-react";

const Login = () => {
  const { pageLoading } = UsePageLoading();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email_user: "",
    password_user: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Sign In");

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setTextButton("Sedang Masuk…");
    setErrors({}); // reset

    try {
      // 1) ambil CSRF cookie
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/api/login", formData);
    
      const userResponse = await axiosClient.get("/api/user");
      await login(userResponse.data);
      
      setStatus("Login berhasil. Mengalihkan ke dashboard...");

       const profil = await  axiosClient.get(`/api/profile/${userResponse.data?.iduser}`);
      
      localStorage.setItem("photoprofil", profil.data.data?.foto_profil);

      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
   
      
    } catch (err) {
      const data = err.response?.data || {};
      setErrors(data.errors || { general: [data.message || "Login gagal."] });
      setStatus("Login gagal. Silakan coba lagi.");
    } finally {
      setDisabled(false);
      setTextButton("Sign In");
      setTimeout(() => setStatus(""), 3000);
    }
  };


    if (pageLoading) {
    return   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-greem-50 to-green-100">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent animate-pulse">
                    Go-Pintar
                </h2>
                <p className="text-gray-600 mt-2 animate-pulse">Memuat...</p>
            </div>
        </div>
    }

    return (
       
   <>
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
    <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">

      {/* LEFT - FORM */}
      <div className="p-8 md:p-12 flex flex-col justify-center">

        {/* LOGO */}
        <img
          src="./img/logo/logogopintar.png"
          className="mx-auto h-40 mb-4"
          alt="Logo Go-Pintar"
        />

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login Go-Pintar
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Les Privat Terbaik & No.1 di Indonesia
        </p>

        {status && (
          <div
            role="alert"
            className={`mb-6 text-sm text-center px-4 py-3 rounded-xl font-medium
              ${
                status.includes("berhasil")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto w-full">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email_user"
              value={formData.email_user}
              onChange={handleChange}
              placeholder="email@example.com"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            {errors?.email_user?.[0] && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email_user[0]}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password_user"
              value={formData.password_user}
              onChange={handleChange}
              placeholder="Masukkan password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            {errors?.password_user?.[0] && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password_user[0]}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={disabled}
            className={`w-full py-3 rounded-xl font-semibold text-white transition
              ${
                disabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
              }`}
          >
            {textButton}
          </button>
        </form>

        {/* LINKS */}
        <div className="mt-6 text-center space-y-2 text-sm">
          <a
            href="/lupapassword"
            className="text-green-600 hover:underline font-medium"
          >
            Lupa Password?
          </a>
          <p className="text-gray-500">
            Belum punya akun?
            <a
              href="/daftar"
              className="ml-1 text-green-600 font-medium hover:underline"
            >
              Daftar sekarang
            </a>
          </p>
        </div>

        {/* FOOTER */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          Dengan login, Anda menyetujui
          <a href="#" className="underline mx-1">
            Terms of Service
          </a>
          &
          <a href="#" className="underline ml-1">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* RIGHT - ANIMATION */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-6">
        <iframe
          src="https://lottie.host/embed/5379c4d6-adc3-4bbd-ae5b-30fc983dae79/0d8Yeofcqa.lottie"
          className="w-full h-full border-0"
          title="Animation"
        />
      </div>
    </div>
  </div>
</>

    );
};

export default Login;