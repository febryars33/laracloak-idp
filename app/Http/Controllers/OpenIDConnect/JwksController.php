<?php

namespace App\Http\Controllers\OpenIDConnect;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Passport\Passport;

class JwksController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): JsonResponse
    {
        $jwks = [
            'keys' => [
                $this->jwk(),
            ],
        ];

        return response()->json($jwks, 200, [], JSON_PRETTY_PRINT);
    }

    public function pem(): string
    {
        $raw = str_replace('\\n', "\n", config('passport.public_key') ?? '');

        return $raw ?: 'file://'.Passport::keyPath('oauth-public.key');
    }

    public function jwk(): array
    {
        $details = openssl_pkey_get_details(openssl_pkey_get_public($this->pem()));

        $jwk = [
            'alg' => 'RS256',
            'kty' => 'RSA',
            'use' => 'sig',
            'n' => $this->encode($details['rsa']['n']),
            'e' => $this->encode($details['rsa']['e']),
        ];

        // Solusi Fix KID: Menggunakan config, fallback ke md5 hash jika kosong
        $jwk['kid'] = config('openid.token_headers.kid') ?: md5($this->pem());

        return $jwk;
    }

    private function encode(string $data): string
    {
        return rtrim(str_replace(['+', '/'], ['-', '_'], base64_encode($data)), '=');
    }
}
