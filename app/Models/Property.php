<?php

namespace App\Models;

use Database\Factories\PropertyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    /** @use HasFactory<PropertyFactory> */
    use HasFactory;

    protected $fillable = [
        'title', 'location', 'city', 'type', 'price', 'beds', 'baths',
        'sqft', 'description', 'image', 'tag', 'featured', 'status',
        'listing_type', 'is_published', 'published_at', 'sort_order', 'views',
        'price_max', 'price_unit', 'price_label', 'currency',
        'area_unit', 'lot_size',
        'facing', 'furnishing', 'floors', 'floor_number', 'possession_date',
        'rera_number',
        'highlights', 'specifications', 'nearby', 'faqs', 'attributes',
        'video_url', 'virtual_tour_url',
        'contact_name', 'contact_phone', 'contact_email',
        'meta_title', 'meta_description',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'featured' => 'boolean',
            'is_published' => 'boolean',
            'highlights' => 'array',
            'specifications' => 'array',
            'nearby' => 'array',
            'faqs' => 'array',
            'attributes' => 'array',
        ];
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyImage::class)->orderBy('sort_order');
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }
}
