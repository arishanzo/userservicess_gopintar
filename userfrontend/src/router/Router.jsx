import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Daftar from '../auth/Daftar';
import Homeindex from '../landingpage/Homeindex';
import Dashboard from '../user/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Profil from '../user/account/profil';
import Langganan from '../user/berlangganan/Langganan';
import FormLangganan from '../user/berlangganan/FormLangganan';
import Checkout from '../user/berlangganan/Checkout';
import Guru from '../user/guru/Guru';
import BuatKelas from '../user/kelas/BuatKelas';
import Kelas from '../user/kelas/Kelas';
import EmailVertif from '../auth/EmailVertif';
import AbsensiIndex from '../user/absensi/AbsensiIndex';



const Routeer = () => {
 
    

    return(

<Routes>
  <Route path="/" element={<Homeindex />}/>
  
  {/* Hanya untuk user belum login */}
  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
  
  <Route path="/lupapassword" element={<PublicRoute><EmailVertif /></PublicRoute>}/>
  <Route path="/daftar" element={<PublicRoute><Daftar /></PublicRoute>}/>
  
  {/* Hanya untuk user yang sudah login */}
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
  <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>}/>
  
  <Route path="/berlangganan" element={<ProtectedRoute><Langganan /></ProtectedRoute>}/>
  <Route path="/berlangganan/form" element={<ProtectedRoute><FormLangganan /></ProtectedRoute>}/>
  <Route path="/berlangganan/form/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>}/>

  
  <Route path="/guru" element={<ProtectedRoute><Guru /></ProtectedRoute>}/>


  
  <Route path="/kelas" element={<ProtectedRoute><Kelas /></ProtectedRoute>}/>
  <Route path="/kelas/buatkelas" element={<ProtectedRoute><BuatKelas /></ProtectedRoute>}/>

  <Route path='/jadwal' element={<ProtectedRoute><AbsensiIndex /></ProtectedRoute>} />


</Routes>
        
    );


}

export default Routeer;