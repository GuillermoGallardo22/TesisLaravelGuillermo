<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMiembrosActaGradosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('miembros_acta_grados', function (Blueprint $table) {
            $table->id();

            $table->foreignId("acta_grado_id")
                ->references("id")
                ->on("acta_grados");

            $table->foreignId("docente_principal_id")
                ->references("id")
                ->on("docentes");

            $table->foreignId("docente_suplente_id")
                ->references("id")
                ->on("docentes");

            $table->boolean("asistio_principal");
            $table->boolean("asistio_suplente");

            $table->boolean("notificado_principal");
            $table->boolean("notificado_suplente");

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
        Schema::dropIfExists('miembros_acta_grados');
    }
}
