<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentoDocentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documento_docentes', function (Blueprint $table) {
            $table->id();

            $table->foreignId("documento_id")
                ->references("id")
                ->on("documentos");

            $table->foreignId("docente_id")
                ->references("id")
                ->on("docentes");

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
        Schema::dropIfExists('documento_docentes');
    }
}
