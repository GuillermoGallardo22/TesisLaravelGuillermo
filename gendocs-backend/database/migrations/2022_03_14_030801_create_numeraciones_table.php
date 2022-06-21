<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNumeracionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('numeraciones', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('numero');

            // ESTADO DEL NÚMERO
            $table->boolean('usado')
                ->default(false);

            // ES RESERVADO
            $table->boolean('reservado')
                ->default(false);

            // DEBEN SER REASIGNADOS
            $table->boolean('encolado')
                ->default(false);

            // RESERVADO PARA ALGÚN CONSEJO
            $table->foreignId('consejo_id')
                ->nullable()
                ->references('id')
                ->on('consejos');

            $table->foreignId('module_id')
                ->references('id')
                ->on('modules');

            // DIRECTORIO AL QUE PERTENECE EL NÚMERO
            $table->foreignId('directorio_id')
                ->references('id')
                ->on('directorios');

            //
            $table->unique(['numero', 'module_id', 'directorio_id']);

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
        Schema::dropIfExists('numeraciones');
    }
}
