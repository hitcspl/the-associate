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
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'featured' => 'boolean',
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