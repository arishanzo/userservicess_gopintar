<?php

namespace App\Http\Controllers\User;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Cache;

use App\Http\Controllers\Controller;
use App\Http\Requests\PhotoProfilRequest;
use App\Models\ProfilUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpKernel\Profiler\Profile;

class UserProfileController extends Controller
{
    public function getAll () {
        $getAll = ProfilUser::with('User_Login')->get();

           return response()->json([
            'data' => $getAll,
        ]);
    }

    public function getByID ($iduser) {
        
    //  $profil = ProfilUser::with('User_Login')->where('iduser', $iduser)->first();

        $profil = Cache::remember("profil_$iduser", 60, function() use($iduser) {
            return ProfilUser::with('User_Login')->where('iduser', $iduser)->first();
        });


        return response()->json([
            'data' => $profil,
            'message' => $profil ? 'Profil Ada' : 'Profil Tidak Ada'
        ]);

    }

    public function store (PhotoProfilRequest $request) {

        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['iduser'] = $user->iduser;

        
         $cekprofil = ProfilUser::where('iduser', $user->iduser)->first();

        
        if ($request->hasFile('foto_profil')) {

              if ($cekprofil && $cekprofil->foto_profil && Storage::disk(env('PHOTO_PRIVATE_DISK', 'private'))->exists($cekprofil->foto_profil)) {
            Storage::disk(env('PHOTO_PRIVATE_DISK', 'private'))->delete($cekprofil->foto_profil);
           }
       

            $file = $request->file('foto_profil');

           $image = Image::make($file)->encode('webp', 80);

            $encoded = (string) $image->encode();

            $disk = env('PHOTO_PRIVATE_DISK', 'private');
            
            $filename = Str::uuid()->toString().'.webp';

            $path = 'photos/'.date('Y/m/d').'/'.$filename;

            $data['foto_profil'] = $path;
            
            Storage::disk($disk)->put($path, $encoded, 'private');
        } else {
        unset($data['foto_profil']); // jangan overwrite kolom lama kalau tidak ada upload
       }

       $cekprofil = ProfilUser::where('iduser', $user->iduser)->first();

       if($cekprofil){
        $cekprofil->update($data);
       } else {
        ProfilUser::create($data);
       }


        Cache::forget("profil_" . $cekprofil->iduser);

        return response()->json([
            'message' => 'Profile Berhasil Disimpan',
        ], 201);

    }   

    public function ubahpassword(Request $request) {
        
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|string|same:password',
        ],
         [
             'current_password.required' => 'Password Harus Diisi',
             'password.required' => 'Password Harus Diisi',
             'password.min' => 'Password Harus minimal 6 karakter',
            'password_confirmation.same' => 'Password Berbeda Harus Sama',
        ]
    );

        $user = $request->user();
         
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Password lama salah'], 400);
        }
        
        $user->update(['password' => Hash::make($request->password)]);
        
        return response()->json(['message' => 'Password berhasil diubah'], 200);
    }

 public function getPhoto($path) {
        $disk = env('PHOTO_PRIVATE_DISK', 'private');
        $decodedPath = urldecode($path);

        if (!Storage::disk($disk)->exists($decodedPath)) {
            abort(404);
        }

        $file = Storage::disk($disk)->get($decodedPath);
        $type = Storage::disk($disk)->mimeType($decodedPath) ?? 'image/webp';

        return response($file, 200)->header('Content-Type', $type);
    }


    
}
