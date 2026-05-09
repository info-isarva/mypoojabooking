<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\TempleController;
use App\Http\Controllers\Api\PanchangaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/temples', [TempleController::class, 'index']);
Route::get('/temples/popular', [TempleController::class, 'popular']);
Route::get('/panchanga', [PanchangaController::class, 'index']);


