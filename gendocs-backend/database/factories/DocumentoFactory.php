<?php

namespace Database\Factories;

use App\Models\Consejo;
use App\Models\Estudiante;
use App\Models\Plantillas;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $consejo = Consejo::where('estado', 1)->inRandomOrder()->first();
        $plantilla = Plantillas::where('estado', 1)->inRandomOrder()->first();
        $estudiante = Estudiante::inRandomOrder()->first();
        $autor = User::inRandomOrder()->first();

        return [
            'numero' => $this->faker->numberBetween(1, 99999),
            'consejo_id' => $consejo->id,
            'plantilla_id' => $plantilla->id,
            'estudiante_id' => $estudiante->id,
            'autor_id' => $autor->id,
            'descripcion' => $this->faker->optional()->sentence(15)
        ];
    }
}
