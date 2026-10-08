import { type ReactNode } from 'react';

export default function Section({
    children,
    className = '',
    as = 'section',
}: {
    children: ReactNode;
    className?: string;
    as?: 'section' | 'div';
}) {
    const Tag = as;
    return (
        <Tag className={`w-full ${className}`}>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </Tag>
    );
}
