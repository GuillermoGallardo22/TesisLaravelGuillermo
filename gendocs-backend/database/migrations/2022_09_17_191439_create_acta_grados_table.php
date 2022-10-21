<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActaGradosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('acta_grados', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('numero');

            $table->string("titulo_bachiller");

            $table->date("fecha_inicio_estudios");
            $table->date("fecha_fin_estudios")->nullable();

            $table->decimal("creditos_aprobados");
            $table->decimal("horas_practicas")->nullable();

            $table->dateTime("fecha_presentacion")->nullable();

            // $table->foreignId("docente_id") // PRESIDENTE
            //     ->nullable()
            //     ->references("id")
            //     ->on("docentes");

            $table->foreignId("estudiante_id")
                ->references("id")
                ->on("estudiantes");

            $table->foreignId("carrera_id")
                ->references("id")
                ->on("carreras");

            $table->foreignId("canton_id")
                ->references("id")
                ->on("cantones");

            $table->foreignId("tipo_acta_id")
                ->references("id")
                ->on("tipo_acta_grados");

            $table->foreignId("estado_acta_id")
                ->nullable()
                ->references("id")
                ->on("estado_actas");

            $table->foreignId("modalidad_acta_grado_id")
                ->references("id")
                ->on("modalidad_acta_grados");

            $table->foreignId("aula_id")
                ->nullable()
                ->references("id")
                ->on("aulas");

            $table->integer("duracion");

            $table->string("link")
                ->nullable();

            $table->foreignId("directorio_id")
                ->references("id")
                ->on("directorios");

            $table->foreignId("created_user_id")
                ->references("id")
                ->on("users");

            $table->foreignId("updated_user_id")
                ->nullable()
                ->references("id")
                ->on("users");

            $table->boolean("solicitar_especie")->default(false);
            $table->boolean("envio_financiero_especie")->default(false);

            $table->unique(["link", "fecha_presentacion"], "unique_restriction_link_fecha_presentacion");
            // $table->unique(["id", "link", "aula_id"], "unique_restriction.id_link_aula_id");
            $table->unique(["numero", "carrera_id", "directorio_id"], "unique_restriction_numero_carrera_id_directorio_id");

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
        Schema::dropIfExists('acta_grados');
    }
}
