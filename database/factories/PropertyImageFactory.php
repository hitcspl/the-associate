<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<PropertyImage> */
class PropertyImageFactory extends Factory
{
    protected $model = PropertyImage::class;

    public function definition(): array
    {
        return [
            'property_id' => Property::factory(),
            'url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'alt_text' => fake()->sentence(3),
            'sort_order' => 0,
        ];
    }
}