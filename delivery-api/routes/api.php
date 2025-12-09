<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Admin\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Rotas da API da aplicação Delivery
|--------------------------------------------------------------------------
*/

//Rota pública — Login
Route::post('/login', [AuthController::class, 'login']);


//Rotas protegidas (somente com token Sanctum)
Route::middleware('auth:sanctum')->group(function () {

    // Retorna o usuário autenticado
    Route::get('/me', [AuthController::class, 'me']);

    // Logout (revogação de token)
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rota padrão do Laravel (opcional)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ---------------------
    //   ROTAS ADMIN
    // ---------------------
    Route::middleware('can:is-admin')->group(function () {

        Route::get('/admin/users',           [UserController::class, 'index']);
        Route::post('/admin/users',          [UserController::class, 'store']);
        Route::get('/admin/users/{id}',      [UserController::class, 'show']);
        Route::put('/admin/users/{id}',      [UserController::class, 'update']);
        Route::delete('/admin/users/{id}',   [UserController::class, 'destroy']);

        Route::post('/admin/users/{id}/reset-password', [UserController::class, 'resetPassword']);
    });
});
