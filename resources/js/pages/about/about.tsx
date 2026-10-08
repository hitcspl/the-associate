import { Head } from '@inertiajs/react';
import PageHero from '@/components/public/page-hero';
import { aboutHeroImage } from '@/components/public/images';
import StorySection from '@/components/public/about/StorySection';
import StatsSection from '@/components/public/about/StatsSection';
import MissionSection from '@/components/public/about/MissionSection';
import PillarsSection from '@/components/public/about/PillarsSection';
import TeamSection from '@/components/public/about/TeamSection';
import CTASection from '@/components/public/about/CTASection';

export default function About() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#A37B4C] selection:text-white">
            <Head title="About Us" />

            <main>
                <PageHero
                    image={aboutHeroImage}
                    imageAlt="The Associate Real Estate Luxury Estate"
                    title="About Us"
                    subtitle="There are many who build houses. Only a few build homes."
                />

                <StorySection />
                <StatsSection />
                <MissionSection />
                <PillarsSection />
                <TeamSection />
                <CTASection />
            </main>
        </div>
    );
}
