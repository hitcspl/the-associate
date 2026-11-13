type ProjectPrice = {
    currency: string;
    priceFrom: number | null;
    priceTo: number | null;
};

export function formatProjectPrice(project: ProjectPrice): string | null {
    if (project.priceFrom === null && project.priceTo === null) {
        return null;
    }

    const format = (price: number) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: project.currency,
            maximumFractionDigits: 0,
        }).format(price);

    if (project.priceFrom !== null && project.priceTo !== null) {
        return `${format(project.priceFrom)} – ${format(project.priceTo)}`;
    }

    if (project.priceFrom !== null) {
        return `From ${format(project.priceFrom)}`;
    }

    if (project.priceTo !== null) {
        return `Up to ${format(project.priceTo)}`;
    }

    return null;
}
