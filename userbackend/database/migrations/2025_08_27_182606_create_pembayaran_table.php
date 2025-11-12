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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->uuid('idpembayaran')->primary();
                $table->uuid('iduser');
            $table->string('order_id')->unique();
            $table->string('transaction_id');
            $table->string('namapaket')->nullable();
            $table->string('metodepembayaran')->nullable(); // bank_transfer, qris, gopay, dll
            $table->decimal('jumlahpembayaran', 12, 2);
            $table->string('statuspembayaran')->default('pending');
            $table->dateTime('tglberakhirpembayaran')->nullable();

            // detail tambahan sesuai metode
            $table->string('va_number')->nullable();       // bank transfer
            $table->string('bank')->nullable();            // bank bca, bri, dll
            $table->text('qris_url')->nullable();          // url QRIS
            $table->text('redirect_url')->nullable();      // kode cstore
             $table->text('payment_code')->nullable();
            $table->text('store')->nullable();      // credit_card / ewallet

            $table->timestamps();


             $table->foreign('iduser', 'fk_pembayaran_iduser')->references('iduser')->on('userlogin')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::table('pembayaran', function (Blueprint $table) {
          $table->dropForeign('fk_pembayaran_iduser');

        });
        Schema::dropIfExists('pembayaran');
    }
};
