<?php

namespace Database\Factories;

use App\Models\ImpactStat;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<ImpactStat> */
class ImpactStatFactory extends Factory
{
    protected $model = ImpactStat::class;

    public function definition(): array
    {
        return [
            'label' => fake()->words(2, true),
            'value' => (string) fake()->numberBetween(1, 99),
            'sort_order' => 0,
        ];
    }
}