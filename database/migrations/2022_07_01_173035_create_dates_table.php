<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dates', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer("task_id")->unsigned();
            $table->foreign("task_id")->references("task_id")->on("tasks")->onDelete("cascade");
            $table->dateTime("date_start")->useCurrent();
            $table->dateTime("date_end");
            $table->dateTime("date_reminder")->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dates');
    }
};
