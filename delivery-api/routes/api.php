<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\AuthController;

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
});
