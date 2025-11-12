import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";

const icons = {
  success: <CheckCircle className="h-7 w-7 text-green-600" />,
  warning: <AlertTriangle className="h-7 w-7 text-yellow-600" />,
  info: <Info className="h-7 w-7 text-blue-600" />,
  danger: <XCircle className="h-7 w-7 text-red-600" />,
};

const colors = {
  success: {
    bg: "from-green-100 to-green-200",
    button: "bg-green-600 hover:bg-green-700",
  },
  warning: {
    bg: "from-yellow-100 to-yellow-200",
    button: "bg-yellow-600 hover:bg-yellow-700",
  },
  info: {
    bg: "from-blue-100 to-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  danger: {
    bg: "from-red-100 to-red-200",
    button: "bg-red-600 hover:bg-red-700",
  },
};

export default function Alert({ type = "info", title, message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 relative"
      >
        {/* Icon */}
        <div
          className={`mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr ${colors[type].bg} shadow-inner mb-4`}
        >
          {icons[type]}
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-5">{message}</p>

          {/* Button */}
          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-full text-white text-sm font-medium shadow-lg transition ${colors[type].button}`}
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// <Alert
//   type="danger"
//   title="Mohon Maaf!"
//   message="Form tidak boleh kosong. Silakan isi data dengan benar dan lengkap."
//   onClose={() => setShowAlert(false)}
// />

// <Alert
//   type="success"
//   title="Berhasil!"
//   message="Data berhasil disimpan ke sistem."
//   onClose={() => setShowAlert(false)}
// />

// <Alert
//   type="warning"
//   title="Perhatian!"
//   message="Pastikan semua field sudah diisi dengan benar."
//   onClose={() => setShowAlert(false)}
// />

// <Alert
//   type="info"
//   title="Informasi"
//   message="Akun kamu akan segera diverifikasi oleh admin."
//   onClose={() => setShowAlert(false)}
// />
