<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlantillasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plantillas', function (Blueprint $table) {
            $table->id();

            $table->string("nombre");

            $table->string("nombre_documento");
            $table->string("ruta_documento");

            $table->string("variables");

            $table->string("descripcion");

            $table->unsignedBigInteger("proceso_id");
            $table->foreign("proceso_id")->references("id")->on("procesos");

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
        Schema::dropIfExists('plantillas');
    }
}
