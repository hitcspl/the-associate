<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Service> */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        return [
            'title' => fake()->words(2, true),
            'description' => fake()->sentence(),
            'icon' => 'home',
            'sort_order' => fake()->numberBetween(0, 3),
        ];
    }
}