<?php

namespace App\Http\Controllers\OpenIDConnect;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Passport\Passport;

class RevocationController extends Controller
{
    /**
     * Handle token revocation according to RFC 7009.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $token = $request->input('token');
        $hint = $request->input('token_type_hint');

        if (! $token) {
            return response()->json(['error' => 'invalid_request'], 400);
        }

        $this->revoke($token, $hint);

        return response()->json(['revoked' => true]);
    }

    /**
     * Revoke access or refresh token.
     */
    protected function revoke(string $token, ?string $hint): void
    {
        if ($hint === 'refresh_token') {
            $this->refresh($token);

            return;
        }

        if ($this->access($token)) {
            return;
        }

        $this->refresh($token);
    }

    /**
     * Revoke access token and its refresh token.
     */
    protected function access(string $token): bool
    {
        $id = $this->parse($token) ?? $token;

        $record = Passport::token()->newQuery()->find($id);

        if (! $record) {
            return false;
        }

        $record->revoke();
        $record->refreshToken?->revoke();

        return true;
    }

    /**
     * Revoke refresh token and its access token.
     */
    protected function refresh(string $token): bool
    {
        $record = Passport::refreshToken()->newQuery()->find($token);

        if (! $record) {
            return false;
        }

        $record->revoke();
        $record->accessToken?->revoke();

        return true;
    }

    /**
     * Extract token identifier from JWT string.
     */
    protected function parse(string $token): ?string
    {
        try {
            $segments = explode('.', $token);

            if (count($segments) !== 3) {
                return null;
            }

            $payload = json_decode(base64_decode(strtr($segments[1], '-_', '+/')), true);

            return $payload['jti'] ?? null;
        } catch (\Throwable) {
            return null;
        }
    }
}
