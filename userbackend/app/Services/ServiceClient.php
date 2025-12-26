<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ServiceClient
{
    private $baseUrls = [
        'userservices' => 'http://localhost:8001/api',
        'guruservices' => 'http://localhost:8000/api'
    ];

   
public function call($service, $endpoint, $method = 'GET', $data = [], $headers = [])
{
    if (!isset($this->baseUrls[$service])) {
        throw new \Exception("Service {$service} not configured");
    }

    $url = rtrim($this->baseUrls[$service], '/') . '/' . ltrim($endpoint, '/');

    $defaultHeaders = [
        'Content-Type'  => 'application/json',
        'Accept'        => 'application/json',
        'X-Service-Key' => env('SERVICE_AUTH_KEY', 'your-secret-key'),
    ];

    $headers = array_merge($defaultHeaders, $headers);

    try {
        $client = Http::withHeaders($headers)->timeout(30);

        // Pastikan method uppercase
        $method = strtoupper($method);

        switch ($method) {
            case 'GET':
                $response = $client->get($url, $data);
                break;

            case 'POST':
                $response = $client->post($url, $data);
                break;

            case 'PUT':
                $response = $client->put($url, $data);
                break;

            case 'PATCH':
                $response = $client->patch($url, $data);
                break;

            case 'DELETE':
                $response = $client->delete($url, $data);
                break;

            default:
                throw new \InvalidArgumentException("Unsupported HTTP method: {$method}");
        }

        // Better error handling
        if ($response->failed()) {
            return [
                'success' => false,
                'status'  => $response->status(),
                'error'   => $response->json('message') ?? 'Request failed',
                'data'    => $response->json(),
            ];
        }

        return [
            'success' => true,
            'status'  => $response->status(),
            'data'    => $response->json(),
            'body'    => $response->body(),
        ];
    } catch (\Illuminate\Http\Client\ConnectionException $e) {
        return [
            'success' => false,
            'status'  => 503,
            'error'   => 'Service unavailable: ' . $e->getMessage(),
            'data'    => null,
        ];
    } catch (\Illuminate\Http\Client\RequestException $e) {
        return [
            'success' => false,
            'status'  => $e->response ? $e->response->status() : 500,
            'error'   => 'Request failed: ' . $e->getMessage(),
            'data'    => $e->response ? $e->response->json() : null,
        ];
    } catch (\Exception $e) {
        return [
            'success' => false,
            'status'  => 500,
            'error'   => $e->getMessage(),
            'data'    => null,
        ];
    }
}

    public function getUserData($userId)
    {
        return $this->call('userservices', "profile/{$userId}", 'GET');
    }

    public function getGuruData($guruId)
    {
        return $this->call('guruservices', "profile/{$guruId}", 'GET');
    }

    public function getAllGurus()
    {
        return $this->call('guruservices', 'services/gurus', 'GET');
    }

     public function getAllKegiatanBelajar($idbookingprivate)
    {
        return $this->call('guruservices', "services/kegiatanbelajar/{$idbookingprivate}", 'GET');
    }

      public function getAbsensiGuru($idprofilguru)
    {
        return $this->call('guruservices', "services/absensiguru/{$idprofilguru}", 'GET');
    }

     public function getAllTugasKelas($idbookingprivate)
    {
        return $this->call('guruservices', "services/tugaskelas/{$idbookingprivate}", 'GET');
    }

     public function putTugasKelas($idtugasbelajar, array $data = [])
        {
            return $this->call('guruservices',"services/puttugaskelas/{$idtugasbelajar}", 'PUT', $data );
        }

          public function putSaldoMasuk($idguru, array $data = [])
        {
            return $this->call('guruservices',"services/putsaldomasuk/{$idguru}", 'PUT', $data );
        }
}