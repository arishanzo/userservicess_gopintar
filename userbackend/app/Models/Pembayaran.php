<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Str;

class Pembayaran extends Model
{
    use HasFactory;

          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'pembayaran';
     protected $primaryKey = 'idpembayaran';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     public function User_Login()
     {
         return $this->belongsTo(UserLogin::class, 'iduser'); // Relasi Many-to-One
     }
 


    protected $fillable = [
        'iduser',
        'order_id',
        'transaction_id',
        'namapaket',
        'metodepembayaran',
        'jumlahpembayaran',
        'statuspembayaran',
        'tglberakhirpembayaran',
        'va_number',
        'bank',
        'qris_url',
        'redirect_url',
         'payment_code',
        'store',
    ];

      protected static function booted()
    {
        static::creating(function ($model) {
            $model->idpembayaran = (string) Str::uuid();
        });
    }

      protected $casts = [
        'response' => 'array',
    ];

    
}
