<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Date>
 */
class DateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "task_id"=>function (array $attributes) {
                return Task::find($attributes['task_id'])->type;
            },
            "date_start"=>now(),
            "date_end"=>fake()->dateTimeBetween("2022-01-01", "2024-12-31"),
            "date_reminder"=>fake()->dateTimeBetween("2022-01-01", "2024-12-31"),
        ];
    }
}


