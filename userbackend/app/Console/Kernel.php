<?php

namespace App\Console;

use App\Models\PasswordResetTokens;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{

     /**
     * Daftar command kustom kamu.
     */
    protected $commands = [
        \App\Console\Commands\SyncMidtransStatus::class,
        \App\Console\Commands\AutoAbsensiCommand::class,
    ];

    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function () {
        PasswordResetTokens::where('expires_at', '<', now())->delete();
         })->everyMinute();

     $schedule->command('absensi:auto')->everyMinute();
     $schedule->command('midtrans:sync-status')->everyMinute();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
        
    }
}
