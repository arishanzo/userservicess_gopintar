<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;


use Illuminate\Support\Str;

class ProfilUser extends Model
{
    use HasFactory;

    
         /**
     * fillable
     *
     * @var array
     */
    protected $table = 'profiluser';
     protected $primaryKey = 'idprofiluser';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     public function User_Login()
     {
         return $this->belongsTo(UserLogin::class, 'iduser'); // Relasi Many-to-One
     }
 


    protected $fillable = [
        'iduser',
        'foto_profil',
        'alamatlengkap',
        'no_telp',
        'kelurahan',
        'kecamatan',
        'kabupaten',
        'provinsi',
        'kode_pos',
        'nama_anak',
        'usia_anak',
    ];

    
      protected static function booted()
    {
        static::creating(function ($model) {
            $model->idprofiluser = (string) Str::uuid();
        });
    }

    


      public function getPhotoUrlAttribute()
    {
        return $this->photo_path ? Storage::url($this->photo_path) : null;
    }

     protected $casts = [
        'response' => 'array',
    ];
}
