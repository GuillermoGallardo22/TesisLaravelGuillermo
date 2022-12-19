<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCeldasNotasTipoActaGradosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('celdas_notas_tipo_acta_grados', function (Blueprint $table) {
            $table->id();

            $table->foreignId("tipo_acta_grado_id")
                ->references('id')
                ->on('tipo_acta_grados');

            $table->string("celda");

            $table->string("variable_nota");
            $table->string("variable_nota_texto");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('celdas_notas_tipo_acta_grados');
    }
}
