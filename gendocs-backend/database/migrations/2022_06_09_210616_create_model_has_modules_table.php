<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModelHasModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('model_has_modules', function (Blueprint $table) {
            $table->id();

            $table->foreignId('module_id')
                ->references('id')
                ->on('modules');

            $table->string('model_type');
            $table->unsignedBigInteger('model_id');

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
        Schema::dropIfExists('model_has_modules');
    }
}
