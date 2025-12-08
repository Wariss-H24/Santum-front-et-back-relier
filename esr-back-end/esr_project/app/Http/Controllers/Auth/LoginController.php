<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class LoginController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
      ]);

      // Logique pour vérifier les informations d'identification de l'utilisateur (à implémenter)
       $user =User::where('email', $request->email)->first();
       if (!$user || !Hash::check($request->password, $user->password)) {
           return response()->json(['message' => 'Invalid credentials'], 401);
       }

       // Générer un token d'authentification (à implémenter)
         $token = $user->createToken('auth_token')->plainTextToken;


        // Logique de connexion 
        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }
}
