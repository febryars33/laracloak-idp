<?php

namespace App\Passport;

use Laravel\Passport\Bridge\AccessToken as PassportAccessToken;
use League\OAuth2\Server\Entities\Traits\AccessTokenTrait;
use League\OAuth2\Server\Entities\Traits\EntityTrait;

class CustomAccessToken extends PassportAccessToken
{
    use AccessTokenTrait, EntityTrait;

    private function convertToJWT()
    {
        $publicKeyRaw = str_replace('\\n', "\n", config('passport.public_key') ?? '');
        if (! $publicKeyRaw) {
            $publicKeyPath = storage_path('oauth-public.key');
            $publicKeyRaw = file_exists($publicKeyPath) ? file_get_contents($publicKeyPath) : '';
        }

        $kid = config('openid.token_headers.kid') ?: md5($publicKeyRaw);

        return $this->jwtConfiguration->builder()
            ->permittedFor($this->getClient()->getIdentifier())
            ->identifiedBy($this->getIdentifier())
            ->issuedAt(new \DateTimeImmutable)
            ->canOnlyBeUsedAfter(new \DateTimeImmutable)
            ->expiresAt($this->getExpiryDateTime())
            ->relatedTo((string) $this->getUserIdentifier())
            ->withClaim('scopes', $this->getScopes())
            ->withHeader('kid', $kid)
            ->getToken($this->jwtConfiguration->signer(), $this->jwtConfiguration->signingKey());
    }
}
