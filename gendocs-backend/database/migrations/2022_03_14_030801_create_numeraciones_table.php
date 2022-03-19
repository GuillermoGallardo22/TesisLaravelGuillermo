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

            $table->unsignedBigInteger('numero')->unique();

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
