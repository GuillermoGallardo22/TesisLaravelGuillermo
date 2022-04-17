<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actas', function (Blueprint $table) {
            $table->id();

            // El id de proceso en segundo plano
            $table->uuid('batch')
                ->nullable();

            // La ruta donde se encuentra los documentos procesados
            $table->string('output_path')
                ->nullable();

            $table->foreignId("consejo_id")
                ->references("id")
                ->on("consejos");

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
        Schema::dropIfExists('actas');
    }
}
