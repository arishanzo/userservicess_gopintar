<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('booking', function (Blueprint $table) {
           $table->uuid('idbookingprivate')->primary();
            $table->uuid('iduser');
            $table->uuid('idprofilguru');
            $table->string('namamurid');
            $table->string('namawalimurid');
            $table->string('noteleponortu');
            $table->string('catatanalamat');
            $table->string('kelas');
            $table->string('tingkatSekolah');
            $table->string('mapeldipilih');
            $table->string('tujuanpembelajaran');
            $table->string('catatanbooking');
            $table->string('statusbooking');
            $table->timestamps();

            

              
             $table->foreign('iduser', 'fk_booking_iduser')
                  ->references('iduser')->on('userlogin')
                  ->onDelete('cascade');

  $table->index('idprofilguru', 'idx_booking_idprofilguru');
        });

       
             DB::statement('
            ALTER TABLE `usrgopintar_db`.`booking`
            ADD CONSTRAINT `fk_booking_idprofilguru`
            FOREIGN KEY (`idprofilguru`)
            REFERENCES `gurugopintar_db`.`profilguru` (`idprofilguru`)
            ON DELETE CASCADE
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('booking', function (Blueprint $table) {
            $table->dropForeign('fk_booking_idprofilguru');
            $table->dropForeign('fk_booking_iduser');
               $table->dropIndex('idx_booking_idprofilguru');

        });


        Schema::dropIfExists('booking');
    }
};
