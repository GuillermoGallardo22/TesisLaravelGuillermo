<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarrerasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carreras', function (Blueprint $table) {
            $table->id();

            $table->string("nombre");
            $table->boolean("estado")->default(true);

            // Columna para determinar si es una nueva o antigua carrera (carreras que desaparecerá)
            $table->boolean("desaparecera")->default(false);

            $table->string("titulo_mas");
            $table->string("titulo_fem");

            $table->integer("creditos");
            $table->string("coordinador");

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carreras');
    }
}
