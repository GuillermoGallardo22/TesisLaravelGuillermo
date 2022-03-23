<?php

namespace Database\Factories;

use App\Models\Carrera;
use Illuminate\Database\Eloquent\Factories\Factory;

class EstudianteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "cedula" => $this->faker->numerify("##########"),
            "nombres" => $this->faker->firstName(),
            "apellidos" => $this->faker->lastName(),
            "celular" => $this->faker->optional()->regexify('09(8|9)[0-9]{7}'),
            "telefono" => $this->faker->optional()->numerify('0######'),
            'correo' => $this->faker->optional()->email(),
            'correo_uta' => $this->faker->optional()->lexify('????@uta.edu.ec'),
            'carrera_id' => Carrera::inRandomOrder()->first()->id,
            'matricula' => $this->faker->optional()->numerify('0###'),
            'folio' => $this->faker->optional()->numerify('0###'),
        ];
    }
}
