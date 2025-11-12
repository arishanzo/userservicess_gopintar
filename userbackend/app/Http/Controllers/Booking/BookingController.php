<?php

namespace App\Http\Controllers\Booking;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\TglBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    public function bookingGet($iduser){


           $booking = Booking::with('User_Login', 'Tgl_Booking_Kelas')->where('iduser', $iduser)->get();
         

             return response()->json([
            'status' => 200,
            'data' => $booking,
            'message' => $booking ? 'Bookinf Ada' : 'Booking Tidak Ada'
        ]);

       
    }


    public function bookingGetGuru($idProfilGuru){


       $booking =  Booking::with('Tgl_Booking_Kelas')->where('idprofilguru', $idProfilGuru)->get();
       
     return response()->json([
            'status' => 200,
            'data' => $booking,
            'message' => $booking ? 'Bookinf Ada' : 'Booking Tidak Ada'
        ]);

       
    }

   public function bookingPutGuru($idbookingprivate, Request $request)
{
    try {
        // Cari booking by id
        $booking = Booking::where('idbookingprivate', $idbookingprivate)->first();

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking tidak ditemukan'
            ], 404);
        }

         $status = $request->status ?? 'Mulai';

        // Update status
        $booking->update([
            'statusbooking' => $status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil diperbarui',
            'data'    => $booking
        ], 200);

    } catch (\Exception $e) {
        Log::error('Error updating booking', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Gagal memperbarui booking: ' . $e->getMessage()
        ], 500);
    }
}



   public function updateNextDays($idtglbooking, Request $request)
{
    try {
        // Cari booking by id
        $tglbooking = tglBooking::where('idtglbooking', $idtglbooking)->first();

        if (!$tglbooking ) {
            return response()->json([
                'success' => false,
                'message' => 'Tanggal Booking  ditemukan'
            ], 404);
        }

         $tanggal = $request->tglbooking ?? '';

         $data = [
            'iduser' => $tglbooking->iduser,
            'idprofilguru' => $tglbooking->idprofilguru,
            'idbookingprivate' => $tglbooking->idbookingprivate,
            'tglbooking' => $tanggal,
            'sesi' => $tglbooking->sesi,
            'statusngajar' => $tglbooking->statusngajar,
         ];

        // Update status
        
            $tglbooking = tglBooking::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Tanggal Booking berhasil diperbarui',
            'data'    => $tglbooking 
        ], 200);

    } catch (\Exception $e) {
        Log::error('Error updating booking', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Gagal memperbarui booking: ' . $e->getMessage()
        ], 500);
    }
}

    public function tglBookingGet($idbookingprivate){

        try {
            $tglBooking = TglBooking::where('idbookingprivate', $idbookingprivate)->get();

            if ($tglBooking->isEmpty()) {
                return response()->json([
                    'status' => 404,
                    'success' => false,
                    'message' => 'Tanggal booking tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => 200,
                'success' => true,
                'data' => $tglBooking
            ]);

        } catch (\Exception $e) {
            Log::error('Error retrieving tanggal booking', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json([
                'status' => 500,
                'success' => false,
                'message' => 'Gagal mengambil data tanggal booking: ' . $e->getMessage()
            ], 500);
        }

    }
        
    public function Booking(Request $request)
    {
        try {
            $user = $request->user();
        
            if (!$user) {
                return response()->json([
                    'message' => 'User tidak terautentikasi'
                ], 401);
            }

            $data = $request->all();
            $data['iduser'] = $user->iduser;
            


            $booking = Booking::create($data);
            

            return response()->json([
                'status' => 200,
                'success' => true,
                'idbookingprivate' => $booking->idbookingprivate,
                'message' => 'Booking berhasil dibuat'
            ]);

            

        } catch (\Exception $e) {
            Log::error('Booking creation failed', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json([
                'status' => 500,
                'success' => false,
                'message' => 'Gagal membuat booking: ' . $e->getMessage()
            ], 500);
        }
    }

    public function tglbookingCreate(Request $request) {
        try {
            $user = $request->user();
          
            if (!$user) {
                return response()->json([
                    'message' => 'User tidak terautentikasi'
                ], 401);
            }

            $data = $request->all();
            $data['iduser'] = $user->iduser;
            
            if (Booking::find($data['idbookingprivate'])) {

            Log::info('TglBooking data to save', $data);

            $tglBooking = TglBooking::create($data);

          

            } else {
                return response()->json([
                    'status' => 404,
                    'success' => false,
                    'message' => 'Booking tidak ditemukan'
                ], 404);
            }
            
            Cache::forget("booking_" . $user->iduser);
            Cache::forget("booking_" . $data['idprofilguru']);
            
            return response()->json([
                'status' => 200,
                'success' => true,
                'message' => 'Tanggal booking berhasil disimpan'
            ]);
        } catch (\Exception $e) {
            Log::error('TglBooking creation failed', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json([
                'status' => 500,
                'success' => false,
                'message' => 'Gagal menyimpan tanggal booking: ' . $e->getMessage()
            ], 500);
        }
    }

  public function tglbookingUpdate(Request $request, $idtglbooking)
        {
            try {
                    // Validasi input
                $request->validate([
                    'sesi' => 'required|string|max:255'
                ]);

                // Cari data berdasarkan idbookingprivate
                $tglBooking = TglBooking::where('idtglbooking', $idtglbooking)->first();

                if (!$tglBooking) {
                    return response()->json([
                        'status' => 404,
                        'success' => false,
                        'message' => 'Tanggal booking tidak ditemukan'
                    ], 404);
                }

                // Update field sesi
                $tglBooking->sesi = $request->input('sesi');
                $tglBooking->save();

                return response()->json([
                    'status' => 200,
                    'success' => true,
                    'message' => 'Tanggal booking berhasil diperbarui',
                    'data' => $tglBooking
                ]);


            } catch (\Exception $e) {
                Log::error('Error updating tanggal booking', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);

                return response()->json([
                    'status' => 500,
                    'success' => false,
                    'message' => 'Gagal memperbarui tanggal booking: ' . $e->getMessage()
                ], 500);
            }
        }
            
        
   
}
