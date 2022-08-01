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
        Schema::create('tasks', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments("task_id");
            $table->longText('task_description');
            $table->text('task_title');
            $table->integer("user_id")->unsigned();
            $table->foreign("user_id")->references("user_id")->on("users")->onDelete("cascade");
            $table->integer("state_id")->unsigned();
            $table->foreign("state_id")->references("state_id")->on("states")->onDelete("cascade");
            $table->integer("type_id")->unsigned();
            $table->foreign("type_id")->references("type_id")->on("types")->onDelete("cascade");
            $table->integer("category_id")->unsigned();
            $table->foreign("category_id")->references("category_id")->on("categories")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }

};
