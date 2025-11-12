<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogRequests
{
    public function handle(Request $request, Closure $next)
    {
        // Log incoming request
        Log::info('Incoming Request', [
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'headers' => $request->headers->all(),
            'body' => $request->all()
        ]);

        $response = $next($request);

        // Log response
        Log::info('Response', [
            'status' => $response->getStatusCode(),
            'content' => $response->getContent()
        ]);

        return $response;
    }
}