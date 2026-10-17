<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    public function index(Request $request): Response
    {
        $properties = Property::select([
            'id', 'title', 'location', 'city', 'status', 'type', 'featured',
            'image', 'listing_type', 'price',
        ])
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('properties/properties', [
            'properties' => $properties,
        ]);
    }

    public function show(Request $request, $id): Response
    {
        $property = Property::with('images')->findOrFail($id);

        return Inertia::render('property/property', [
            'property' => $property,
        ]);
    }
}
