import { Link } from '@inertiajs/react';
import { home } from '@/routes';

/**
 * The Green Means logo.
 *
 * Both variants render the same full logo; `horizontal` sizes it for the
 * header bar and `lockup` for the footer.
 */
export default function Brand({
    variant = 'horizontal',
}: {
    variant?: 'horizontal' | 'lockup';
}) {
    const isHeader = variant === 'horizontal';

    return (
        <Link
            href={home()}
            aria-label="Green Means Ltd home"
            className={isHeader ? 'brand' : 'brand brand-lockup'}
        >
            <img
                className="brand-logo"
                src="/Greenmeans.png"
                alt="Green Means — for sustainable solutions"
                width={1774}
                height={887}
                loading={isHeader ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={isHeader ? 'high' : undefined}
            />
        </Link>
    );
}
