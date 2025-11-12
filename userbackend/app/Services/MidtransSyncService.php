<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Pembayaran;
use App\Events\PaymentStatusUpdated;
use Illuminate\Console\Command;

class MidtransSyncService
{
    public function syncPending(?Command $console = null): void
    {
        $serverKey = config('midtrans.server_key');
        $baseUrl = config('midtrans.is_production')
            ? 'https://api.midtrans.com/v2/'
            : 'https://api.sandbox.midtrans.com/v2/';

        $pending = Pembayaran::where('statuspembayaran', 'pending')->limit(50)->get();

        if ($pending->isEmpty()) {
            $console?->info('Tidak ada pembayaran pending.');
            return;
        }

        foreach ($pending as $pembayaran) {
            $this->syncOne($pembayaran, $baseUrl, $serverKey, $console);
        }

        $console?->info('Sinkronisasi status Midtrans selesai ✅');
    }

    protected function syncOne(Pembayaran $pembayaran, string $baseUrl, string $serverKey, ?Command $console = null): void
    {
        $url = $baseUrl . $pembayaran->order_id . '/status';

        $response = Http::withBasicAuth($serverKey, '')
            ->timeout(10)
            ->retry(3, 1000)
            ->get($url);

        if ($response->successful()) {
            $data = $response->json();
            $status = $data['transaction_status'];

            $pembayaran->statuspembayaran = $status;
            $pembayaran->transaction_id = $data['transaction_id'] ?? $pembayaran->transaction_id;
            $pembayaran->save();

            broadcast(new PaymentStatusUpdated($pembayaran->order_id, $status));

            $console?->info("Order {$pembayaran->order_id} → {$status}");
        } else {
            $console?->error("Gagal cek status: {$pembayaran->order_id}");
            Log::warning('Midtrans status check failed', [
                'order_id' => $pembayaran->order_id,
                'response' => $response->body(),
            ]);
        }
    }
}