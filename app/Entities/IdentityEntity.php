<?php

namespace App\Entities;

use App\Models\User;
use League\OAuth2\Server\Entities\Traits\EntityTrait;
use OpenIDConnect\Claims\Traits\WithClaims;
use OpenIDConnect\Entities\Traits\WithCustomPermittedFor;
use OpenIDConnect\Interfaces\IdentityEntityInterface;

class IdentityEntity implements IdentityEntityInterface
{
    use EntityTrait, WithClaims, WithCustomPermittedFor;

    protected User $user;

    public function setIdentifier(string $identifier): void
    {
        $this->identifier = $identifier;
        $this->user = User::findOrFail($identifier);
    }

    /**
     * @param  string[]  $scopes
     * @return array<string, mixed>
     */
    public function getClaims(array $scopes = []): array
    {
        return [
            'name' => $this->user->name,
            'email' => $this->user->email,
            'email_verified' => $this->user->hasVerifiedEmail(),
            'picture' => $this->user->avatar,
            'updated_at' => $this->user->updated_at?->timestamp,
        ];
    }
}
