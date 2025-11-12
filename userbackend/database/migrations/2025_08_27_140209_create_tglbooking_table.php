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
        Schema::create('tglbooking', function (Blueprint $table) {
            $table->uuid('idtglbooking')->primary();
            $table->uuid('iduser');
            $table->uuid('idprofilguru');
            $table->uuid('idbookingprivate');
            $table->date('tglbooking');
            $table->string('sesi');
            $table->string('statusngajar');
            $table->timestamps();


             $table->foreign('iduser', 'fk_tglbooking_iduser')
                  ->references('iduser')->on('userlogin')
                  ->onDelete('cascade');

             $table->foreign('idbookingprivate', 'fk_tglbooking_idbookingprivate')
             ->references('idbookingprivate')
             ->on('booking')
             ->onDelete('cascade');


            
            $table->index('idprofilguru', 'idx_tglbooking_idprofilguru');
        });

        
             DB::statement('
            ALTER TABLE `usrgopintar_db`.`tglbooking`
            ADD CONSTRAINT `fk_tglbooking_idprofilguru`
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

        Schema::table('tglbooking', function (Blueprint $table) {
            
            $table->dropForeign('fk_tglbooking_idprofilguru');
            $table->dropForeign('fk_tglbooking_iduser');
            $table->dropForeign('fk_tglbooking_idbookingprivate');
            $table->dropIndex('idx_tglbooking_idprofilguru');
        });

        Schema::dropIfExists('tglbooking');
    }
};
