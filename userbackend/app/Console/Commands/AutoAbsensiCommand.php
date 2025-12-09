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
        // $pastBookings = DB::table('tglbooking')
        //     ->where('tglbooking', '<', now()->toDateString())
        //     ->get();

        $tglBookingTerbaru = DB::table('tglbooking')->max('tglbooking');
        $dateDiff = now()->diffInDays($tglBookingTerbaru);
     
        $dayCounterTglBookingTerbaru = 0;



        $processedBookings = [];

        // foreach ($pastBookings as $booking) {

        for ($i = 1; $i <= $dateDiff; $i++) {
        
            echo "Hari ke-$i sejak latestBooking<br>";
         
        // dia hitung tanggal berikutnya dari tglBookingTerbaru
         $nextDateTglBooking = date('Y-m-d', strtotime($tglBookingTerbaru . ' +' . $dayCounterTglBookingTerbaru . ' day'));

        // cek apakah absensi sudah ada untuk tglbooking tersebut
        $existingAbsensi = DB::connection('gurugopintar_db')->table('absensiguru')
                ->where('idtglbooking', $nextDateTglBooking)
                ->exists();

        // ambil data booking untuk tanggal berikutnya
        $booking = DB::table('tglbooking')
                ->where('tglbooking', $nextDateTglBooking)
                ->first();

        // jika absensi belum ada, buat absensi otomatis
            if (!$existingAbsensi) {
                // Create auto absensi
                DB::connection('gurugopintar_db')->table('absensiguru')->insert([
                    'idabsensiguru' => (string) \Illuminate\Support\Str::uuid(),
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

            $dayCounterTglBookingTerbaru++;
        

        // buat booking baru untuk hari berikutnya berdasarkan booking yang sudah diproses
        if (!empty($processedBookings)) {

            //  ambil tanggal booking terbaru
            $latestBooking = DB::table('tglbooking')
                ->orderBy('tglbooking', 'desc')
                ->first();

        //  latestBooking aada isinya
            if ($latestBooking) {
                $baseDate = $latestBooking->tglbooking;
                $dayCounter = 1;

                //  maka akan buat booking baru untuk hari-hari berikutnya
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
    }
        $this->info('Auto absensi process completed!');
    }
}