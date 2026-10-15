<?php

use App\Models\Passport\Client;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Laravel\Passport\Passport;

test('discovery endpoint returns valid openid configuration', function () {
    $response = $this->getJson('/.well-known/openid-configuration');

    $response->assertOk()
        ->assertJsonStructure([
            'issuer',
            'authorization_endpoint',
            'token_endpoint',
            'userinfo_endpoint',
            'end_session_endpoint',
            'revocation_endpoint',
            'jwks_uri',
            'claims_supported',
        ]);
});

test('revocation endpoint validates token presence', function () {
    $response = $this->postJson('/oauth/token/revoke', []);

    $response->assertStatus(400)
        ->assertJson(['error' => 'invalid_request']);
});

test('revocation endpoint succeeds with dummy or unknown token', function () {
    $response = $this->postJson('/oauth/token/revoke', [
        'token' => 'unknown-token',
    ]);

    $response->assertOk()
        ->assertJson(['revoked' => true]);
});

test('logout endpoint redirects and clears web session', function () {
    $user = User::factory()->create();

    $this->actingAs($user, 'web');

    $this->assertAuthenticated('web');

    $target = 'http://localhost:8001/callback';

    $response = $this->get('/oauth/logout?'.http_build_query([
        'post_logout_redirect_uri' => $target,
        'state' => 'xyz',
    ]));

    $response->assertRedirect('http://localhost:8001/callback?state=xyz');

    $this->assertGuest('web');
});

test('fortify logout clears session and triggers backchannel logout to web clients', function () {
    Http::fake();

    $user = User::factory()->create();

    $client = Client::factory()->create([
        'backchannel_logout_uri' => 'https://elearning.test/api/oidc/backchannel-logout',
    ]);

    Passport::token()->forceFill([
        'id' => Str::random(80),
        'user_id' => $user->id,
        'client_id' => $client->id,
        'scopes' => ['openid'],
        'revoked' => false,
        'expires_at' => now()->addHour(),
    ])->save();

    $this->actingAs($user, 'web');

    $response = $this->post('/logout');

    $response->assertRedirect(route('login'));
    $this->assertGuest('web');

    Http::assertSent(function ($request) use ($client) {
        return $request->url() === $client->backchannel_logout_uri
            && isset($request['logout_token']);
    });
});
