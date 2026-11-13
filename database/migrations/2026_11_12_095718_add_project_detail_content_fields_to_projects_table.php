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
        Schema::table('projects', function (Blueprint $table) {
            $table->json('highlights')->nullable();
            $table->json('amenities')->nullable();
            $table->json('specifications')->nullable();
            $table->json('nearby')->nullable();
            $table->json('faqs')->nullable();
            $table->json('gallery_images')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'highlights',
                'amenities',
                'specifications',
                'nearby',
                'faqs',
                'gallery_images',
            ]);
        });
    }
};
