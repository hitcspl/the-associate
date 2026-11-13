<?php

use App\Models\Project;
use App\Models\ProjectGroup;
use Database\Seeders\ProjectSeeder;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('lists each seeded project separately in completed and ongoing sections', function () {
    app(ProjectSeeder::class)->run();
    Project::factory()->create([
        'name' => 'Unpublished Development',
        'slug' => 'unpublished-development',
        'is_published' => false,
    ]);

    $this->get('/properties')->assertInertia(fn (Assert $page) => $page
        ->component('projects/index')
        ->has('projects', 18)
        ->where('projects.0.name', 'Mesra City')
        ->where('projects.0.slug', 'mesra-city')
        ->where('projects.0.status', 'completed')
        ->where('projects.0.location', 'Mesra City, Ranchi')
        ->where('portfolioStats.total', 18)
        ->where('portfolioStats.ongoing', 10)
        ->where('portfolioStats.completed', 8)
        ->where('portfolioStats.planned', 0)
    );
});

it('shows project-specific details and related projects from the same development', function () {
    Storage::fake('public');
    Storage::disk('public')->put('projects/associate-park.jpg', 'image');
    Storage::disk('public')->put('projects/progress/update-1.jpg', 'image');
    Storage::disk('public')->put('projects/progress/update-2.jpg', 'image');
    Storage::disk('public')->put('brochures/associate-park.pdf', 'pdf');

    $group = ProjectGroup::query()->create([
        'name' => 'Associate Park',
        'slug' => 'associate-park',
        'location' => 'Ranchi',
        'category' => 'Development',
        'description' => 'Development overview.',
        'summary' => 'Development-wide summary.',
        'image_path' => 'projects/associate-park.jpg',
        'brochure_path' => 'brochures/associate-park.pdf',
        'highlights' => ['Development highlight'],
        'area_details' => ['Built-up Area' => '5,764 sqm'],
        'price_from' => 1500000,
    ]);
    $project = Project::factory()->create([
        'project_group_id' => $group->id,
        'name' => 'Daldali Chowk',
        'slug' => 'associate-park-daldali-chowk',
        'location' => 'Daldali Chowk, Kathal More, Ranchi',
        'status' => 'completed',
        'description' => 'Project-specific overview.',
        'highlights' => ['Project-specific highlight'],
        'progress_images' => [
            'projects/progress/update-1.jpg',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
        ],
    ]);
    Project::factory()->create([
        'project_group_id' => $group->id,
        'name' => 'Nagri',
        'slug' => 'associate-park-nagri',
        'location' => 'Nagri, Ranchi',
        'status' => 'completed',
    ]);
    Project::factory()->create([
        'project_group_id' => $group->id,
        'name' => 'Private project',
        'slug' => 'associate-park-private',
        'is_published' => false,
    ]);

    $this->get('/properties/associate-park-daldali-chowk')->assertInertia(fn (Assert $page) => $page
        ->component('projects/show')
        ->where('project.id', $project->id)
        ->where('project.name', 'Associate Park — Daldali Chowk')
        ->where('project.slug', 'associate-park-daldali-chowk')
        ->where('project.status', 'completed')
        ->where('project.location', 'Daldali Chowk, Kathal More, Ranchi')
        ->where('project.developmentName', 'Associate Park')
        ->where('project.developmentSummary', 'Development-wide summary.')
        ->where('project.description', 'Project-specific overview.')
        ->where('project.highlights.0', 'Project-specific highlight')
        ->where('project.progressImages.0', '/storage/projects/progress/update-1.jpg')
        ->where('project.progressImages.1', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9')
        ->where('project.areaDetails.Built-up Area', '5,764 sqm')
        ->where('project.priceFrom', 1500000)
        ->where('project.imageUrl', '/storage/projects/associate-park.jpg')
        ->where('project.brochureUrl', '/storage/brochures/associate-park.pdf')
        ->has('relatedProjects', 1)
        ->where('relatedProjects.0.slug', 'associate-park-nagri')
        ->where('relatedProjects.0.name', 'Associate Park — Nagri')
    );
});

it('does not show unpublished projects', function () {
    Project::factory()->create([
        'slug' => 'private-development',
        'is_published' => false,
    ]);

    $this->get('/properties/private-development')->assertNotFound();
});

it('seeds each brochure entry once without replacing admin details', function () {
    $seeder = app(ProjectSeeder::class);
    $seeder->run();

    $associatePark = Project::query()->where('slug', 'associate-park')->firstOrFail();
    expect($associatePark->name)->toBe('Daldali Chowk')
        ->and($associatePark->description)
        ->toContain('Daldali Chowk, Kathal More, Ranchi')
        ->toContain('completed')
        ->and($associatePark->faqs)
        ->toHaveCount(3)
        ->and($associatePark->faqs[2]['a'])
        ->toBe('Please contact our team for confirmed pricing, availability and property details.')
        ->and($associatePark->highlights)
        ->toHaveCount(3)
        ->and($associatePark->amenities)
        ->toHaveCount(4)
        ->and($associatePark->area_details)
        ->toHaveCount(3)
        ->and($associatePark->room_amenities)
        ->toHaveCount(4)
        ->and($associatePark->specifications)
        ->toHaveCount(4)
        ->and($associatePark->nearby)
        ->toHaveCount(3)
        ->and($associatePark->progress_images)
        ->toHaveCount(3);

    $group = ProjectGroup::query()->where('slug', 'sri-ram-arcade')->firstOrFail();
    $group->update([
        'is_featured' => false,
        'is_published' => false,
    ]);
    $project = Project::query()->where('slug', 'sri-ram-arcade')->firstOrFail();
    $project->update([
        'is_published' => false,
        'price_from' => 1200000,
        'brochure_path' => 'brochures/sri-ram-arcade.pdf',
        'description' => 'Admin-verified description.',
        'highlights' => ['Admin-verified highlight.'],
        'amenities' => ['Admin-verified amenity.'],
        'progress_images' => ['projects/admin-progress-update.jpg'],
    ]);

    $seeder->run();

    $project->refresh();
    $group->refresh();
    expect($project->description)->toBe('Admin-verified description.')
        ->and($project->highlights)->toBe(['Admin-verified highlight.'])
        ->and($project->amenities)->toBe(['Admin-verified amenity.'])
        ->and($project->progress_images)->toBe(['projects/admin-progress-update.jpg'])
        ->and($project->price_from)->toBe('1200000.00')
        ->and($project->is_published)->toBeFalse()
        ->and($group->is_featured)->toBeFalse()
        ->and($group->is_published)->toBeFalse();

    $this->assertDatabaseCount('projects', 18);
    $this->assertDatabaseCount('project_groups', 10);
    $this->assertDatabaseHas('projects', [
        'slug' => 'sri-ram-arcade',
        'price_from' => 1200000,
        'brochure_path' => 'brochures/sri-ram-arcade.pdf',
    ]);
});
