<?php

namespace App\Http\Controllers;

use App\Models\ImpactStat;
use App\Models\Property;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $properties = Property::query()
            ->where('status', 'available')
            ->where('featured', true)
            ->with('images')
            ->orderBy('id')
            ->get()
            ->map(fn (Property $property): array => $this->propertyData($property))
            ->values();

        return Inertia::render('welcome', [
            'heroSlides' => $properties,
            'properties' => $properties,
            'services' => Service::query()->orderBy('sort_order')->get([
                'id', 'title', 'description', 'icon', 'sort_order',
            ]),
            'impactStats' => ImpactStat::query()->orderBy('sort_order')->get([
                'id', 'label', 'value', 'sort_order',
            ]),
            'testimonials' => Testimonial::query()->orderBy('sort_order')->get([
                'id', 'quote', 'author', 'role', 'avatar', 'location', 'image',
            ]),
            'siteImages' => [
                'about' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                'impact' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=70',
                'cta' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=70',
            ],
        ]);
    }

    /** @return array<string, mixed> */
    private function propertyData(Property $property): array
    {
        return [
            'id' => $property->id,
            'title' => $property->title,
            'location' => $property->location,
            'city' => $property->city,
            'type' => $property->type,
            'price' => (float) $property->price,
            'beds' => $property->beds,
            'baths' => $property->baths,
            'sqft' => $property->sqft,
            'image' => $property->image,
            'tag' => $property->tag,
            'description' => $property->description,
            'images' => $property->images->pluck('url')->values()->all(),
        ];
    }
}