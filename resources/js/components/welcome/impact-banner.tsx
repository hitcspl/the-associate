import type { ImpactStat } from '@/types/property';

type ImpactBannerProps = { stats: ImpactStat[]; image: string };

export function ImpactBanner({ stats, image }: ImpactBannerProps) {
    return (
        <section className="border-border/40 relative overflow-hidden border-y bg-[#1b1916] py-14 text-white">
            <div className="absolute inset-0 opacity-25">
                <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-black/60" />
            <div className="container-site relative z-10">
                <div className="grid grid-cols-1 items-center gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-5">
                    <div className="space-y-1 lg:col-span-1">
                        <span className="section-kicker text-gold">
                            Our Impact
                        </span>
                        <h3 className="font-display text-xl leading-tight">
                            Building trust, creating value.
                        </h3>
                    </div>
                    {stats.map((stat) => (
                        <div key={stat.id} className="space-y-1">
                            <div className="font-display text-gold text-3xl sm:text-4xl">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/70">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
