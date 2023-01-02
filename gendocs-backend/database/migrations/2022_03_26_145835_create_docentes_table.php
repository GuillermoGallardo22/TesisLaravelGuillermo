<?php

use App\Constants\Genero;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docentes', function (Blueprint $table) {
            $table->id();

            $table->string('cedula')->unique();
            $table->string('nombres');

            $table->string("correo")->nullable();
            $table->string('correo_uta');

            $table->string('celular');
            $table->string("telefono")->nullable();

            $table->enum('genero', [Genero::MASCULINO, Genero::FEMENINO])->nullable();

            $table->unsignedBigInteger("carrera_id");
            $table->foreign("carrera_id")->references("id")->on("carreras");

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
        Schema::dropIfExists('docentes');
    }
}
