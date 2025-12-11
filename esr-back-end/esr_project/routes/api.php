<?php

use App\Http\Controllers\CommandeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
// API pour afficher toutes les commandes
Route::get('/commandes', [CommandeController::class, 'index']);

// API pour créer une commande
Route::post('/commandes', [CommandeController::class, 'store']);

// API pour afficher une commande
Route::get('/commandes/{id}', [CommandeController::class, 'show']);

// API pour mettre à jour une commande
Route::put('/commandes/{id}', [CommandeController::class, 'update']);

// API pour supprimer une commande
Route::delete('/commandes/{id}', [CommandeController::class, 'destroy']);
});