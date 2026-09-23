<?php

namespace Database\Factories;

use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Property> */
class PropertyFactory extends Factory
{
    protected $model = Property::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(2),
            'location' => fake()->city().', '.fake()->stateAbbr(),
            'city' => fake()->city(),
            'type' => fake()->randomElement(['Villa', 'Loft', 'Penthouse', 'Residence']),
            'price' => fake()->numberBetween(500000, 5000000),
            'beds' => fake()->numberBetween(1, 6),
            'baths' => fake()->numberBetween(1, 5),
            'sqft' => fake()->numberBetween(900, 6000),
            'description' => fake()->paragraph(),
            'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
            'tag' => null,
            'featured' => false,
            'status' => 'available',
        ];
    }
}