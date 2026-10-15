<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;

class AuthService
{
    protected ?User $user;

    public function __construct(Request $request)
    {
        $this->user = $request->user();
    }

    public function user(): ?array
    {
        if (! $this->user) {
            return null;
        }

        return $this->user->only(['id', 'name', 'email']);
    }

    public function roles(): array
    {
        return $this->user ? $this->user->getRoleNames()->toArray() : [];
    }

    public function permissions(): array
    {
        return $this->user ? $this->user->getAllPermissions()->pluck('name')->toArray() : [];
    }
}
