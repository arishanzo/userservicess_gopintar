<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Str;

class TglBooking extends Model
{
      use HasFactory;

          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'tglbooking';
     protected $primaryKey = 'idtglbooking';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     public function User_Login()
     {
         return $this->belongsTo(UserLogin::class, 'iduser'); // Relasi Many-to-One
     }
 


    protected $fillable = [
        'iduser',
        'idprofilguru',
        'idbookingprivate',
        'tglbooking',
        'sesi',
        'statusngajar',
    ];

    
      protected static function booted()
    {
        static::creating(function ($model) {
            $model->idtglbooking = (string) Str::uuid();
        });
    }


      protected $casts = [
        'response' => 'array',
    ];
}
