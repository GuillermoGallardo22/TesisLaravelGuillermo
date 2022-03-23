<?php

namespace Database\Factories;

use App\Models\Directorio;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProcesoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $directorio = Directorio::query()->activeDirectory();

        return [
            'nombre' => $this->faker->sentence(10),
            'estado' => $this->faker->boolean(),
            'directorio_id' => $directorio->id,
            //
        ];
    }
}
