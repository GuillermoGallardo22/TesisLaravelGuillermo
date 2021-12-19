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

            $table->unsignedBigInteger("consejo_id");
            $table->foreign("consejo_id")->references("id")->on("consejos");

            $table->unsignedBigInteger("miembro_id");
            $table->foreign("miembro_id")->references("id")->on("miembros");

            $table->boolean("responsable");

            $table->unique(["consejo_id", "miembro_id", "responsable"]);

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
