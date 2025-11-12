<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
          if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        date_default_timezone_set(config('app.timezone'));
        
     try {
        DB::statement('SET GLOBAL event_scheduler = ON;');
    } catch (\Exception $e) {
        Log::error('Gagal mengaktifkan event scheduler: ' . $e->getMessage());
    }
    }
}

