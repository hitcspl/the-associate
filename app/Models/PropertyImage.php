<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyImage extends Model
{
    use HasFactory;

    protected $fillable = ['property_id', 'url', 'alt_text', 'sort_order', 'type', 'caption', 'thumbnail_url', 'width', 'height'];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
