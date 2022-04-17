<?php

namespace Database\Factories;

use App\Models\Directorio;
use App\Models\TipoConsejo;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConsejoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->words(5, true),
            'fecha' => $this->faker->dateTimeInInterval('+7 days'),
            'tipo_consejo_id' => TipoConsejo::inRandomOrder()->first()->id,
            'directorio_id' => Directorio::activeDirectory()->id,
            'estado' => $this->faker->boolean()
        ];
    }
}
