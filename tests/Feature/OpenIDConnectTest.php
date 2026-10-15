<?php

use App\Models\User;

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
