<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'project_group_id',
        'location',
        'category',
        'status',
        'completed_at',
        'description',
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
        'progress_images',
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
            'completed_at' => 'date',
            'highlights' => 'array',
            'amenities' => 'array',
            'area_details' => 'array',
            'room_amenities' => 'array',
            'specifications' => 'array',
            'nearby' => 'array',
            'faqs' => 'array',
            'gallery_images' => 'array',
            'progress_images' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function projectGroup(): BelongsTo
    {
        return $this->belongsTo(ProjectGroup::class);
    }
}
