<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Str;

class RatingGuru extends Model
{
    use HasFactory;

    
    protected $table = 'ratingguru';
     protected $primaryKey = 'idratingguru';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     public function User_Login()
     {
         return $this->belongsTo(UserLogin::class, 'iduser'); // Relasi Many-to-One
     }

        public function Booking()
     {
         return $this->hasMany(Booking::class, 'idbookingprivate'); // Relasi Many-to-One
     }
 


    protected $fillable = [
        'iduser',
        'idprofilguru',
        'bookingprivate',
        'rating',
        'comment',
    ];

      protected static function booted()
    {
        static::creating(function ($model) {
            $model->idratingguru = (string) Str::uuid();
        });
    }

      protected $casts = [
        'response' => 'array',
    ];
}

