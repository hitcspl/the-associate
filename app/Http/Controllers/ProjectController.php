<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::query()
            ->where('is_published', true)
            ->where(function (Builder $query): void {
                $query->whereNull('project_group_id')
                    ->orWhereHas('projectGroup', fn (Builder $groupQuery) => $groupQuery
                        ->where('is_published', true));
            })
            ->with('projectGroup')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        $listings = $projects
            ->map(fn (Project $project): array => $this->projectListingData($project))
            ->values();

        return Inertia::render('projects/index', [
            'projects' => $listings,
            'portfolioStats' => [
                'total' => $listings->count(),
                'ongoing' => $listings->where('status', 'ongoing')->count(),
                'completed' => $listings->where('status', 'completed')->count(),
                'planned' => $listings->where('status', 'planned')->count(),
            ],
        ]);
    }

    public function show(Project $project): Response
    {
        $project->load('projectGroup');
        $group = $project->projectGroup;
        abort_unless($project->is_published && ($group?->is_published ?? true), 404);

        $relatedProjects = $group === null
            ? collect()
            : $group->projects()
                ->where('projects.is_published', true)
                ->where('projects.id', '!=', $project->id)
                ->with('projectGroup')
                ->limit(4)
                ->get()
                ->map(fn (Project $relatedProject): array => $this->projectListingData(
                    $relatedProject,
                    $group->name,
                ))
                ->values();

        return Inertia::render('projects/show', [
            'project' => $this->projectData($project),
            'relatedProjects' => $relatedProjects,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function projectData(Project $project): array
    {
        $group = $project->projectGroup;

        return [
            ...$this->projectListingData($project),
            'developmentName' => $group?->name,
            'developmentSummary' => $group?->summary,
            'description' => $project->description ?? $group?->description,
            'galleryImages' => collect(
                $project->gallery_images ?? $group?->gallery_images ?? [],
            )
                ->map(fn (string $path): string => $this->imageUrl($path))
                ->values(),
            'progressImages' => collect($project->progress_images ?? [])
                ->map(fn (string $path): string => $this->imageUrl($path))
                ->values(),
            'highlights' => $project->highlights ?? $group?->highlights ?? [],
            'amenities' => $project->amenities ?? $group?->amenities ?? [],
            'areaDetails' => $project->area_details ?? $group?->area_details ?? [],
            'roomAmenities' => $project->room_amenities ?? $group?->room_amenities ?? [],
            'specifications' => $project->specifications ?? $group?->specifications ?? [],
            'nearby' => $project->nearby ?? $group?->nearby ?? [],
            'faqs' => $project->faqs ?? $group?->faqs ?? [],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function projectListingData(Project $project, ?string $groupName = null): array
    {
        $group = $project->projectGroup;
        $groupName ??= $group?->name;
        $priceFrom = $project->price_from ?? $group?->price_from;
        $priceTo = $project->price_to ?? $group?->price_to;

        return [
            'id' => $project->id,
            'name' => $this->projectDisplayName($project, $groupName),
            'slug' => $project->slug,
            'location' => $project->location,
            'category' => $project->category,
            'status' => $project->status,
            'completedAt' => $project->completed_at?->toDateString(),
            'isFeatured' => $project->is_featured || ($group?->is_featured ?? false),
            'imageUrl' => $this->storageUrl(
                $project->image_path ?? $group?->image_path,
            ),
            'brochureUrl' => $this->storageUrl(
                $project->brochure_path ?? $group?->brochure_path,
            ),
            'priceFrom' => $priceFrom === null ? null : (float) $priceFrom,
            'priceTo' => $priceTo === null ? null : (float) $priceTo,
            'currency' => $project->price_from === null && $project->price_to === null
                ? ($group?->currency ?? $project->currency)
                : $project->currency,
        ];
    }

    private function projectDisplayName(Project $project, ?string $groupName): string
    {
        if ($project->name === 'Project') {
            return $groupName ?? $project->name;
        }

        return $groupName === null
            ? $project->name
            : "{$groupName} — {$project->name}";
    }

    private function storageUrl(?string $path): ?string
    {
        return $path === null ? null : $this->imageUrl($path);
    }

    private function imageUrl(string $path): string
    {
        if (str_starts_with($path, 'https://') || str_starts_with($path, 'http://')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
