import {
    Children,
    cloneElement,
    isValidElement,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactElement,
    type ReactNode,
} from 'react';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Observe an element and report the first time it scrolls into view.
 */
function useInView<T extends HTMLElement>(threshold = 0.5) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element || !('IntersectionObserver' in window)) {
            setInView(true);

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    setInView(true);
                    observer.unobserve(entry.target);
                });
            },
            { threshold },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
}

const format = (value: number, decimals: number, grouping: boolean) =>
    value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouping,
    });

/**
 * Counts up to `value` once the number scrolls into view.
 *
 * `speed` is the milliseconds spent on each whole-number step, matching the
 * counter in the reference design; without it the count takes 1.6 seconds.
 */
export function Counter({
    value,
    start,
    suffix = '',
    speed,
    grouping = true,
    className = '',
}: {
    value: number;
    start: number;
    suffix?: string;
    speed?: number;
    /** Set to false for values such as years, which take no separator. */
    grouping?: boolean;
    className?: string;
}) {
    const decimals = (String(value).split('.')[1] ?? '').length;
    const { ref, inView } = useInView<HTMLParagraphElement>();
    const [display, setDisplay] = useState(() =>
        format(start, decimals, grouping),
    );

    useEffect(() => {
        if (!inView) {
            return;
        }

        if (prefersReducedMotion()) {
            setDisplay(format(value, decimals, grouping));

            return;
        }

        const duration = speed ? Math.abs(value - start) * speed : 1600;
        const began = performance.now();
        let frame = 0;

        const step = (now: number) => {
            const progress = Math.min((now - began) / duration, 1);
            const eased = speed ? progress : 1 - (1 - progress) ** 3;

            setDisplay(
                format(start + (value - start) * eased, decimals, grouping),
            );

            if (progress < 1) {
                frame = requestAnimationFrame(step);
            }
        };

        frame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(frame);
    }, [decimals, grouping, inView, speed, start, value]);

    return (
        <p ref={ref} className={className}>
            {display}
            {suffix}
        </p>
    );
}

/**
 * A bar that grows to its final height once it scrolls into view.
 */
export function TimelineBar({
    height,
    label,
    className = '',
}: {
    height: string;
    label?: string;
    className?: string;
}) {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <div ref={ref} className={`timeline-bar ${className}`.trim()}>
            {label && <span>{label}</span>}
            <div style={{ height: inView ? height : '0' }} />
        </div>
    );
}

/**
 * A row that scrolls its items at 60px/s. Items are rendered twice so the
 * loop is seamless; the copies are hidden from assistive technology. With
 * reduced motion the row stays a normal horizontal scroller.
 */
export function Ticker({
    label,
    className = '',
    pauseOnHover = false,
    children,
    ...rest
}: {
    label: string;
    className?: string;
    pauseOnHover?: boolean;
    children: ReactNode;
    [key: `data-${string}`]: unknown;
    style?: CSSProperties;
}) {
    const ticker = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const [duplicated, setDuplicated] = useState(false);

    useEffect(() => {
        const row = ticker.current;
        const rail = track.current;

        if (!row || !rail || prefersReducedMotion()) {
            return;
        }

        setDuplicated(true);

        const setDuration = () =>
            rail.style.setProperty(
                '--ticker-duration',
                `${rail.scrollWidth / 2 / 60}s`,
            );

        setDuration();
        row.classList.add('is-running');

        const observer = new ResizeObserver(setDuration);
        observer.observe(rail);

        return () => {
            observer.disconnect();
            row.classList.remove('is-running');
        };
    }, []);

    const items = Children.toArray(children);

    return (
        <div
            ref={ticker}
            className={`ticker ${className}`.trim()}
            role="region"
            aria-label={label}
            tabIndex={0}
            {...(pauseOnHover ? { 'data-pause-on-hover': '' } : {})}
            {...rest}
        >
            <div ref={track} className="ticker-track">
                {items}
                {duplicated &&
                    items.map((item, index) =>
                        isValidElement(item)
                            ? cloneElement(
                                  item as ReactElement<{ key?: string }>,
                                  {
                                      key: `copy-${index}`,
                                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      ...({
                                          'aria-hidden': 'true',
                                          inert: true,
                                      } as any),
                                  },
                              )
                            : item,
                    )}
            </div>
        </div>
    );
}

/**
 * Characters brighten from 20% opacity as the paragraph moves from 90% to
 * 30% of the viewport height. Screen readers get the plain sentence.
 */
export function ScrollReveal({
    text,
    className = '',
}: {
    text: string;
    className?: string;
}) {
    const ref = useRef<HTMLParagraphElement>(null);
    const [lit, setLit] = useState<number | null>(null);
    const words = text.trim().split(' ');
    const total = words.reduce((count, word) => count + word.length, 0);

    useEffect(() => {
        const element = ref.current;

        if (!element || prefersReducedMotion()) {
            setLit(total);

            return;
        }

        let frame = 0;

        const update = () => {
            const top = element.getBoundingClientRect().top;
            const progress = Math.min(
                Math.max(
                    (window.innerHeight * 0.9 - top) /
                        (window.innerHeight * 0.6),
                    0,
                ),
                1,
            );

            setLit(Math.round(progress * total));
        };

        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
        };
    }, [total]);

    let index = 0;

    return (
        <p ref={ref} className={className}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {words.map((word, wordIndex) => (
                    <span key={wordIndex}>
                        {wordIndex > 0 && ' '}
                        <span className="whitespace-nowrap">
                            {word.split('').map((character) => {
                                const position = index++;

                                return (
                                    <span
                                        key={position}
                                        style={{
                                            opacity:
                                                lit === null || position < lit
                                                    ? 1
                                                    : 0.2,
                                        }}
                                    >
                                        {character}
                                    </span>
                                );
                            })}
                        </span>
                    </span>
                ))}
            </span>
        </p>
    );
}

/**
 * Poster with a play button; native controls take over once playing.
 */
export function VideoFrame({
    source,
    poster,
    className = '',
}: {
    source: string;
    poster: string;
    className?: string;
}) {
    const video = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    const play = () => {
        const element = video.current;

        if (!element) {
            return;
        }

        element.controls = true;
        setPlaying(true);
        void element.play().catch(() => {});
        element.focus();
    };

    return (
        <div className={`video-frame ${className}`.trim()}>
            <video
                ref={video}
                className="aspect-[1.75] w-full object-cover"
                preload="none"
                playsInline
                poster={poster}
            >
                <source src={source} type="video/mp4" />
            </video>
            <button
                type="button"
                className="video-play"
                aria-label="Play video"
                hidden={playing}
                onClick={play}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                </svg>
            </button>
        </div>
    );
}
