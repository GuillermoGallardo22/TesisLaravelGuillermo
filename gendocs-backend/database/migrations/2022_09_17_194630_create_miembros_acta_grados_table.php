<?php

use App\Constants\TipoAsistenteActaGrado;
use App\Constants\UniqueConstraintNames;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMiembrosActaGradosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('miembros_acta_grados', function (Blueprint $table) {
            $table->id();

            $table->foreignId("acta_grado_id")
                ->references("id")
                ->on("acta_grados");

            $table->foreignId("docente_id")
                ->references("id")
                ->on("docentes");

            $table->enum('tipo', [TipoAsistenteActaGrado::TUTOR, TipoAsistenteActaGrado::M_PRINCIPAL, TipoAsistenteActaGrado::M_SUPLENTE, TipoAsistenteActaGrado::PRESIDENTE]);

            $table->string("informacion_adicional")->nullable();

            $table->boolean("asistio")->default(false);
            $table->boolean("notificado")->default(false);

            $table->unique(['acta_grado_id', 'docente_id'], UniqueConstraintNames::ACTA_GRADO_ACTA_GRADO_ID_DOCENTE_ID);

            $table->softDeletes();
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
        Schema::dropIfExists('miembros_acta_grados');
    }
}
