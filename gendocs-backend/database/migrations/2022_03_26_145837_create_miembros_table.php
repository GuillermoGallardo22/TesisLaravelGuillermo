<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMiembrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('miembros', function (Blueprint $table) {
            $table->id();

            $table->foreignId("consejo_id")
                ->references("id")
                ->on("consejos");

            $table->foreignId("docente_id")
                ->references("id")
                ->on("docentes");

            $table->boolean("notificado")->default(false);
            $table->boolean("asistio")->default(false);
            $table->boolean("responsable")->default(false);

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
        Schema::dropIfExists('miembros');
    }
}
