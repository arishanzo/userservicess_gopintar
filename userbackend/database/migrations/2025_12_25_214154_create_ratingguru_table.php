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
        Schema::create('ratingguru', function (Blueprint $table) {
            $table->uuid('idratingguru')->primary();
            $table->uuid('iduser');
            $table->uuid('idprofilguru');
            $table->uuid('idbookingprivate');
            $table->tinyInteger('rating');
            $table->text('comment')->nullable();
            $table->timestamps();
       
              
             $table->foreign('iduser', 'fk_ratingguru_iduser')
                  ->references('iduser')->on('userlogin')
                  ->onDelete('cascade');

                         $table->foreign('idbookingprivate', 'fk_ratingguru_idbookingprivate')
                  ->references('idbookingprivate')->on('booking')
                  ->onDelete('cascade');

           $table->index('idprofilguru', 'idx_ratingguru_idprofilguru');
        });

             DB::statement('
            ALTER TABLE `usrgopintar_db`.`ratingguru`
            ADD CONSTRAINT `fk_ratingguru_idprofilguru`
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
             Schema::table('ratingguru', function (Blueprint $table) {
            $table->dropForeign('fk_ratingguru_idprofilguru');
            $table->dropForeign('fk_ratingguru_iduser');
            
            $table->dropForeign('fk_ratingguru_idbookingprivate');
               $table->dropIndex('idx_ratingguru_idprofilguru');

        });


        Schema::dropIfExists('ratingguru');
    }
};
