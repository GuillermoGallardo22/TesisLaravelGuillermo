<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateFechaInicioEstudiosToActaGrados extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('acta_grados', function (Blueprint $table) {
            $table->date("fecha_inicio_estudios")->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('acta_grados', function (Blueprint $table) {
            $table->date("fecha_inicio_estudios")->change();
        });
    }
}
