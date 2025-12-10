<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Client\MenuController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\ProductTypeController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\SettingsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Rotas da API da aplicação Delivery
|--------------------------------------------------------------------------
*/

//Rota pública — Login
Route::post('/login', [AuthController::class, 'login']);

// Rota pública — Cardápio do Cliente
Route::get('/menu', [MenuController::class, 'index']);


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

        // SETTINGS...
        Route::get('/admin/settings',  [SettingsController::class, 'show']);
        Route::put('/admin/settings',  [SettingsController::class, 'update']);
    });

    // ---------------------
    //   ROTAS DE PRODUTOS (Admin e Caixa podem usar)
    // ---------------------

    // Tipos de produto (categorias)
    Route::get('/product-types',        [ProductTypeController::class, 'index']);
    Route::post('/product-types',       [ProductTypeController::class, 'store']);
    Route::get('/product-types/{id}',   [ProductTypeController::class, 'show']);
    Route::put('/product-types/{id}',   [ProductTypeController::class, 'update']);
    Route::delete('/product-types/{id}',[ProductTypeController::class, 'destroy']);

    // Produtos
    Route::get('/products',             [ProductController::class, 'index']);
    Route::post('/products',            [ProductController::class, 'store']);
    Route::get('/products/{id}',        [ProductController::class, 'show']);
    Route::put('/products/{id}',        [ProductController::class, 'update']);
    Route::delete('/products/{id}',     [ProductController::class, 'destroy']);
});
