<?php

namespace App\Exports;

use App\Models\Commande;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
class CommandesExport implements FromCollection , WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Commande::all();
    }

    public function headings(): array
    {
        return [
            'Numéro commande',
            'Fournisseur',
            'Type ciment',
            'Quantité (T)',
            'Montant',
            'Chauffeur',
            'Num Camion',
            'Num Permis',
            'Destination',
            'Date',
            'Statut',
            'Créé le'
        ];
    }

     /**
     * Mapper chaque ligne (dans l’ordre des headings)
     */
    public function map($cmd): array
    {
        return [
            $cmd->numero_commande,
            $cmd->fournisseur,
            $cmd->type_ciment,
            $cmd->quantite,
            $cmd->montant_ciment,
            $cmd->nom_chauffeur,
            $cmd->num_camion,
            $cmd->num_permis,
            $cmd->destination,
            $cmd->date,
            $cmd->statut,
            $cmd->created_at->format('Y-m-d H:i'),
        ];
    }
}
