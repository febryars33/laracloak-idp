<?php

namespace App\Services;

use App\Models\Passport\Client;
use App\Models\User;
use DateTimeImmutable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Laravel\Passport\Passport;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Signer\Rsa\Sha256;
use stdClass;
use Throwable;

class LogoutService
{
    /**
     * Notify all web clients via back-channel logout.
     */
    public function notify(User $user): void
    {
        $clients = $this->clients($user);

        foreach ($clients as $client) {
            $this->dispatch($client, $user);
        }
    }

    /**
     * Dispatch logout request to a specific client.
     */
    protected function dispatch(Client $client, User $user): void
    {
        if (! $client->backchannel_logout_uri) {
            return;
        }

        try {
            $token = $this->token($client, $user);

            Http::asForm()->timeout(3)->post($client->backchannel_logout_uri, [
                'logout_token' => $token,
            ]);
        } catch (Throwable) {
            // Silently ignore unreachable client to avoid blocking logout
        }
    }

    /**
     * Generate standard OIDC logout token.
     */
    public function token(Client $client, User $user): string
    {
        $signer = app(config('openid.signer', Sha256::class));

        $private = InMemory::file(Passport::keyPath('oauth-private.key'));
        $public = InMemory::file(Passport::keyPath('oauth-public.key'));

        $config = Configuration::forAsymmetricSigner($signer, $private, $public);

        $now = new DateTimeImmutable;

        $jwt = $config->builder()
            ->issuedBy(config('app.url'))
            ->permittedFor($client->id)
            ->relatedTo($user->id)
            ->identifiedBy(Str::uuid()->toString())
            ->issuedAt($now)
            ->withClaim('events', [
                'http://schemas.openid.net/event/backchannel-logout' => new stdClass,
            ])
            ->getToken($config->signer(), $config->signingKey());

        return $jwt->toString();
    }

    /**
     * Retrieve active web clients for the user.
     *
     * @return Collection<int, Client>
     */
    public function clients(User $user): Collection
    {
        return Client::query()
            ->whereNotNull('backchannel_logout_uri')
            ->whereHas('tokens', function ($query) use ($user): void {
                $query->where('user_id', $user->id)
                    ->where('revoked', false)
                    ->where('expires_at', '>', now());
            })
            ->get();
    }
}

