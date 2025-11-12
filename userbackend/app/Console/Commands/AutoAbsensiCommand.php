<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class AutoAbsensiCommand extends Command
{
    protected $signature = 'absensi:auto';
    protected $description = 'Auto create absensi for past bookings';

    public function handle()
    {
        $this->info('Starting auto absensi process...');

        // Get past bookings without absensi
        $pastBookings = DB::table('tglbooking')
            ->where('tglbooking', '<', now()->toDateString())
            ->get();

        $processedBookings = [];

        foreach ($pastBookings as $booking) {
            // Check if absensi already exists
           $existingAbsensi = DB::connection('gurugopintar_db')->table('absensi')
                ->where('idtglbooking', $booking->idtglbooking)
                ->exists();


            if (!$existingAbsensi) {
                // Create auto absensi
                DB::connection('gurugopintar_db')->table('absensi')->insert([
                    'idabsensi' => (string) \Illuminate\Support\Str::uuid(),
                    'idtglbooking' => $booking->idtglbooking,
                    'idprofilguru' => $booking->idprofilguru,
                    'tanggal' => $booking->tglbooking,
                    'sesi' => $booking->sesi,
                    'statusabsen' => 'Tidak Hadir',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $this->info("Created absensi for booking: {$booking->idtglbooking}");
                $processedBookings[] = $booking;
            }
        }

        // Create new bookings with different dates for each processed booking
        if (!empty($processedBookings)) {
            $latestBooking = DB::table('tglbooking')
                ->orderBy('tglbooking', 'desc')
                ->first();

            if ($latestBooking) {
                $baseDate = $latestBooking->tglbooking;
                $dayCounter = 1;

                foreach ($processedBookings as $booking) {
                    $nextDate = date('Y-m-d', strtotime($baseDate . ' +' . $dayCounter . ' day'));

                    DB::table('tglbooking')->insert([
                        'idtglbooking' => (string) \Illuminate\Support\Str::uuid(),
                        'iduser' => $booking->iduser,
                        'idprofilguru' => $booking->idprofilguru,
                        'idbookingprivate' => $booking->idbookingprivate,
                        'tglbooking' => $nextDate,
                        'sesi' => $booking->sesi,
                        'statusngajar' => 'Belum Mengajar',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    $this->info("Created new booking for date: {$nextDate}");
                    $dayCounter++;
                }
            }
        }

        $this->info('Auto absensi process completed!');
    }
}