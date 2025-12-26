<?php

namespace App\Http\Controllers\RatingGuru;

use App\Http\Controllers\Controller;
use App\Models\RatingGuru;
use Illuminate\Http\Request;

class RatingGuruController extends Controller
{
    public function RatingGet($idbookingprivate){


           $booking = RatingGuru::with('Booking')->where('idbookingprivate', $idbookingprivate)->get();
         
             return response()->json([
            'status' => 200,
            'data' => $booking,
            'message' => $booking ? 'Rating Ada' : 'Rating Tidak Ada'
        ]);
    }

    
}
