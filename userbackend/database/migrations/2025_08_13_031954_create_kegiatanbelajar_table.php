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
        Schema::create('kegiatanbelajar', function (Blueprint $table) {
            $table->uuid('idkegiatanbelajar')->primary();
            $table->uuid('iduser');
            $table->uuid('idprofilguru');
            $table->string('fotokegiatan')->nullable();
            $table->string('videokegiatan')->nullable();
            $table->string('linkmateri')->nullable();
            $table->string('namakegiatan')->nullable();
            $table->text('deskripsikegiatan')->nullable();
            $table->timestamp('tglkegiatan')->nullable();
            $table->timestamps();

            

                   
             $table->foreign('iduser', 'fk_kegiatanbelajar_iduser')
                  ->references('iduser')->on('userlogin')
                  ->onDelete('cascade');

                   $table->index('idprofilguru', 'idx_kegiatanbelajar_idprofilguru');


        });

                 
      DB::statement('
            ALTER TABLE `usrgopintar_db`.`kegiatanbelajar`
            ADD CONSTRAINT `fk_kegiatanbelajar_idprofilguru`
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
         

        Schema::table('kegiatanbelajar', function (Blueprint $table) {
            $table->dropForeign('fk_kegiatanbelajar_idprofilguru');
            $table->dropIndex('idx_kegiatanbelajar_idprofilguru');
             $table->dropForeign('fk_kegiatanbelajar_iduser');

        });

        Schema::dropIfExists('kegiatanbelajar');
    }
};
