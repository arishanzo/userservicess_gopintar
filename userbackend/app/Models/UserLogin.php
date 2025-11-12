<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


use Illuminate\Support\Str;

class UserLogin extends Authenticatable
{    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    
    protected $table = 'userlogin';
     protected $primaryKey = 'iduser'; // sesuaikan dengan kolom primary keymu
    public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key
    
    protected $fillable = [
        'nama_user',
        'email',
        'password',
    ];

    
      protected static function booted()
    {
        static::creating(function ($model) {
            $model->iduser = (string) Str::uuid();
        });
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
