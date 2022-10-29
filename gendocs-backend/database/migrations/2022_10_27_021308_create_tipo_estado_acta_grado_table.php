<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoEstadoActaGradoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_estado_acta_grado', function (Blueprint $table) {
            $table->id();

            $table->foreignId("tipo_acta_grado_id")
                ->references('id')
                ->on('tipo_acta_grados');

            $table->foreignId("estado_acta_grado_id")
                ->references('id')
                ->on('estado_actas');

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
        Schema::dropIfExists('tipo_estado_acta_grado');
    }
}
