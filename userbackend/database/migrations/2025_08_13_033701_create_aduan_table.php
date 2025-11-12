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
        Schema::create('aduan', function (Blueprint $table) {
            $table->uuid('idaduan')->primary();
            $table->uuid('iduser');
            $table->uuid('idprofilguru');
            $table->string('juduladuan')->nullable();
            $table->text('deskripsiaduan')->nullable();
            $table->enum('statusaduan', ['ditanggapi', 'belum ditanggapi', 'ditolak'])->default('belum ditanggapi');
            $table->timestamp('tgladuan')->nullable();
            $table->text('tanggapan')->nullable();
            $table->timestamp('tgltanggapan')->nullable();
            $table->timestamps();

            

              $table->foreign('iduser', 'fk_aduan_iduser')->references('iduser')->on('userlogin')->onDelete('cascade');

              
         $table->index('idprofilguru', 'idx_aduan_idprofilguru');
            
        });

          DB::statement('
            ALTER TABLE `usrgopintar_db`.`aduan`
            ADD CONSTRAINT `fk_aduan_idguru`
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
        

        Schema::table('aduan', function (Blueprint $table) {
            $table->dropForeign('fk_aduan_idprofilguru');
            $table->dropIndex('idx_aduan_idprofilguru');
            $table->dropForeign('fk_aduan_iduser');

        });

        Schema::dropIfExists('aduan');
    }
};
