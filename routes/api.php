<?php

use App\Http\Controllers\Api\PasskeyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/passkeys/register', [PasskeyController::class, 'registerOptions'])
    ->middleware('auth:sanctum');

Route::get('/passkeys/authenticate', [PasskeyController::class, 'authenticateOptions']);
