<?php

namespace App\Http\Controllers\RatingGuru;

use App\Http\Controllers\Controller;
use App\Http\Requests\RatingGuruRequest;
use App\Models\RatingGuru;
use Illuminate\Http\Request;

class RatingGuruController extends Controller
{
    public function RatingGet(){


           $rating = RatingGuru::with('Booking')->get();
         
             return response()->json([
            'status' => 200,
            'data' => $rating,
            'message' => $rating ? 'Rating Ada' : 'Rating Tidak Ada'
        ]);
    }

     public function store(RatingGuruRequest $request)
    {
          $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['iduser'] = $user->iduser;

       
       
        try {
           
        $result = RatingGuru::create($data);
        
            return response()->json([
                'message' => 'Berhasil Disimpan',
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
