<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'fournisseur',
        'type_ciment',
        'quantite',
        'montant_ciment',
        'nom_chauffeur',
        'num_camion',
        'num_permis',
        'destination',
        'date',
        'statut',
    ];


}
