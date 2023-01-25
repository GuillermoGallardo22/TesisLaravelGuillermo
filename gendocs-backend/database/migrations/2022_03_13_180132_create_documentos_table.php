<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documentos', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('numero');

            $table->foreignId('consejo_id')
                ->references('id')
                ->on('consejos');

            $table->foreignId('plantilla_id')
                ->references('id')
                ->on('plantillas');

            $table->foreignId('estudiante_id')
                ->nullable()
                ->references('id')
                ->on('estudiantes');

            $table->foreignId('autor_id')
                ->references('id')
                ->on('users');

            $table->text('descripcion')
                ->nullable();

            $table->json('variables')
                ->nullable();

            $table->boolean('notificado_w')->default(false);
            $table->boolean('notificado_e')->default(false);

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
        Schema::dropIfExists('documentos');
    }
}
