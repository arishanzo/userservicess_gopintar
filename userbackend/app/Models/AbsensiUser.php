<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class AbsensiUser extends Model
{
    use HasFactory;
    protected $table = 'absensi_user';
    protected $primaryKey = 'idabsensi';
    public $incrementing = false;
    protected $keyType = 'string';

       public function User_Login()
     {
         return $this->belongsTo(UserLogin::class, 'iduser'); // Relasi Many-to-One
     }

     protected $fillable = [
        'iduser', 
        'idtglbooking',  
        'tanggal',
        'sesi',
        'statusabsen',
     ];

             protected static function booted()
    {
        static::creating(function ($model) {
            $model->idabsensi= (string) Str::uuid();
        });
    }

     protected $casts = [
        'response' => 'array',
    ];
}
