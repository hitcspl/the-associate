import Reveal from './reveal';

export type SectionHeadingProps = {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    align?: 'left' | 'center';
};

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'left',
}: SectionHeadingProps) {
    return (
        <div
            className={
                align === 'center'
                    ? 'max-w-2xl mx-auto text-center'
                    : 'max-w-2xl'
            }
        >
            <Reveal>
                <div
                    className={
                        'inline-flex items-center gap-3 ' +
                        (align === 'center' ? 'justify-center' : '')
                    }
                >
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C] dark:text-[#B88C57]">
                        {eyebrow}
                    </span>
                    <span className="h-px w-8 bg-[#A37B4C]/50 dark:bg-[#B88C57]/50" />
                </div>
            </Reveal>
            <Reveal delay={0.08}>
                <h2 className="font-display text-3xl sm:text-5xl font-medium text-foreground leading-[1.18] mt-3">
                    {title}
                </h2>
            </Reveal>
            {description && (
                <Reveal delay={0.16}>
                    <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
                        {description}
                    </p>
                </Reveal>
            )}
        </div>
    );
}
