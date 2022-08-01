<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;
use App\Models\Type;
use App\Models\State;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "user_id"=>rand(1,User::count()),
            "category_id"=>rand(1,Category::count()),
            "state_id"=>rand(1,State::count()),
            "type_id"=>rand(1,Type::count()),
            "task_description"=>fake()->text(),  
            "task_title"=>fake()->paragraph(1),
        ];
    }
}
