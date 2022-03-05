<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsejosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consejos', function (Blueprint $table) {
            $table->id();

            $table->string("nombre");
            $table->dateTime("fecha");
            $table->boolean('estado')->default(true); // true = Abierto | false = Cerrado

            $table->unsignedBigInteger("directorio_id");
            $table->foreign("directorio_id")->references("id")->on("directorios");

            $table->unsignedBigInteger("tipo_consejo_id");
            $table->foreign("tipo_consejo_id")->references("id")->on("tipo_consejos");

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
        Schema::dropIfExists('consejos');
    }
}
