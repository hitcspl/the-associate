<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->company().' Residences';

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'project_group_id' => null,
            'location' => fake()->city().', Ranchi',
            'category' => fake()->randomElement(['Residential', 'Commercial', 'Township']),
            'status' => fake()->randomElement(['ongoing', 'completed', 'planned']),
            'completed_at' => null,
            'description' => fake()->paragraph(),
            'image_path' => null,
            'brochure_path' => null,
            'price_from' => null,
            'price_to' => null,
            'currency' => 'INR',
            'is_featured' => false,
            'is_published' => true,
            'sort_order' => 0,
        ];
    }
}
