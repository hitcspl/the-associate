<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        // Drop FK constraints so we can truncate without worrying about image rows.
        Schema::disableForeignKeyConstraints();
        Property::query()->delete();
        PropertyImage::query()->delete();
        Schema::enableForeignKeyConstraints();

        Property::factory()->count(20)->create()->each(function (Property $property) {
            // Main gallery image
            PropertyImage::create([
                'property_id' => $property->id,
                'url' => $property->image,
                'alt_text' => $property->title,
                'sort_order' => 0,
                'type' => 'gallery',
                'caption' => $property->title,
                'thumbnail_url' => $property->image,
                'width' => 800,
                'height' => 600,
            ]);

            // A couple of extra gallery shots + a floor plan
            PropertyImage::factory()->count(2)->create([
                'property_id' => $property->id,
                'sort_order' => fake()->numberBetween(1, 5),
                'type' => 'gallery',
            ]);
            PropertyImage::factory()->create([
                'property_id' => $property->id,
                'sort_order' => 10,
                'type' => 'floor_plan',
            ]);
        });
    }
}
