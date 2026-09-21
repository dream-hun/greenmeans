import { Link } from '@inertiajs/react';
import { home } from '@/routes';

/**
 * The Green Means logo.
 *
 * `horizontal` pairs the leaf mark with the wordmark for the header; the
 * wordmark is knocked out to white while the header sits over the hero.
 * `lockup` is the full stacked logo, tagline included.
 */
export default function Brand({
    variant = 'horizontal',
}: {
    variant?: 'horizontal' | 'lockup';
}) {
    if (variant === 'lockup') {
        return (
            <Link
                href={home()}
                aria-label="Green Means Ltd home"
                className="brand brand-lockup"
            >
                <img
                    src="/site/brand/lockup.png"
                    alt="Green Means — for sustainable solutions"
                    width={700}
                    height={265}
                    loading="lazy"
                    decoding="async"
                />
            </Link>
        );
    }

    return (
        <Link href={home()} aria-label="Green Means Ltd home" className="brand">
            <img
                className="brand-mark"
                src="/site/brand/mark.png"
                alt=""
                width={220}
                height={204}
                loading="eager"
                decoding="async"
                fetchPriority="high"
            />
            <img
                className="brand-word"
                src="/site/brand/wordmark.png"
                alt="Green Means"
                width={660}
                height={82}
                loading="eager"
                decoding="async"
                fetchPriority="high"
            />
        </Link>
    );
}
