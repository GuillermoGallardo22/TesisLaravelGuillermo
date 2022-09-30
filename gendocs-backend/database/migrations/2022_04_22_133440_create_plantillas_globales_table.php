<?php

use App\Constants\MimeType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlantillasGlobalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plantillas_globales', function (Blueprint $table) {
            $table->id();

            $table->string("codigo")->unique();
            $table->string("nombre");

            $table->enum('tipo', [MimeType::DRIVE_DOC, MimeType::DRIVE_SS]);

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
        Schema::dropIfExists('plantillas_globales');
    }
}
