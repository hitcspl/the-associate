<?php

namespace Database\Seeders;

use App\Models\Property;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        $properties = [
            [
                'title' => 'Modern Residence', 'location' => 'Beverly Hills, CA', 'city' => 'Beverly Hills',
                'type' => 'Residence', 'price' => 2450000, 'beds' => 4, 'baths' => 3, 'sqft' => 3500,
                'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
                'featured' => true, 'tag' => 'Featured',
            ],
            [
                'title' => 'Luxury Villa', 'location' => 'Malibu, CA', 'city' => 'Malibu',
                'type' => 'Villa', 'price' => 3200000, 'beds' => 5, 'baths' => 4, 'sqft' => 4200,
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                'featured' => true, 'tag' => 'Exclusive',
            ],
            [
                'title' => 'Urban Loft', 'location' => 'New York, NY', 'city' => 'New York',
                'type' => 'Loft', 'price' => 1250000, 'beds' => 2, 'baths' => 2, 'sqft' => 1800,
                'image' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
                'featured' => true, 'tag' => 'New Listing',
            ],
            [
                'title' => 'Penthouse Suite', 'location' => 'Miami, FL', 'city' => 'Miami',
                'type' => 'Penthouse', 'price' => 2950000, 'beds' => 3, 'baths' => 3, 'sqft' => 2800,
                'image' => 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
                'featured' => true, 'tag' => 'Luxury',
            ],
        ];

        foreach ($properties as $data) {
            $property = Property::updateOrCreate(
                ['title' => $data['title']],
                [...$data, 'status' => 'available'],
            );

            $property->images()->updateOrCreate(
                ['sort_order' => 0],
                ['url' => $data['image'], 'alt_text' => $data['title']],
            );
        }
    }
}