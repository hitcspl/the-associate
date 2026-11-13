<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    private const SAMPLE_PROGRESS_IMAGES = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ];

    public function run(): void
    {
        $developments = [
            [
                'name' => 'Mesra City',
                'slug' => 'mesra-city',
                'category' => 'Development',
                'projects' => [
                    ['name' => 'Project', 'location' => 'Mesra City, Ranchi', 'status' => 'completed'],
                ],
            ],
            [
                'name' => 'Pundag Nagar',
                'slug' => 'pundag-nagar',
                'category' => 'Development',
                'projects' => [
                    ['name' => 'Project', 'location' => 'Kathal More, Ranchi', 'status' => 'completed'],
                ],
            ],
            [
                'name' => 'Associate Park',
                'slug' => 'associate-park',
                'category' => 'Development',
                'projects' => [
                    ['name' => 'Daldali Chowk', 'location' => 'Daldali Chowk, Kathal More, Ranchi', 'status' => 'completed'],
                    ['name' => 'Phase III — Nagri', 'location' => 'Nagri, Ranchi', 'status' => 'completed'],
                    ['name' => 'Phase I — Saparom', 'location' => 'Saparom, Itki Road, Ranchi', 'status' => 'ongoing'],
                    ['name' => 'Phase II — Kolambari More', 'location' => 'Kolambari More, Itki Road, Ranchi', 'status' => 'ongoing'],
                    ['name' => 'Phase III — Hurhuri', 'location' => 'Hurhuri, Thakurgaon Road, Ranchi', 'status' => 'ongoing'],
                    ['name' => 'Bajra', 'location' => 'Bajra, Itki Road, Ranchi', 'status' => 'ongoing'],
                ],
            ],
            [
                'name' => 'Fly City',
                'slug' => 'fly-city',
                'category' => 'Development',
                'projects' => [
                    ['name' => 'Project', 'location' => 'Hethu, Airport Road, Ranchi', 'status' => 'completed'],
                ],
            ],
            [
                'name' => 'Associate Garden',
                'slug' => 'associate-garden',
                'category' => 'Development',
                'projects' => [
                    ['name' => 'Sithio', 'location' => 'Sithio, Ranchi', 'status' => 'completed'],
                    ['name' => 'Tundul', 'location' => 'Tundul, Ranchi', 'status' => 'ongoing'],
                ],
            ],
            [
                'name' => 'Associate Valley',
                'slug' => 'associate-valley',
                'category' => 'Development',
                'projects' => [
                    ['name' => 'Phase I — Onya, Vikas', 'location' => 'Onya, Vikas, Ranchi', 'status' => 'completed'],
                    ['name' => 'Phase II', 'location' => 'Hutup, Rukka Road, Ranchi', 'status' => 'ongoing'],
                ],
            ],
            [
                'name' => 'Sri Ram Arcade',
                'slug' => 'sri-ram-arcade',
                'category' => 'Commercial cum Residential',
                'projects' => [
                    ['name' => 'Project', 'location' => 'Bajra, Itki Road, Ranchi', 'status' => 'completed'],
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Associate City',
                'slug' => 'associate-city',
                'category' => 'Development',
                'projects' => [
                    ['name' => 'Phase I', 'location' => 'Barhu, Kanke Road, Ranchi', 'status' => 'ongoing'],
                    ['name' => 'Phase II', 'location' => 'Barhu, Pithoria Road, Ranchi', 'status' => 'ongoing'],
                ],
            ],
            [
                'name' => 'Associate Farm House',
                'slug' => 'associate-farm-house',
                'category' => 'Development',
                'projects' => [
                    ['name' => 'Project', 'location' => 'Bindhani, Itki Road, Ranchi', 'status' => 'ongoing'],
                ],
            ],
            [
                'name' => 'Ahilya Enclave',
                'slug' => 'ahilya-enclave',
                'category' => 'Luxury Residential Complex',
                'projects' => [
                    ['name' => 'Project', 'location' => 'Sarveshwari Nagar, Bajra, Ranchi', 'status' => 'ongoing'],
                ],
            ],
        ];

        $projectSortOrder = 0;

        foreach ($developments as $developmentSortOrder => $developmentData) {
            $group = ProjectGroup::query()->firstOrNew([
                'slug' => $developmentData['slug'],
            ]);
            $isNewGroup = ! $group->exists;
            $group->fill([
                'name' => $developmentData['name'],
                'location' => 'Ranchi',
                'category' => $developmentData['category'],
                'sort_order' => $developmentSortOrder,
            ]);

            if ($isNewGroup) {
                $group->is_featured = $developmentData['is_featured'] ?? false;
                $group->is_published = true;
            }

            $group->save();

            foreach ($developmentData['projects'] as $projectIndex => $projectData) {
                $slug = $projectIndex === 0
                    ? $developmentData['slug']
                    : $developmentData['slug'].'-'.Str::slug($projectData['name']);
                $displayName = $projectData['name'] === 'Project'
                    ? $developmentData['name']
                    : "{$developmentData['name']} — {$projectData['name']}";
                $project = Project::query()->firstOrNew(['slug' => $slug]);
                $isNewProject = ! $project->exists;
                $project->fill([
                    'project_group_id' => $group->id,
                    'name' => $projectData['name'],
                    'slug' => $slug,
                    'location' => $projectData['location'],
                    'category' => $developmentData['category'],
                    'status' => $projectData['status'],
                    'sort_order' => $projectSortOrder++,
                ]);

                if ($isNewProject) {
                    $project->is_featured = $developmentData['is_featured'] ?? false;
                    $project->is_published = true;
                }

                if (blank($project->description)) {
                    $project->description = sprintf(
                        '%s is located at %s. It is listed as %s in our property portfolio. Please contact our team for confirmed pricing and availability.',
                        $displayName,
                        $projectData['location'],
                        $projectData['status'],
                    );
                }

                if (empty($project->highlights)) {
                    $project->highlights = fake()->randomElements([
                        'Well-connected to key Ranchi roads',
                        'Planned green spaces',
                        'Wide internal roads',
                        'Flexible plot options',
                        'Convenient access to local services',
                        'Designed for comfortable everyday living',
                    ], 3);
                }

                if (empty($project->amenities)) {
                    $project->amenities = fake()->randomElements([
                        'Landscaped community spaces',
                        'Street lighting',
                        'Controlled entry points',
                        'Visitor parking',
                        'Dedicated walking paths',
                        'Community gathering area',
                    ], 4);
                }

                if (empty($project->area_details)) {
                    $project->area_details = [
                        'Built-up Area' => number_format(fake()->numberBetween(1200, 3600)).' sq. ft.',
                        'Plot Size' => number_format(fake()->numberBetween(1500, 5000)).' sq. ft.',
                        'Road Width' => fake()->randomElement(['20 ft', '30 ft', '40 ft']),
                    ];
                }

                if (empty($project->room_amenities)) {
                    $project->room_amenities = [
                        'Bedrooms' => fake()->randomElement(['2', '3', '4']),
                        'Bathrooms' => fake()->randomElement(['2', '3', '4']),
                        'Kitchen' => fake()->randomElement(['Open plan', 'Modern layout', 'Separate kitchen']),
                        'Parking' => fake()->randomElement(['1 space', '2 spaces', 'Available']),
                    ];
                }

                if (empty($project->specifications)) {
                    $project->specifications = [
                        'Structure' => fake()->randomElement(['RCC frame', 'Reinforced concrete', 'RCC structure']),
                        'Flooring' => fake()->randomElement(['Vitrified tile', 'Ceramic tile', 'Stone finish']),
                        'Roofing' => fake()->randomElement(['RCC slab', 'Weather-resistant finish']),
                        'Windows' => fake()->randomElement(['Aluminium frame', 'UPVC frame']),
                    ];
                }

                if (empty($project->nearby)) {
                    $project->nearby = [
                        [
                            'name' => 'Local school',
                            'type' => 'Education',
                            'distance' => number_format(fake()->randomFloat(1, 0.8, 4.5), 1).' km',
                        ],
                        [
                            'name' => 'Healthcare centre',
                            'type' => 'Healthcare',
                            'distance' => number_format(fake()->randomFloat(1, 1, 5), 1).' km',
                        ],
                        [
                            'name' => 'Daily needs market',
                            'type' => 'Shopping',
                            'distance' => number_format(fake()->randomFloat(1, 0.5, 3), 1).' km',
                        ],
                    ];
                }

                if (empty($project->faqs)) {
                    $project->faqs = [
                        [
                            'q' => "Where is {$displayName} located?",
                            'a' => $projectData['location'].'.',
                        ],
                        [
                            'q' => "What is the status of {$displayName}?",
                            'a' => 'It is listed as '.$projectData['status'].' in our property portfolio.',
                        ],
                        [
                            'q' => "How can I enquire about {$displayName}?",
                            'a' => 'Please contact our team for confirmed pricing, availability and property details.',
                        ],
                    ];
                }

                if (empty($project->progress_images)) {
                    $project->progress_images = fake()->randomElements(
                        self::SAMPLE_PROGRESS_IMAGES,
                        3,
                    );
                }

                $project->save();
            }
        }
    }
}
