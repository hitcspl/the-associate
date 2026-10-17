<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Run AFTER 2026_09_22_000001_create_properties_table.
 * Adds flexible pricing/area, listing details, rich JSON content, SEO,
 * publishing controls, and typed gallery images.
 *
 * Idempotent: uses hasColumn() so it can be re-run safely (columns added
 * by an earlier partial execution are skipped).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            // Listing
            if (! Schema::hasColumn('properties', 'listing_type')) {
                $table->string('listing_type')->default('sale')->after('type');
            }   // sale | rent | lease
            if (! Schema::hasColumn('properties', 'is_published')) {
                $table->boolean('is_published')->default(true);
            }
            if (! Schema::hasColumn('properties', 'published_at')) {
                $table->timestamp('published_at')->nullable();
            }
            if (! Schema::hasColumn('properties', 'sort_order')) {
                $table->unsignedInteger('sort_order')->default(0);
            }
            if (! Schema::hasColumn('properties', 'views')) {
                $table->unsignedInteger('views')->default(0);
            }

            // Flexible pricing (price itself stays nullable)
            if (! Schema::hasColumn('properties', 'price_max')) {
                $table->unsignedBigInteger('price_max')->nullable()->after('price');      // for ranges
            }
            if (! Schema::hasColumn('properties', 'price_unit')) {
                $table->string('price_unit')->default('total')->after('price_max');       // total | per_sqft | per_month
            }
            if (! Schema::hasColumn('properties', 'price_label')) {
                $table->string('price_label')->nullable()->after('price_unit');           // "Starting from", "Price on request"
            }
            if (! Schema::hasColumn('properties', 'currency')) {
                $table->string('currency', 3)->default('USD')->after('price_label');
            }

            // Area
            if (! Schema::hasColumn('properties', 'area_unit')) {
                $table->string('area_unit')->default('sqft')->after('sqft');              // sqft | sqm | acre | katha | decimal
            }
            if (! Schema::hasColumn('properties', 'lot_size')) {
                $table->decimal('lot_size', 12, 2)->nullable()->after('area_unit');
            }

            // Building details
            if (! Schema::hasColumn('properties', 'facing')) {
                $table->string('facing')->nullable();
            }
            if (! Schema::hasColumn('properties', 'furnishing')) {
                $table->string('furnishing')->nullable();                                 // unfurnished | semi | furnished
            }
            if (! Schema::hasColumn('properties', 'floors')) {
                $table->unsignedSmallInteger('floors')->nullable();
            }
            if (! Schema::hasColumn('properties', 'floor_number')) {
                $table->smallInteger('floor_number')->nullable();
            }
            if (! Schema::hasColumn('properties', 'possession_date')) {
                $table->date('possession_date')->nullable();
            }
            if (! Schema::hasColumn('properties', 'rera_number')) {
                $table->string('rera_number')->nullable();
            }

            // Rich content (JSON so new items never need a migration)
            if (! Schema::hasColumn('properties', 'highlights')) {
                $table->json('highlights')->nullable();        // ["Corner plot", "Near highway"]
            }
            if (! Schema::hasColumn('properties', 'specifications')) {
                $table->json('specifications')->nullable();    // {"Structure": "RCC", "Flooring": "Vitrified"}
            }
            if (! Schema::hasColumn('properties', 'nearby')) {
                $table->json('nearby')->nullable();            // [{"name": "...", "type": "school", "distance": "1.2 km"}]
            }
            if (! Schema::hasColumn('properties', 'faqs')) {
                $table->json('faqs')->nullable();              // [{"q": "...", "a": "..."}]
            }
            if (! Schema::hasColumn('properties', 'attributes')) {
                $table->json('attributes')->nullable();        // catch-all for anything else
            }

            // Media
            if (! Schema::hasColumn('properties', 'video_url')) {
                $table->string('video_url')->nullable();
            }
            if (! Schema::hasColumn('properties', 'virtual_tour_url')) {
                $table->string('virtual_tour_url')->nullable();
            }

            // Contact override
            if (! Schema::hasColumn('properties', 'contact_name')) {
                $table->string('contact_name')->nullable();
            }
            if (! Schema::hasColumn('properties', 'contact_phone')) {
                $table->string('contact_phone')->nullable();
            }
            if (! Schema::hasColumn('properties', 'contact_email')) {
                $table->string('contact_email')->nullable();
            }

            // SEO
            if (! Schema::hasColumn('properties', 'meta_title')) {
                $table->string('meta_title')->nullable();
            }
            if (! Schema::hasColumn('properties', 'meta_description')) {
                $table->string('meta_description', 320)->nullable();
            }

            if (! Schema::hasColumn('properties', 'deleted_at')) {
                $table->softDeletes();
            }

            // Indexes
            // Drop old index only if it exists, then create new one
            if (Schema::hasIndex('properties', 'properties_city_type_index')) {
                $table->dropIndex('properties_city_type_index');
            }
            $table->index(['city', 'type'], 'properties_city_type_index');

            // Fix duplicate index issue - drop the existing index before recreating
            if (Schema::hasIndex('properties', 'properties_is_published_status_index')) {
                $table->dropIndex('properties_is_published_status_index');
            }
            $table->index(['is_published', 'status'], 'properties_is_published_status_index');

            if (Schema::hasIndex('properties', 'properties_listing_type_featured_index')) {
                $table->dropIndex('properties_listing_type_featured_index');
            }
            $table->index(['listing_type', 'featured'], 'properties_listing_type_featured_index');
        });

        // Typed images: gallery / floor_plan / layout / site_plan ...
        Schema::table('property_images', function (Blueprint $table) {
            if (! Schema::hasColumn('property_images', 'type')) {
                $table->string('type')->default('gallery')->after('property_id');
            }
            if (! Schema::hasColumn('property_images', 'caption')) {
                $table->string('caption')->nullable();
            }
            if (! Schema::hasColumn('property_images', 'thumbnail_url')) {
                $table->string('thumbnail_url')->nullable();
            }
            if (! Schema::hasColumn('property_images', 'width')) {
                $table->unsignedSmallInteger('width')->nullable();
            }
            if (! Schema::hasColumn('property_images', 'height')) {
                $table->unsignedSmallInteger('height')->nullable();
            }

            // The old index (property_id, sort_order) is needed for the FK constraint,
            // so only add the new composite index if it doesn't exist.
            if (! Schema::hasIndex('property_images', 'property_images_property_id_type_sort_order_index')) {
                $table->index(['property_id', 'type', 'sort_order'], 'property_images_property_id_type_sort_order_index');
            }
        });
    }

    public function down(): void
    {
        Schema::table('property_images', function (Blueprint $table) {
            // Only drop the new composite index if it exists
            if (Schema::hasIndex('property_images', 'property_images_property_id_type_sort_order_index')) {
                $table->dropIndex('property_images_property_id_type_sort_order_index');
            }
            // Keep the original index (property_id, sort_order) for the FK constraint
        });

        Schema::table('properties', function (Blueprint $table) {
            // Only drop indexes that exist
            if (Schema::hasIndex('properties', 'properties_is_published_status_index')) {
                $table->dropIndex('properties_is_published_status_index');
            }
            if (Schema::hasIndex('properties', 'properties_city_type_index')) {
                $table->dropIndex('properties_city_type_index');
            }
            if (Schema::hasIndex('properties', 'properties_listing_type_featured_index')) {
                $table->dropIndex('properties_listing_type_featured_index');
            }
            $table->dropSoftDeletes();
            $table->dropColumn([
                'listing_type', 'is_published', 'published_at', 'sort_order', 'views',
                'price_max', 'price_unit', 'price_label', 'currency',
                'area_unit', 'lot_size',
                'facing', 'furnishing', 'floors', 'floor_number', 'possession_date', 'rera_number',
                'highlights', 'specifications', 'nearby', 'faqs', 'attributes',
                'video_url', 'virtual_tour_url',
                'contact_name', 'contact_phone', 'contact_email',
                'meta_title', 'meta_description',
            ]);
        });
    }
};
