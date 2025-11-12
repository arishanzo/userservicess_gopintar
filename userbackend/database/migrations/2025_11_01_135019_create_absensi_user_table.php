<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('absensi_user', function (Blueprint $table) {
            $table->uuid('idabsensi')->primary();
            $table->uuid('iduser');
            $table->uuid('idtglbooking');
            $table->date('tanggal');
            $table->string('sesi');
            $table->string('statusabsen');
            $table->timestamps();
              
             $table->foreign('iduser', 'fk_absensiuser_iduser')
                  ->references('iduser')->on('userlogin')
                  ->onDelete('cascade');

                     $table->foreign('idtglbooking', 'fk_idtglbooking_iduser')
                  ->references('idtglbooking')->on('tglbooking')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::table('absensi_user', function (Blueprint $table) {
          $table->dropForeign('fk_absensiuser_iduser');
          $table->dropForeign('fk_idtglbooking_iduser');
        });

        Schema::dropIfExists('absensi_user');
    }
};
