<?php

namespace Database\Factories;

use App\Models\Proceso;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlantillasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->sentence(4),
            'estado' => $this->faker->boolean(),
            'proceso_id' => Proceso::where('estado', true)->inRandomOrder()->first()->id,
            'user_id' => User::inRandomOrder()->first()->id,
        ];
    }
}
