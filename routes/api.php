<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaketPemotretanController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('paket-pemotretan', PaketPemotretanController::class);
});
Route::get('/paket-pemotretan/list', [PaketPemotretanController::class, 'listJson']);
