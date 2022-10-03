<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNumeracionActaGradosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('numeracion_acta_grados', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('numero');

            // ESTADO DEL NÚMERO
            $table->boolean('usado')
                ->default(false);

            // DEBEN SER REASIGNADOS
            $table->boolean('encolado')
                ->default(false);

            // PARA UNA CARRERA
            $table->foreignId('carrera_id')
                ->nullable()
                ->references('id')
                ->on('carreras');

            //
            $table->unique(['numero', 'carrera_id']);

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
        Schema::dropIfExists('numeracion_acta_grados');
    }
}
