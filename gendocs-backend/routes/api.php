<?php

use App\Http\Controllers\CarreraController;
use App\Http\Controllers\ConsejoController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\GoogleDriveController;
use App\Http\Controllers\PlantillasController;
use App\Http\Controllers\ProcesoController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TipoConsejoController;
use App\Http\Controllers\UserController;
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

Route::middleware(["auth:sanctum", "isUserActive"])->group(function () {

    Route::apiResource('carreras', CarreraController::class);
    Route::apiResource('estudiantes', EstudianteController::class);
    Route::apiResource('procesos', ProcesoController::class);
    Route::apiResource('plantillas', PlantillasController::class);
    Route::apiResource('consejos', ConsejoController::class);
    Route::apiResource('tipo-consejos', TipoConsejoController::class);

    // AUTH
    Route::get('roles', [RoleController::class, 'index']);
    Route::get('me', [UserController::class, 'me']);
    Route::apiResource('user', UserController::class);

    // TEST
    Route::get('my-permissions', [GoogleDriveController::class, 'myPermissions']);
    Route::get('get-file', [GoogleDriveController::class, 'getFile']);
    Route::get('export-file', [GoogleDriveController::class, 'exportFile']);
});
