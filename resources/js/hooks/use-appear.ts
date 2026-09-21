import { useEffect } from 'react';

/**
 * Reveals elements marked with `data-appear` once they scroll into view.
 * Elements marked with `data-mount` are revealed as soon as the page renders.
 *
 * Pass the current page URL so each Inertia visit re-scans the document.
 */
export function useAppear(key: string): void {
    useEffect(() => {
        const elements = [
            ...document.querySelectorAll<HTMLElement>(
                '[data-appear]:not(.is-visible)',
            ),
        ];
        const reveal = (element: Element) =>
            element.classList.add('is-visible');

        if (
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            !('IntersectionObserver' in window)
        ) {
            elements.forEach(reveal);

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    reveal(entry.target);
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: '0px 0px -10% 0px' },
        );

        let outer = 0;
        let inner = 0;

        outer = requestAnimationFrame(() => {
            inner = requestAnimationFrame(() => {
                elements.forEach((element) =>
                    element.hasAttribute('data-mount')
                        ? reveal(element)
                        : observer.observe(element),
                );
            });
        });

        return () => {
            cancelAnimationFrame(outer);
            cancelAnimationFrame(inner);
            observer.disconnect();
        };
    }, [key]);
}
