<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\AbsensiUserRequest;
use App\Models\AbsensiUser;
use Illuminate\Http\Request;

class AbsensiUserController extends Controller
{
    public function getAbsensiByUser ($iduser) {
        
           $absensi = AbsensiUser::with('User_Login')->where('iduser', $iduser)->get();
         

         return response()->json([
            'status' => 200,
            'data' => $absensi,
            'message' => $absensi->count() > 0 ? 'Absensi Ada' : 'Absensi Tidak Ada'
        ]);
    }

      public function store(AbsensiUserRequest $request) {

        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }
         
        
        $data = $request->validated();
        $data['iduser'] = $user['iduser'];

         try {

            
           
            $result = AbsensiUser::create($data);


            return response()->json([
                'message' => 'Absensi Berhasil Disimpan',
                'data' => $result
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan',
                'error' => $e->getMessage()
            ], 500);
        }
        }
}
