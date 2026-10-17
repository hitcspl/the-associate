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
        $realEstateUrls = [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        ];
        $randomIndex = fake()->numberBetween(0, count($realEstateUrls) - 1);

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
            'image' => $realEstateUrls[$randomIndex],
            'tag' => fake()->randomElement(['Featured', 'New', 'Luxury', null]),
            'featured' => fake()->boolean(30),
            'status' => fake()->randomElement(['available', 'pending', 'sold']),

            // New columns
            'listing_type' => fake()->randomElement(['sale', 'rent', 'lease']),
            'is_published' => fake()->boolean(80),
            'published_at' => fake()->optional()->dateTimeThisYear(),
            'sort_order' => fake()->numberBetween(0, 10),
            'views' => fake()->numberBetween(0, 500),

            'price_max' => null,
            'price_unit' => 'total',
            'price_label' => null,
            'currency' => 'USD',

            'area_unit' => fake()->randomElement(['sqft', 'sqm', 'acre', 'katha']),
            'lot_size' => fake()->randomFloat(2, 1000, 10000),

            'facing' => fake()->randomElement(['North', 'South', 'East', 'West', null]),
            'furnishing' => fake()->randomElement(['unfurnished', 'semi', 'furnished', null]),
            'floors' => fake()->numberBetween(1, 10),
            'floor_number' => fake()->numberBetween(1, 20),
            'possession_date' => fake()->optional()->dateTimeThisYear(),
            'rera_number' => 'RERA-'.fake()->regexify('[A-Z0-9]{6}'),

            'highlights' => fake()->randomElements(['Corner plot', 'Near highway', 'Gated community', 'Clubhouse', 'Park view', 'Sea view'], 3),
            'specifications' => ['Structure' => fake()->randomElement(['RCC', 'Steel', 'Wood']), 'Flooring' => fake()->randomElement(['Vitrified', 'Marble', 'Tiles']), 'Bathrooms' => fake()->randomElement(['Basic', 'Luxury', 'En-suite']), 'Bedrooms' => fake()->randomElement(['1', '2', '3', '4+']), 'Price range' => '$'.fake()->numberBetween(500000, 5000000).' - $'.fake()->numberBetween(500000, 5000000)],
            'nearby' => [['name' => fake()->streetName(), 'type' => fake()->randomElement(['school', 'hospital', 'mall', 'park'], true), 'distance' => fake()->randomFloat(1, 0.5, 10).' km']],
            'faqs' => [['q' => 'Can I get a discount?', 'a' => fake()->sentence(2)], ['q' => 'What is the RERA number?', 'a' => 'RERA-'.fake()->numberBetween(100000, 999999)]],
            'attributes' => ['Parking' => fake()->boolean(), 'Elevator' => fake()->boolean(), 'Security' => fake()->boolean(), 'Gym' => fake()->boolean()],

            'video_url' => null,
            'virtual_tour_url' => fake()->optional()->imageUrl(800, 600).'/tour',

            'contact_name' => fake()->name(),
            'contact_phone' => '+91 '.fake()->phoneNumber(),
            'contact_email' => fake()->safeEmail(),

            'meta_title' => fake()->sentence(4),
            'meta_description' => fake()->text(200),
        ];
    }
}
