<?php

namespace Database\Seeders;

use App\Models\ImpactStat;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['title' => 'Buy Property', 'description' => 'Find your perfect home with expert guidance.', 'icon' => 'home', 'sort_order' => 0],
            ['title' => 'Sell Property', 'description' => 'Get the best value with our market expertise.', 'icon' => 'tag', 'sort_order' => 1],
            ['title' => 'Rent Property', 'description' => 'Flexible options for short or long term.', 'icon' => 'building', 'sort_order' => 2],
            ['title' => 'Property Management', 'description' => 'Hassle-free management for your investment.', 'icon' => 'settings', 'sort_order' => 3],
        ] as $service) {
            Service::updateOrCreate(['title' => $service['title']], $service);
        }

        foreach ([
            ['label' => 'Years of Experience', 'value' => '8+', 'sort_order' => 0],
            ['label' => 'Properties Sold', 'value' => '1,200+', 'sort_order' => 1],
            ['label' => 'Happy Clients', 'value' => '5,000+', 'sort_order' => 2],
            ['label' => 'Client Satisfaction', 'value' => '98%', 'sort_order' => 3],
        ] as $stat) {
            ImpactStat::updateOrCreate(['label' => $stat['label']], $stat);
        }

        $testimonials = [
            ['quote' => 'The team was incredibly professional and made the entire process smooth and stress-free. Highly recommend!', 'author' => 'Sarah Johnson', 'role' => 'Home Buyer', 'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 'location' => 'Beverly Hills, CA', 'image' => 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', 'sort_order' => 0],
            ['quote' => 'Associate helped us find an off-market architectural masterpiece in Malibu within two weeks. Absolutely flawless service.', 'author' => 'David & Marcus Miller', 'role' => 'Property Investors', 'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 'location' => 'Malibu, CA', 'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', 'sort_order' => 1],
            ['quote' => 'Their attention to detail and curated luxury selection made buying our first home an unforgettable experience.', 'author' => 'Elena Rostova', 'role' => 'Interior Designer', 'avatar' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', 'location' => 'New York, NY', 'image' => 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', 'sort_order' => 2],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::updateOrCreate(['author' => $testimonial['author']], $testimonial);
        }
    }
}