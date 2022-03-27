<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsejosMiembrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consejos_miembros', function (Blueprint $table) {
            $table->id();

            $table->foreignId("consejo_id")
                ->references("id")
                ->on("consejos");

            $table->foreignId("miembro_id")
                ->references("id")
                ->on("docentes");

            $table->boolean("notificado")->default(false);
            $table->boolean("asistira")->default(false);
            $table->boolean("responsable")->default(false);

            $table->unique(["consejo_id", "miembro_id"]);

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
        Schema::dropIfExists('consejos_miembros');
    }
}
