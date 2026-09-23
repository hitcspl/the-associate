<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location');
            $table->string('city');
            $table->string('type');
            $table->decimal('price', 14, 2);
            $table->unsignedSmallInteger('beds');
            $table->unsignedSmallInteger('baths');
            $table->unsignedInteger('sqft');
            $table->text('description')->nullable();
            $table->string('image');
            $table->string('tag')->nullable();
            $table->boolean('featured')->default(false);
            $table->string('status')->default('available');
            $table->timestamps();

            $table->index(['featured', 'status']);
            $table->index(['city', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};