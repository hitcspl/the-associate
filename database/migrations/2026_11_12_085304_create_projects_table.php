<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('location');
            $table->string('category');
            $table->text('description')->nullable();
            $table->text('phase_summary')->nullable();
            $table->string('image_path')->nullable();
            $table->string('brochure_path')->nullable();
            $table->decimal('price_from', 14, 2)->nullable();
            $table->decimal('price_to', 14, 2)->nullable();
            $table->string('currency', 3)->default('INR');
            $table->boolean('is_featured')->default(false);
            $table->boolean('has_multiple_phases')->default(false);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
