<?php

namespace Database\Seeders;

use App\Models\Passport\Client;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OAuthClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::query()->firstOrCreate(
            ['name' => 'E-Learning Client'],
            [
                'secret' => Str::random(40),
                'redirect' => 'http://localhost:8001/auth/callback,http://elearning.mylocalhost.test/auth/callback',
                'backchannel_logout_uri' => 'http://elearning.mylocalhost.test/api/oidc/backchannel-logout',
                'personal_access_client' => false,
                'password_client' => false,
                'revoked' => false,
            ]
        );
    }
}
