<?php

namespace App\Http\Controllers\Pembayaran;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Notifications\ActivityNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\CoreApi;

class PaymentController extends Controller
{
    //

    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        //  \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        config::$isProduction = false;

        Config::$isSanitized = true;

        Config::$is3ds = true;
    }

      public function charge(Request $request)
    {
        $method = $request->method;
        $amount = $request->total;
        $bank   = $request->bank;

        $params = [
            "transaction_details" => [
                "order_id" => uniqid(),
                "gross_amount" => $amount
            ],
            "item_details" => [
                [
                    "id" => uniqid('id-'),
                    "price" => $amount,
                    "quantity" => 1,
                    "name" => "Pembayaran Paket"
                ]
            ],
            "customer_details" => [
                "first_name" => $request->user()->nama_user,
                "email" => $request->user()->email,
            ],
        ];

        switch ($method) {
            case "bank_transfer":
                $params["payment_type"] = "bank_transfer";
                $params["bank_transfer"] = ["bank" => $bank];
                break;

            case "qris":
                $params["payment_type"] = "qris";
                break;

            case "gopay":
                $params["payment_type"] = "gopay";
                $params["gopay"] = [
                    "enable_callback" => true,
                    "callback_url" => "myapp://callback"
                ];
                break;

            case "shopeepay":
                $params["payment_type"] = "shopeepay";
                break;

            case "credit_card":
                $params["payment_type"] = "credit_card";
                $params["credit_card"] = ["secure" => true];
                break;

            case "cstore_indomaret":
                $params["payment_type"] = "cstore";
                $params["cstore"] = [
                    "store" => "indomaret",
                    "message" => "Pembayaran belanja di toko Indomaret"
                ];
                break;

            case "cstore_alfamart":
                $params["payment_type"] = "cstore";
                $params["cstore"] = [
                    "store" => "alfamart",
                    "message" => "Pembayaran belanja di toko Alfamart"
                ];
                break;
        }

        $charge = CoreApi::charge($params);

            // simpan ke DB
         $user = $request->user();

        
        $pembayaran = new Pembayaran();
        $pembayaran->iduser = $user->iduser;
        $pembayaran->order_id = $charge->order_id;
        $pembayaran->transaction_id = $charge->transaction_id;
        $pembayaran->namapaket = $request->namapaket ?? 'Paket Berlangganan';
        $pembayaran->jumlahpembayaran = $charge->gross_amount;
        $pembayaran->statuspembayaran = $charge->transaction_status;
        $pembayaran->metodepembayaran = $charge->payment_type;
        $pembayaran->tglberakhirpembayaran = now()->addDays(1);

        // simpan detail sesuai metode
        if ($charge->payment_type === "bank_transfer" && isset($charge->va_numbers)) {
            $pembayaran->va_number = $charge->va_numbers[0]->va_number;
            $pembayaran->bank = $charge->va_numbers[0]->bank;
        }
        if ($charge->payment_type === "qris" && isset($charge->actions)) {
            $pembayaran->qris_url = $charge->actions[0]->url;
        }
        if ($charge->payment_type === "cstore") {
            $pembayaran->payment_code = $charge->payment_code;
            $pembayaran->store = $charge->store;
        }
        if ($charge->payment_type === "credit_card" && isset($charge->redirect_url)) {
            $pembayaran->redirect_url = $charge->redirect_url;
        }
        if (($charge->payment_type === "gopay" || $charge->payment_type === "shopeepay") && isset($charge->actions)) {
            $pembayaran->redirect_url = $charge->actions[0]->url;
        }

         $order = Pembayaran::where('iduser', $user->iduser)->first();

        if ($order){
             $pembayaran->update();
             
         $user->notify(new ActivityNotification("Ganti Pembayaran Berhasi;. Mohon Untuk Menyelesaikan Pembayaran Sebesar {$amount} Sebelum Tanggal {$pembayaran->tglberakhirpembayaran}"));


        }else{
            $pembayaran->save();
            
         $user->notify(new ActivityNotification("Proses Pemesanan Behasil. Mohon Untuk Menyelesaikan Pembayaran Sebesar {$amount} Sebelum Tanggal {$pembayaran->tglberakhirpembayaran}"));


        }
       

        return response()->json($pembayaran);
    }

        public function getTransaction($iduser)
        {
            $trx = Pembayaran::where('iduser', $iduser)->first();
            return response()->json($trx);
        }

    public function checkStatus($order_id)
    {
        try {
            $serverKey = config('midtrans.server_key');
            $isProduction = config('midtrans.is_production');
            
            $baseUrl = $isProduction ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com';
            $url = "{$baseUrl}/v2/{$order_id}/status";
            
            $response = Http::withBasicAuth($serverKey, '')
                ->timeout(30)
                ->get($url);

            if ($response->failed()) {
                Log::error('Midtrans API failed', [
                    'order_id' => $order_id,
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return response()->json(['error' => 'Gagal ambil status dari Midtrans'], 500);
            }
            
            if($response->status() == 404) {
                return response()->json(['error' => 'Order ID tidak ditemukan'], 404);
            }
            if($response->status() == 401) {
                return response()->json(['error' => 'Autentikasi gagal dengan Midtrans'], 401);
            }
            if($response->status() == 400) {
                return response()->json(['error' => 'Request tidak valid'], 400);
            }

            $data = $response->json();

            return response()->json([
                'transaction_status' => $data['transaction_status'] ?? 'unknown',
                'order_id' => $data['order_id'] ?? $order_id
            ]);

        } catch (\Exception $e) {
            Log::error('Check status error', [
                'order_id' => $order_id,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'error' => 'Terjadi kesalahan saat mengecek status',
                'message' => $e->getMessage()
            ], 500);
        }
    }

public function updateTransaction(Request $request, $order_id)
{
    try {
        $user = $request->user();
        $data = $request->validate([
            'statuspembayaran' => 'required|string'
        ]);

        // update status di database
        $pembayaran = Pembayaran::where('order_id', $order_id)->first();

        if (!$pembayaran) {
            return response()->json([
                'error' => 'Order tidak ditemukan'
            ], 404);
        }

        $pembayaran->statuspembayaran = $data['statuspembayaran'];
        $pembayaran->save();

        // Send notification based on status
        if($data['statuspembayaran'] === 'settlement') {
            $user->notify(new ActivityNotification("Selamat Anda Berlangganan Sekarang, Status Pembayaran Berhasil Dengan No Order {$order_id}"));   
        } else if($data['statuspembayaran'] === 'expire') {
            $user->notify(new ActivityNotification("Maaf Pembayaran Kadaluarsa Dengan No Order {$order_id}"));
        } else if($data['statuspembayaran'] === 'pending') {
            $user->notify(new ActivityNotification("Pembayaran Gagal, Status Saat Ini Pending Dengan No Order {$order_id}"));
        } else if($data['statuspembayaran'] === 'cancel') {
            $user->notify(new ActivityNotification("Pembayaran Gagal, Status Saat Ini Cancel Dengan No Order {$order_id}"));
        }

        return response()->json([
            'success' => true,
            'message' => 'Status pembayaran berhasil diupdate',
            'data' => $pembayaran
        ]);

    } catch (\Exception $e) {
        Log::error('Update payment status failed', [
            'order_id' => $order_id,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'error' => 'Gagal mengupdate status pembayaran',
            'message' => $e->getMessage()
        ], 500);
    }
}

}
