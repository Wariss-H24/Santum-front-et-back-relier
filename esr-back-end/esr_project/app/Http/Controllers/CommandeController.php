<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;

class CommandeController extends Controller
{
    // Méthode pour afficher toutes les commandes
    public function index()
    {
        return response()->json(Commande::all());
    }

    // Méthode pour créer une commande
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'fournisseur' => 'required|string',
            'type_ciment' => 'required|string',
            'quantite' => 'required|integer',
            'montant_ciment' => 'required|numeric',
            'nom_chauffeur' => 'required|string',
            'num_camion' => 'required|string',
            'num_permis' => 'required|string',
            'destination' => 'required|string',
            'date' => 'required|date',
            // use in: to validate enum values
            'statut' => 'nullable|in:livrer,en_attente',
        ]);

        $commande = Commande::create($validatedData);

        return response()->json($commande, 201);
    }

    // Méthode pour afficher une commande
    public function show($id)
    {
        $commande = Commande::findOrFail($id);
        return response()->json($commande);
    }

    // Méthode pour mettre à jour une commande
    public function update(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);

        $validatedData = $request->validate([
            'fournisseur' => 'sometimes|required|string',
            'type_ciment' => 'sometimes|required|string',
            'quantite' => 'sometimes|required|integer',
            'montant_ciment' => 'sometimes|required|numeric',
            'nom_chauffeur' => 'sometimes|required|string',
            'num_camion' => 'sometimes|required|string',
            'num_permis' => 'sometimes|required|string',
            'destination' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'statut' => 'sometimes|in:livrer,en_attente',
        ]);

        $commande->update($validatedData);

        return response()->json($commande);
    }

    // Méthode pour supprimer une commande
    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();

        return response()->json(null, 204);
    }
}
