import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingGopintar from './LoadingGopintar';



// import ProtectedRoute from './ProtectedRoute';
// import PublicRoute from './PublicRoute';


const PublicRoute = React.lazy(() => import("./PublicRoute"));
const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));

const Login = React.lazy(() => import("../auth/Login"));
const Daftar = React.lazy(() => import("../auth/Daftar"));


const Homeindex = React.lazy(() => import("../landingpage/Homeindex"));
const Dashboard = React.lazy(() => import("../user/dashboard/Dashboard"));


const Profil = React.lazy(() => import("../user/account/profil"));
const Langganan = React.lazy(() => import("../user/berlangganan/Langganan"));


const FormLangganan = React.lazy(() => import("../user/berlangganan/FormLangganan"));
const Checkout = React.lazy(() => import("../user/berlangganan/Checkout"));



const Guru = React.lazy(() => import("../user/guru/Guru"));
const BuatKelas = React.lazy(() => import("../user/kelas/BuatKelas"));


const Kelas = React.lazy(() => import("../user/kelas/Kelas"));
const EmailVertif = React.lazy(() => import("../auth/EmailVertif"));


const AbsensiIndex = React.lazy(() => import("../user/absensi/AbsensiIndex"));

// import Login from '../auth/Login';
// import Daftar from '../auth/Daftar';
// import Homeindex from '../landingpage/Homeindex';
// import Dashboard from '../user/dashboard/Dashboard';
// import ProtectedRoute from './ProtectedRoute';
// import PublicRoute from './PublicRoute';
// import Profil from '../user/account/profil';
// import Langganan from '../user/berlangganan/Langganan';
// import FormLangganan from '../user/berlangganan/FormLangganan';
// import Checkout from '../user/berlangganan/Checkout';
// import Guru from '../user/guru/Guru';
// import BuatKelas from '../user/kelas/BuatKelas';
// import Kelas from '../user/kelas/Kelas';
// import EmailVertif from '../auth/EmailVertif';
// import AbsensiIndex from '../user/absensi/AbsensiIndex';



const Routeer = () => {
 
    

    return(

<Routes>
  <Route path="/" element={<Homeindex />}/>
  
  {/* Hanya untuk user belum login */}
  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
  
  <Route path="/lupapassword" element={<PublicRoute><EmailVertif /></PublicRoute>}/>
  <Route path="/daftar" element={<PublicRoute><Daftar /></PublicRoute>}/>
  
  {/* Hanya untuk user yang sudah login */}
  <Route path="/dashboard" element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <Dashboard />
            </Suspense></ProtectedRoute>}/>
  <Route path="/profil" element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <Profil />
            </Suspense></ProtectedRoute>}/>
  
  <Route path="/berlangganan" element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <Langganan />
            </Suspense></ProtectedRoute>}/>
  <Route path="/berlangganan/form" element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <FormLangganan />
            </Suspense></ProtectedRoute>}/>
  <Route path="/berlangganan/form/checkout" element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <Checkout/>
            </Suspense></ProtectedRoute>}/>

  
  <Route path="/guru" element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <Guru/>
            </Suspense></ProtectedRoute>}/>


  
  <Route path="/kelas" element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <Kelas />
            </Suspense></ProtectedRoute>}/>
  <Route path="/kelas/buatkelas" element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <BuatKelas />
            </Suspense></ProtectedRoute>}/>

  <Route path='/jadwal' element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <AbsensiIndex />
            </Suspense></ProtectedRoute>} />


</Routes>
        
    );


}

export default Routeer;