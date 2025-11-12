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
        Schema::create('pengumpulantugas', function (Blueprint $table) {
            $table->uuid('idpengumpulantugas')->primary();
            $table->uuid('iduser');
            $table->uuid('idtugasbelajar');
            $table->date('tglpengumpulantugas')->nullable();
            $table->enum('statustugas', ['Selesai Mengumpulkan', 'Belum Mengumpulkan'])->default('Belum Mengumpulkan');
            $table->string('catatantugas')->nullable();
            $table->timestamps();

            
        $table->foreign('iduser', 'fk_pengumpulantugas_iduser')
                  ->references('iduser')->on('userlogin')
                  ->onDelete('cascade');

                   $table->index('idtugasbelajar', 'idx_pengumpulantugas_idtugasbelajar');


                  
        });

                 
      DB::statement('
            ALTER TABLE `usrgopintar_db`.`pengumpulantugas`
            ADD CONSTRAINT `fk_pengumpulantugas_idtugasbelajar`
            FOREIGN KEY (`idtugasbelajar`)
            REFERENCES `gurugopintar_db`.`tugasbelajar` (`idtugasbelajar`)
            ON DELETE CASCADE
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('pengumpulantugas', function (Blueprint $table) {
            $table->dropForeign('fk_pengumpulantugas_idtugasbelajar');
            $table->dropIndex('idx_pengumpulantugas_idtugasbelajar');
             $table->dropForeign('fk_pengumpulantugas_iduser');

        });

        Schema::dropIfExists('pengumpulantugas');
    }
};
