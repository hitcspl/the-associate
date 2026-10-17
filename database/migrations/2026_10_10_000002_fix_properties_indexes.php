<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            // Create missing index for city and type
            if (! Schema::hasIndex('properties', 'properties_city_type_index')) {
                $table->index(['city', 'type'], 'properties_city_type_index');
            }

            // Create missing index for is_published and status
            if (! Schema::hasIndex('properties', 'properties_is_published_status_index')) {
                $table->index(['is_published', 'status'], 'properties_is_published_status_index');
            }
        });
    }

    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            // Drop the indexes we created
            if (Schema::hasIndex('properties', 'properties_city_type_index')) {
                $table->dropIndex('properties_city_type_index');
            }
            if (Schema::hasIndex('properties', 'properties_is_published_status_index')) {
                $table->dropIndex('properties_is_published_status_index');
            }
        });
    }
};
