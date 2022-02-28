<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDriveApisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drive_apis', function (Blueprint $table) {
            $table->id();

            $table->string('google_drive_id');

            $table->unsignedBigInteger('model_id');
            $table->string('model_type');

            $table->unique(['model_id', 'model_type']);

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
        Schema::dropIfExists('drive_apis');
    }
}
