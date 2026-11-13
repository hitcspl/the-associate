<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $developmentRecords = DB::table('projects')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
        $phaseRecords = DB::table('project_phases')
            ->orderBy('project_id')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->groupBy('project_id');

        Schema::create('project_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('location');
            $table->string('category');
            $table->text('description')->nullable();
            $table->text('summary')->nullable();
            $table->string('image_path')->nullable();
            $table->string('brochure_path')->nullable();
            $table->json('highlights')->nullable();
            $table->json('amenities')->nullable();
            $table->json('area_details')->nullable();
            $table->json('room_amenities')->nullable();
            $table->json('specifications')->nullable();
            $table->json('nearby')->nullable();
            $table->json('faqs')->nullable();
            $table->json('gallery_images')->nullable();
            $table->decimal('price_from', 14, 2)->nullable();
            $table->decimal('price_to', 14, 2)->nullable();
            $table->string('currency', 3)->default('INR');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });

        foreach ($developmentRecords as $development) {
            DB::table('project_groups')->insert([
                'id' => $development->id,
                'name' => $development->name,
                'slug' => $development->slug,
                'location' => $development->location,
                'category' => $development->category,
                'description' => $development->description,
                'summary' => $development->phase_summary,
                'image_path' => $development->image_path,
                'brochure_path' => $development->brochure_path,
                'highlights' => $development->highlights,
                'amenities' => $development->amenities,
                'area_details' => $development->area_details,
                'room_amenities' => $development->room_amenities,
                'specifications' => $development->specifications,
                'nearby' => $development->nearby,
                'faqs' => $development->faqs,
                'gallery_images' => $development->gallery_images,
                'price_from' => $development->price_from,
                'price_to' => $development->price_to,
                'currency' => $development->currency,
                'is_featured' => $development->is_featured,
                'is_published' => $development->is_published,
                'sort_order' => $development->sort_order,
                'created_at' => $development->created_at,
                'updated_at' => $development->updated_at,
            ]);
        }

        Schema::dropIfExists('project_phases');
        Schema::drop('projects');

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_group_id')
                ->nullable()
                ->constrained('project_groups')
                ->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('location');
            $table->string('category');
            $table->string('status', 20)->default('planned');
            $table->date('completed_at')->nullable();
            $table->text('description')->nullable();
            $table->string('image_path')->nullable();
            $table->string('brochure_path')->nullable();
            $table->json('highlights')->nullable();
            $table->json('amenities')->nullable();
            $table->json('area_details')->nullable();
            $table->json('room_amenities')->nullable();
            $table->json('specifications')->nullable();
            $table->json('nearby')->nullable();
            $table->json('faqs')->nullable();
            $table->json('gallery_images')->nullable();
            $table->decimal('price_from', 14, 2)->nullable();
            $table->decimal('price_to', 14, 2)->nullable();
            $table->string('currency', 3)->default('INR');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'status', 'sort_order']);
            $table->index(['project_group_id', 'sort_order']);
        });

        $usedSlugs = [];
        $sortOrder = 0;

        foreach ($developmentRecords as $development) {
            /** @var Collection<int, object> $developmentPhases */
            $developmentPhases = $phaseRecords->get($development->id, collect());

            if ($developmentPhases->isEmpty()) {
                $this->insertProject(
                    $development,
                    null,
                    'Project',
                    $development->slug,
                    $development->location,
                    'planned',
                    null,
                    null,
                    $sortOrder++,
                    $usedSlugs,
                );

                continue;
            }

            foreach ($developmentPhases as $phaseIndex => $phase) {
                $slug = $phaseIndex === 0
                    ? $development->slug
                    : Str::slug($development->slug.'-'.$phase->name);

                if (isset($usedSlugs[$slug])) {
                    $slug .= '-'.$phase->id;
                }

                $this->insertProject(
                    $development,
                    $phase,
                    $phase->name,
                    $slug,
                    $phase->location ?? $development->location,
                    $phase->status,
                    $phase->completed_at,
                    $phase->description,
                    $sortOrder++,
                    $usedSlugs,
                );
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $projectGroups = DB::table('project_groups')->get()->keyBy('id');
        $projects = DB::table('projects')
            ->orderBy('project_group_id')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        foreach ($projects as $project) {
            foreach ([
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
            ] as $detailColumn) {
                if ($project->{$detailColumn} !== null) {
                    throw new RuntimeException(
                        'Project-specific details cannot be represented by the previous phase schema. Back up these details before rolling back this migration.',
                    );
                }
            }
        }

        Schema::drop('projects');
        Schema::drop('project_groups');

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

        Schema::table('projects', function (Blueprint $table) {
            $table->json('highlights')->nullable();
            $table->json('amenities')->nullable();
            $table->json('specifications')->nullable();
            $table->json('nearby')->nullable();
            $table->json('faqs')->nullable();
            $table->json('gallery_images')->nullable();
            $table->json('area_details')->nullable();
            $table->json('room_amenities')->nullable();
        });

        Schema::create('project_phases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('status')->default('ongoing');
            $table->text('description')->nullable();
            $table->date('completed_at')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['project_id', 'name']);
            $table->index(['project_id', 'status', 'sort_order']);
        });

        Schema::table('project_phases', function (Blueprint $table) {
            $table->string('location')->nullable()->after('name');
        });

        foreach ($projectGroups as $group) {
            $groupProjects = $projects
                ->where('project_group_id', $group->id)
                ->values();

            DB::table('projects')->insert([
                'id' => $group->id,
                'name' => $group->name,
                'slug' => $group->slug,
                'location' => $group->location,
                'category' => $group->category,
                'description' => $group->description,
                'phase_summary' => $group->summary,
                'image_path' => $group->image_path,
                'brochure_path' => $group->brochure_path,
                'highlights' => $group->highlights,
                'amenities' => $group->amenities,
                'area_details' => $group->area_details,
                'room_amenities' => $group->room_amenities,
                'specifications' => $group->specifications,
                'nearby' => $group->nearby,
                'faqs' => $group->faqs,
                'gallery_images' => $group->gallery_images,
                'price_from' => $group->price_from,
                'price_to' => $group->price_to,
                'currency' => $group->currency,
                'is_featured' => $group->is_featured,
                'has_multiple_phases' => $groupProjects->count() > 1,
                'is_published' => $group->is_published,
                'sort_order' => $group->sort_order,
                'created_at' => $group->created_at,
                'updated_at' => $group->updated_at,
            ]);

            foreach ($groupProjects as $phaseSortOrder => $project) {
                $phaseId = DB::table('projects')->insertGetId([
                    'name' => $project->name,
                    'slug' => $project->slug,
                    'location' => $project->location,
                    'category' => $project->category,
                    'description' => $project->description,
                    'image_path' => $project->image_path,
                    'brochure_path' => $project->brochure_path,
                    'price_from' => $project->price_from,
                    'price_to' => $project->price_to,
                    'currency' => $project->currency,
                    'is_featured' => $project->is_featured,
                    'is_published' => $project->is_published,
                    'sort_order' => $phaseSortOrder,
                    'created_at' => $project->created_at,
                    'updated_at' => $project->updated_at,
                ]);

                DB::table('project_phases')->insert([
                    'id' => $phaseId,
                    'project_id' => $group->id,
                    'name' => $project->name,
                    'location' => $project->location,
                    'status' => $project->status,
                    'description' => $project->description,
                    'completed_at' => $project->completed_at,
                    'sort_order' => $phaseSortOrder,
                    'created_at' => $project->created_at,
                    'updated_at' => $project->updated_at,
                ]);
            }
        }

        foreach ($projects->whereNull('project_group_id') as $project) {
            $projectId = DB::table('projects')->insertGetId([
                'name' => $project->name,
                'slug' => $project->slug,
                'location' => $project->location,
                'category' => $project->category,
                'description' => $project->description,
                'image_path' => $project->image_path,
                'brochure_path' => $project->brochure_path,
                'price_from' => $project->price_from,
                'price_to' => $project->price_to,
                'currency' => $project->currency,
                'is_featured' => $project->is_featured,
                'is_published' => $project->is_published,
                'sort_order' => $project->sort_order,
                'created_at' => $project->created_at,
                'updated_at' => $project->updated_at,
            ]);

            DB::table('project_phases')->insert([
                'id' => $projectId,
                'project_id' => $projectId,
                'name' => 'Project',
                'location' => $project->location,
                'status' => $project->status,
                'description' => $project->description,
                'completed_at' => $project->completed_at,
                'sort_order' => 0,
                'created_at' => $project->created_at,
                'updated_at' => $project->updated_at,
            ]);
        }
    }

    /**
     * @param  array<string, bool>  $usedSlugs
     */
    private function insertProject(
        object $development,
        ?object $phase,
        string $name,
        string $slug,
        string $location,
        string $status,
        ?string $completedAt,
        ?string $description,
        int $sortOrder,
        array &$usedSlugs,
    ): void {
        if (isset($usedSlugs[$slug])) {
            $slug .= '-'.$sortOrder;
        }

        $usedSlugs[$slug] = true;

        DB::table('projects')->insert([
            'project_group_id' => $development->id,
            'name' => $name,
            'slug' => $slug,
            'location' => $location,
            'category' => $development->category,
            'status' => $status,
            'completed_at' => $completedAt,
            'description' => $description,
            'is_featured' => $development->is_featured,
            'is_published' => $development->is_published,
            'sort_order' => $sortOrder,
            'created_at' => $phase?->created_at ?? $development->created_at,
            'updated_at' => $phase?->updated_at ?? $development->updated_at,
        ]);
    }
};
