<?php

use App\Http\Controllers\OpenIDConnect\DiscoveryController;
use App\Http\Controllers\OpenIDConnect\JwksController;
use App\Http\Controllers\OpenIDConnect\LogoutController;
use App\Http\Controllers\OpenIDConnect\RevocationController;
use Illuminate\Support\Facades\Route;

Route::get('/.well-known/openid-configuration', DiscoveryController::class)->name('openid.discovery');
Route::match(['GET', 'POST'], '/oauth/logout', LogoutController::class)->name('openid.end_session_endpoint');
Route::post('/oauth/token/revoke', RevocationController::class)->name('openid.revocation_endpoint');
Route::get('/oauth/jwks', JwksController::class)->name('openid.jwks');
