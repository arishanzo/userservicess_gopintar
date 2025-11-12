<?php

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Services\ServiceClient;
use Illuminate\Http\Request;

class ServiceCommunicationController extends Controller
{
    private $serviceClient;

    public function __construct(ServiceClient $serviceClient)
    {
        $this->serviceClient = $serviceClient;
    }

    public function getUserProfile(Request $request, $userId)
    {
        $result = $this->serviceClient->getUserData($userId);
        
        if (!$result['success']) {
            return response()->json([
                'error' => 'Failed to fetch user data',
                'message' => $result['error'] ?? 'Service unavailable'
            ], $result['status']);
        }

        return response()->json($result['data']);
    }

    public function getGuruProfile(Request $request, $guruId)
    {
        $result = $this->serviceClient->getGuruData($guruId);
        
        if (!$result['success']) {
            return response()->json([
                'error' => 'Failed to fetch guru data',
                'message' => $result['error'] ?? 'Service unavailable'
            ], $result['status']);
        }

        return response()->json($result['data']);
    }

    public function getAllGurus()
    {
        $result = $this->serviceClient->getAllGurus();
        
        if (!$result['success']) {
            return response()->json([
                'error' => 'Gagal mengambil data guru',
                'message' => $result['error'] ?? 'Service tidak tersedia'
            ], $result['status'] ?? 500);
        }

        return response()->json([
            'success' => true,
            'data' => $result['data']['data'] ?? []
        ]);
    }

    public function crossServiceData(Request $request)
    {
        $userId = $request->input('user_id');
        $guruId = $request->input('guru_id');

        $responses = [];

        if ($userId) {
            $userResult = $this->serviceClient->getUserData($userId);
            $responses['user'] = $userResult['success'] ? $userResult['data'] : null;
        }

        if ($guruId) {
            $guruResult = $this->serviceClient->getGuruData($guruId);
            $responses['guru'] = $guruResult['success'] ? $guruResult['data'] : null;
        }

        return response()->json($responses);
    }



    
    public function getAllKegiatanBelajar($idbookingprivate)
    {
        $result = $this->serviceClient->getAllKegiatanBelajar($idbookingprivate);
        
         
        if (!$result['success']) {
            return response()->json([
                'error' => 'Failed to fetch user data',
                'message' => $result['error'] ?? 'Service unavailable'
            ], $result['status']);
        }

        return response()->json($result['data']);
    }

     public function putTugasKelas(Request $request, $idtugasbelajar)
        {
            $payload = [
                'status' => $request->status ?? 'selesai',
            ];

        
            $result = $this->serviceClient->putTugasKelas($idtugasbelajar, $payload);

            if (!$result['success']) {
                return response()->json([
                    'error' => 'Failed to update Tugas Nilai',
                    'message' => $result['error'] ?? 'Service unavailable'
                ], $result['status']);
            }

            return response()->json($result['data'], $result['status']);
        }




        public function getAllTugasKelas($idbookingprivate)
    {
        $result = $this->serviceClient->getAllTugasKelas($idbookingprivate);
        
         
        if (!$result['success']) {
            return response()->json([
                'error' => 'Failed to fetch user data',
                'message' => $result['error'] ?? 'Service unavailable'
            ], $result['status']);
        }

        return response()->json($result['data']);
    }
}