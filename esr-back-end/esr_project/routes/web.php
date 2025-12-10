<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommandeController;

Route::get('/', function () {
    return view('welcome');
});

// Route pour afficher toutes les commandes
Route::get('/commandes', [CommandeController::class, 'index'])->name('commandes.index');

// Route pour créer une commande
Route::post('/commandes', [CommandeController::class, 'store'])->name('commandes.store');
