<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'quote', 'author', 'role', 'avatar', 'location', 'image', 'sort_order',
    ];
}