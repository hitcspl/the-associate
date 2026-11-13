<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectGroup extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'location',
        'category',
        'description',
        'summary',
        'image_path',
        'brochure_path',
        'highlights',
        'amenities',
        'area_details',
        'room_amenities',
        'specifications',
        'nearby',
        'faqs',
        'gallery_images',
        'price_from',
        'price_to',
        'currency',
        'is_featured',
        'is_published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price_from' => 'decimal:2',
            'price_to' => 'decimal:2',
            'highlights' => 'array',
            'amenities' => 'array',
            'area_details' => 'array',
            'room_amenities' => 'array',
            'specifications' => 'array',
            'nearby' => 'array',
            'faqs' => 'array',
            'gallery_images' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class)
            ->orderBy('sort_order')
            ->orderBy('id');
    }
}
