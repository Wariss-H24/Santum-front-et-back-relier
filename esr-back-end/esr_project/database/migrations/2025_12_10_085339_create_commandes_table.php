<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->string('fournisseur');
            $table->string('type_ciment');
            $table->integer('quantite');
            $table->decimal('montant_ciment', 10, 2);
            $table->string('nom_chauffeur');
            $table->string('num_camion');
            $table->string('num_permis');
            $table->string('destination');
            $table->date('date');
            $table->enum('statut', ['livrer', 'en_attente'])->default('en_attente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
