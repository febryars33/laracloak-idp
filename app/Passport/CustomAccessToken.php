<?php

namespace App\Passport;

use Laravel\Passport\Bridge\AccessToken as PassportAccessToken;
use League\OAuth2\Server\Entities\Traits\AccessTokenTrait;
use League\OAuth2\Server\Entities\Traits\EntityTrait;

class CustomAccessToken extends PassportAccessToken
{
    use AccessTokenTrait, EntityTrait;

    /**
     * Override method untuk memodifikasi JWT Header sebelum di-sign
     */
    private function convertToJWT()
    {
        // Ambil public key yang sama dengan yang dipakai JwksController
        $publicKeyRaw = str_replace('\\n', "\n", config('passport.public_key') ?? '');
        if (! $publicKeyRaw) {
            $publicKeyRaw = file_get_contents(storage_path('oauth-public.key')); // sesuaikan path key Anda
        }

        // Generate KID yang sama persis dengan JwksController
        $kid = config('openid.token_headers.kid') ?: md5($publicKeyRaw);

        return $this->jwtConfiguration->builder()
            ->permittedFor($this->getClient()->getIdentifier())
            ->identifiedBy($this->getIdentifier())
            ->issuedAt(new \DateTimeImmutable)
            ->canOnlyBeUsedAfter(new \DateTimeImmutable)
            ->expiresAt($this->getExpiryDateTime())
            ->relatedTo((string) $this->getUserIdentifier())
            ->withClaim('scopes', $this->getScopes())
            // --- KUNCI PERBAIKAN: Suntikkan KID ke Header Token ---
            ->withHeader('kid', $kid)
            ->getToken($this->jwtConfiguration->signer(), $this->jwtConfiguration->signingKey());
    }
}
