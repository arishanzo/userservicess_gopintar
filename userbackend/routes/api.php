<?php

use App\Http\Controllers\User\AbsensiUserController;
use App\Http\Controllers\Auth\AuthProsesController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\Gateway\ApiGatewayController;
use App\Http\Controllers\Pembayaran\PaymentController;
use App\Http\Controllers\User\UserProfileController;
use App\Http\Controllers\Gateway\ServiceCommunicationController;
use App\Http\Controllers\PasswordResetController;
use App\Models\ProfilUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::get('/auth/google/redirect', [GoogleController::class, 'redirectToGoogle']);
// Route::post('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::middleware(['auth:sanctum', 'throttle:1000,1'])->get('/user', [AuthProsesController::class, 'user']);


Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf' => csrf_token()]);
});

Route::get('/check-session', function (Request $request) {
    return response()->json([
        'authenticated' => Auth::check(),
        'user' => Auth::check() ? Auth::user() : null
    ]);
});


Route::post('/daftar', [AuthProsesController::class, 'register']);

Route::post('/login', [AuthProsesController::class, 'login'])->name('login');


Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => 'Logout berhasil']);
});



Route::post('/password/send-code', [PasswordResetController::class, 'requestCode']);
Route::post('/password/verify-code', [PasswordResetController::class, 'checkCode']);
Route::post('/password/reset', [PasswordResetController::class, 'updatePassword']);


Route::get('/hello', function () {
    return ['message' => 'Hello from Laravel API 🚀'];
});


Route::prefix('guru')->middleware(['throttle:100,1', 'service.auth'])->group(function () {
    Route::get('daftarguru', [ServiceCommunicationController::class, 'getAllGurus']);
       Route::get('/bookingguru/{idprofilguru}', [BookingController::class, 'bookingGetGuru']);
       Route::put('/putbookingguru/{idBookingPrivate}', [BookingController::class, 'bookingPutGuru']);
       Route::put('/puttglbooking/{idtglbooking}', [BookingController::class, 'updateNextDays']);
});


Route::prefix('admin')->middleware(['throttle:100,1', 'service.auth'])->group(function () {
    Route::get('muridall', [UserProfileController::class, 'getAll']);
});



Route::prefix('kegiatanbelajar')->middleware(['throttle:100,1', 'service.auth'])->group(function () {
    Route::get('daftarkegiatanbelajar/{idbookingprivate}', [ServiceCommunicationController::class, 'getAllKegiatanBelajar'])
         ->where('idbookingprivate', '[0-9a-fA-F\-]+');

});

Route::prefix('tugaskelas')->middleware(['throttle:100,1', 'service.auth'])->group(function () {
    Route::get('daftartugaskelas/{idbookingprivate}', [ServiceCommunicationController::class, 'getAllTugasKelas'])
         ->where('idbookingprivate', '[0-9a-fA-F\-]+');

    Route::put('tugaskelas/{idtugasbelajar}', [ServiceCommunicationController::class, 'putTugasKelas'])
         ->where('idtugasbelajar', '[0-9a-fA-F\-]+');
});

 

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/absensiuser/{iduser}', [AbsensiUserController::class, 'getAbsensiByUser']);
    Route::post('/absensi', [AbsensiUserController::class, 'store']);

    Route::post('/profile', [UserProfileController::class, 'store']);
    Route::post('/profileedit/{idprofiluser}', [UserProfileController::class, 'update']);
    Route::get('/profile/{iduser}', [UserProfileController::class, 'getByID']);
    Route::get('/photos/{path}', [UserProfileController::class, 'getPhoto'])->where('path', '.*');
    Route::put('/profile/ubahpassword', [UserProfileController::class, 'ubahpassword']);

    Route::post('/midtrans/charge', [PaymentController::class, 'charge']);
    Route::get('/midtrans/{iduser}', [PaymentController::class, 'getTransaction']);
    Route::get('/midtrans/cek-status/{order_id}', [PaymentController::class, 'checkStatus']);
    Route::put('/midtrans/updateStatus/{order_id}', [PaymentController::class, 'updateTransaction']);
    
    // Debug route for testing
    Route::get('/midtrans/debug/{order_id}', function($order_id) {
        return response()->json([
            'order_id' => $order_id,
            'timestamp' => now(),
            'server_key' => config('midtrans.server_key') ? 'configured' : 'missing',
            'is_production' => config('midtrans.is_production')
        ]);
    });


    
    Route::get('/booking/{iduser}', [BookingController::class, 'bookingGet']);
    Route::post('/booking', [BookingController::class, 'booking']);
    Route::get('/tglbooking/{iduser}', [BookingController::class, 'tglbookingGet']);
    Route::post('/tglbooking', [BookingController::class, 'tglbookingCreate']);
    Route::put('/tglbooking/{idtglbooking}', [BookingController::class, 'tglbookingUpdate']);
    Route::put('/puttglbooking/{idtglbooking}', [BookingController::class, 'updateNextDays']);

    // Get notifications
    Route::get('/notifications', function (Request $request) {
        return response()->json($request->user()->notifications);
    });

    // Tandai 1 notifikasi sudah dibaca
    Route::post('/notifications/{id}/read', function (Request $request, $id) {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return response()->json(['success' => true]);
    });

    // Tandai semua notifikasi sudah dibaca
    Route::post('/notifications/read-all', function (Request $request) {
        $request->user()->unreadNotifications->markAsRead();
        return response()->json(['success' => true]);
    });

    // Hapus semua notifikasi
    Route::delete('/notifications/clear', function (Request $request) {
        $request->user()->notifications()->delete();
        return response()->json(['success' => true]);
    });

    // Hapus semua notifikasi berdasarkan user ID
    Route::delete('/notifications/{userId}/clear', function (Request $request, $userId) {
        $request->user()->notifications()->delete();
        return response()->json(['success' => true]);
    });

    // Hapus semua notifikasi berdasarkan user ID (POST method)
    Route::post('/notifications/{userId}/clear', function (Request $request, $userId) {
        $request->user()->notifications()->delete();
        return response()->json(['success' => true]);
    });


});
