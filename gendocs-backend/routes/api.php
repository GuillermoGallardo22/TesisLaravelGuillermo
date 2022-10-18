<?php

use App\Http\Controllers\ActaController;
use App\Http\Controllers\ActaGradoController;
use App\Http\Controllers\AulaController;
use App\Http\Controllers\BatchController;
use App\Http\Controllers\CantonController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\ConsejoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\EstadoActaController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\MiembroController;
use App\Http\Controllers\ModalidadActaGradoController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\NumeracionActaGradoController;
use App\Http\Controllers\NumeracionController;
use App\Http\Controllers\PlantillasController;
use App\Http\Controllers\PlantillasGlobalesController;
use App\Http\Controllers\ProcesoController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TipoActaGradoController;
use App\Http\Controllers\TipoConsejoController;
use App\Http\Controllers\UserController;
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

    Route::apiResource('docentes', DocenteController::class)->except(['destroy']);
    Route::apiResource('carreras', CarreraController::class)->except(['destroy', 'store']);
    Route::apiResource('procesos', ProcesoController::class)->except(['destroy']);
    Route::apiResource('plantillas', PlantillasController::class)->except(['destroy']);
    Route::apiResource('tipo-consejos', TipoConsejoController::class)->only(['index']);
    Route::apiResource('documentos', DocumentoController::class)->except(['show', 'update']);
    Route::apiResource('batch', BatchController::class)->only(['show']);
    Route::apiResource("plantillas-globales", PlantillasGlobalesController::class)->only(['index']);

    Route::apiResource('miembros', MiembroController::class)->except(['show']);

    Route::apiResource('notificaciones', NotificacionController::class)->only('store');

    Route::apiResource('estudiantes', EstudianteController::class)->except(['destroy']);
    Route::post('estudiantes/email-notificacion', [EstudianteController::class, 'sendNotificationEmail']);

    Route::apiResource('consejos', ConsejoController::class);
    Route::patch('consejos/{consejo}/cerrar', [ConsejoController::class, 'cerrar']);

    Route::apiResource('actas', ActaController::class)->only(['index', 'store', 'show']);
    Route::put('actas/{acta}/plantilla', [ActaController::class, 'crearPlantilla']);
    Route::get('actas/{acta}/descargar', [ActaController::class, 'descargar']);

    Route::apiResource('cargos', CargoController::class);

    Route::apiResource('cantones', CantonController::class)->only('index');
    Route::apiResource('tipo-actas-grado', TipoActaGradoController::class)->only('index');
    Route::apiResource('estado-actas-grado', EstadoActaController::class)->only('index');
    Route::apiResource('aulas', AulaController::class)->only('index');
    Route::apiResource('modalidades-acta-grado', ModalidadActaGradoController::class)->only('index');

    Route::apiResource("acta-grado", ActaGradoController::class);

    Route::apiResource('numeracion', NumeracionController::class)->only(['index', 'store']);
    Route::apiResource('numeracion-acta-grado', NumeracionActaGradoController::class)->only(['index']);

    // AUTH
    Route::apiResource('modulos', ModuleController::class)->only(['index']);
    Route::get('me', [UserController::class, 'me']);
    Route::put('user/profile', [UserController::class, 'updateProfile']);
    Route::put('user/password', [UserController::class, 'updatePassword']);
    Route::post('user/reset-password', [UserController::class, 'resetPassword']);
    Route::apiResource('user', UserController::class)->except(['destroy']);

    Route::get('roles', [RoleController::class, 'index']);
});
