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
        Schema::create('feedbackbelajar', function (Blueprint $table) {
            $table->uuid('idfeedbackbelajar')->primary();
             $table->uuid('iduser');
            $table->uuid('idprofilguru');
            $table->uuid('idbookingprivate');
            $table->string('feedbackbelajar')->nullable();
            $table->integer('ratingbelajar')->nullable();
            $table->timestamps();

               $table->foreign('iduser', 'fk_feedbackbelajar_iduser')
                  ->references('iduser')->on('userlogin')
                  ->onDelete('cascade');

             $table->foreign('idbookingprivate', 'fk_feedbackbelajar_idbookingprivate')
             ->references('idbookingprivate')
             ->on('booking')
             ->onDelete('cascade');

                $table->index('idprofilguru', 'idx_feedbackbelajar_idprofilguru');

        });

              

          DB::statement('
            ALTER TABLE `usrgopintar_db`.`feedbackbelajar`
            ADD CONSTRAINT `fk_feedbackbelajar_idprofilguru`
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
      
        Schema::table('feedbackbelajar', function (Blueprint $table) {
            $table->dropForeign('fk_feedbackbelajar_idprofilguru');
            $table->dropIndex('idx_feedbackbelajar_idprofilguru');
            $table->dropForeign('fk_feedbackbelajar_iduser');
            $table->dropForeign('fk_feedbackbelajar_idbookingprivate');

        });

        Schema::dropIfExists('feedbackbelajar');
    }
};
