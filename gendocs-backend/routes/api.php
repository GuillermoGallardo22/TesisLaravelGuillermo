<?php

use App\Http\Controllers\CarreraController;
use App\Http\Controllers\EstudianteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('carreras', CarreraController::class);
Route::apiResource('estudiantes', EstudianteController::class);
Route::post('estudiantes-list', [EstudianteController::class, 'storeList']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
