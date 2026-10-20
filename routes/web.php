<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/', HomeController::class)->name('home');
    Route::inertia('/blank', 'blank')->name('blank');

    Route::get('/settings/profile', ProfileController::class)->name('settings.profile.index');
});
