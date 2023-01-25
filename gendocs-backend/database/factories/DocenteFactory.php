<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DocenteFactory extends Factory
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
            "nombres" => preg_replace('/\s+/', ' ', implode(' ', [
                $this->faker->firstName(),
                $this->faker->optional()->firstName(),
                $this->faker->lastName(),
                $this->faker->optional()->lastName(),
            ])),
            'correo_uta' => $this->faker->lexify('????@uta.edu.ec'),
            "celular" => $this->faker->regexify('09(8|9)[0-9]{7}'),
        ];
    }
}
