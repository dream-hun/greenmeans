import { Link } from '@inertiajs/react';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';

/**
 * Image and video assets are served from `public/site`.
 */
export const photo = (name: string) => `/site/optimized/${name}.webp`;
export const graphic = (name: string) => `/site/images/${name}`;
/** Articles without an uploaded image fall back to a generic banner. */
export const postImage = (image: string | null) =>
    image ?? photo('banner-footer');
export const clip = (name: string) => `/site/video/${name}.mp4`;

type AppearKind = 'up' | 'left' | 'right' | 'fade' | 'zoom' | 'zoom-sm';

/**
 * Props that drive the reveal-on-scroll effect wired up in the site layout.
 * `mount` reveals the element as soon as the page renders.
 */
export function appear(
    kind: AppearKind,
    delay = 0.2,
    mount = false,
): {
    'data-appear': AppearKind;
    'data-mount'?: '';
    style: CSSProperties;
} {
    return {
        'data-appear': kind,
        ...(mount ? { 'data-mount': '' as const } : {}),
        style: { '--delay': `${delay}s` } as CSSProperties,
    };
}

/**
 * Labels roll upwards on hover. The second copy is decorative.
 */
export function Roll({ children }: { children: string }) {
    return (
        <span className="roll">
            <span>{children}</span>
            <span aria-hidden="true">{children}</span>
        </span>
    );
}

type ButtonVariant = '' | 'btn-outline' | 'btn-white' | 'btn-small';

export function Btn({
    href,
    label,
    variant = '',
    className = '',
    external = false,
}: {
    href: string;
    label: string;
    variant?: ButtonVariant;
    className?: string;
    external?: boolean;
}) {
    const classes = `btn ${variant} ${className}`.trim();

    if (external) {
        return (
            <a
                href={href}
                className={classes}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Roll>{label}</Roll>
            </a>
        );
    }

    return (
        <Link href={href} className={classes}>
            <Roll>{label}</Roll>
        </Link>
    );
}

export function SubmitButton({
    label,
    variant = '',
    className = '',
    disabled = false,
}: {
    label: string;
    variant?: ButtonVariant;
    className?: string;
    disabled?: boolean;
}) {
    return (
        <button
            type="submit"
            className={`btn ${variant} ${className}`.trim()}
            disabled={disabled}
        >
            <Roll>{label}</Roll>
        </button>
    );
}

export function SectionNumber({ children }: { children: string }) {
    return <span className="section-number">{`{ ${children} }`}</span>;
}

export function SectionHeading({
    number,
    title,
    description,
    action,
}: {
    number: string;
    title: ReactNode;
    description?: string;
    action?: ReactNode;
}) {
    return (
        <div className="section-heading" {...appear('up')}>
            <div>
                <SectionNumber>{number}</SectionNumber>
                <h2>{title}</h2>
            </div>
            {(description || action) && (
                <div className="section-description">
                    {description && <p>{description}</p>}
                    {action}
                </div>
            )}
        </div>
    );
}

export function PageHero({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <section className="page-hero">
            <h1 {...appear('up', 0.2, true)}>{title}</h1>
            <p {...appear('up', 0.4, true)}>{description}</p>
        </section>
    );
}

export function Section({
    className = '',
    children,
    ...props
}: ComponentProps<'section'>) {
    return (
        <section className={`section-space ${className}`.trim()} {...props}>
            <div className="page-container">{children}</div>
        </section>
    );
}

export function GreenPanel({
    className = '',
    children,
    after,
}: {
    className?: string;
    children: ReactNode;
    /** Rendered full width, outside the page container. */
    after?: ReactNode;
}) {
    return (
        <section className={`green-panel section-space ${className}`.trim()}>
            <div className="page-container">{children}</div>
            {after}
        </section>
    );
}
