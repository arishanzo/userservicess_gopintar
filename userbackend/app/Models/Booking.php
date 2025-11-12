<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class Booking extends Model
{
     use HasFactory;

          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'booking';
     protected $primaryKey = 'idbookingprivate';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     public function User_Login()
     {
         return $this->belongsTo(UserLogin::class, 'iduser'); // Relasi Many-to-One
     }

        public function Tgl_Booking_Kelas()
     {
         return $this->hasMany(TglBooking::class, 'idbookingprivate'); // Relasi Many-to-One
     }
 


    protected $fillable = [
        'iduser',
        'idprofilguru',
        'namamurid',
        'namawalimurid',
        'noteleponortu',
        'catatanalamat',
        'kelas',
        'tingkatSekolah',
        'mapeldipilih',
        'tujuanpembelajaran',
        'catatanbooking',
        'statusbooking',
    ];

      protected static function booted()
    {
        static::creating(function ($model) {
            $model->idbookingprivate = (string) Str::uuid();
        });
    }

      protected $casts = [
        'response' => 'array',
    ];
}
