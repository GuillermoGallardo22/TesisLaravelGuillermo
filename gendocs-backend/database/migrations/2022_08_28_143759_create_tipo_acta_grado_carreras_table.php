<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoActaGradoCarrerasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_acta_grado_carreras', function (Blueprint $table) {
            $table->id();

            $table->foreignId('tipo_acta_grado_id')
                ->references('id')
                ->on('tipo_acta_grados');

            $table->foreignId('carrera_id')
                ->references('id')
                ->on('carreras');

            $table->unique(['carrera_id', 'tipo_acta_grado_id']);

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
        Schema::dropIfExists('tipo_acta_grado_carreras');
    }
}
