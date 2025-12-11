<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'numero_commande',
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

    protected static function boot()
{
    parent::boot();

    static::creating(function ($commande) {
        $last = Commande::orderBy('id', 'desc')->first();
        $nextNumber = $last ? ((int) substr($last->numero_commande, 3)) + 1 : 1;
        $commande->numero_commande = 'CM-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    });
}

}
