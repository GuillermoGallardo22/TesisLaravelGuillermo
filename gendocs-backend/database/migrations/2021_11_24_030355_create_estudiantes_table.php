<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();

            $table->string("cedula", 10)->unique();

            $table->string("nombres", 50);

            $table->string("apellidos", 50);

            $table->string("celular", 10)->nullable();
            $table->string("telefono", 10)->nullable();

            $table->string("correo", 100)->nullable();
            $table->string("correo_uta", 100)->nullable();

            $table->string("matricula", 10)->nullable();
            $table->string("folio", 10)->nullable();

            $table->unsignedBigInteger("carrera_id");
            $table->foreign("carrera_id")->references("id")->on("carreras");

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
        Schema::dropIfExists('estudiantes');
    }
}
