<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return '{ "status": "ok" }';
});

Route::prefix('tasks')->group(function () {
    // Create, Read, Update, Delete
    Route::post('/',         [TaskController::class, 'createTask']);
    Route::get('/',          [TaskController::class, 'getAllTasks']);
    Route::get('/status',    [TaskController::class, 'getAllTasksByStatus']);
    Route::get('/{id}',      [TaskController::class, 'getTask']);
    Route::put('/{id}',      [TaskController::class, 'updateTask']);
    Route::delete('/{id}',   [TaskController::class, 'deleteTask']);

    // Route::post('/',            [BookController::class, 'CreateABook']);
    // Route::get('/',             [BookController::class, 'GetAllBooks']);
    // Route::get('/{bookId}',     [BookController::class, 'GetOneBook']);
    // Route::put('/{bookId}',     [BookController::class, 'UpdateABook']);
    // Route::delete('/{bookId}',  [BookController::class, 'DeleteABook']);
});

Route::prefix('users')->group(function () {
    // Create, Read, Update, Delete
    Route::post('/',    [UserController::class, 'createUser']);
    Route::get('/',     [UserController::class, 'getAllUsers']);
    Route::get('/ids',  [UserController::class, 'getIdUsers']);
    // Route::get('/{id}', [UserController::class, 'getTask']);
    // Route::put('/{id}', [UserController::class, 'updateTask']);
    // Route::delete('/{id}', [UserController::class, 'deleteTask']);
});
