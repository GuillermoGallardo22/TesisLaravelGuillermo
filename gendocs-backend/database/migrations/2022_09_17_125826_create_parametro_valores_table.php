<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParametroValoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parametro_valores', function (Blueprint $table) {
            $table->id();

            $table->string("codigo");
            $table->string("valor");
            $table->string("descripcion");

            $table->foreignId("parametro_id")
                ->references("id")
                ->on("parametros");

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
        Schema::dropIfExists('parametro_valores');
    }
}
