import { useEffect, useState } from 'react';

interface HeroVideoProps {
    /** Path to the clip, e.g. `clip('hero-home')`. */
    src: string;
    /** Still frame that carries the first paint and stands in when the clip is skipped. */
    poster: string;
    /** Describes the poster, which is the meaningful image for assistive tech. */
    alt: string;
}

/**
 * `navigator.connection` is not part of lib.dom, so describe the slice we read.
 */
interface NetworkInformation {
    saveData?: boolean;
    effectiveType?: string;
}

const slowConnections = ['slow-2g', '2g'];

/**
 * Decides whether the clip is worth its bytes. Reduced-motion visitors never
 * get it, and neither do metered or slow connections.
 */
function isClipWorthLoading(): boolean {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
    }

    const { connection } = navigator as Navigator & {
        connection?: NetworkInformation;
    };

    if (!connection) {
        return true;
    }

    return (
        connection.saveData !== true &&
        !slowConnections.includes(connection.effectiveType ?? '')
    );
}

/**
 * Background clip for the home hero.
 *
 * The poster carries the first paint so the hero never waits on video bytes.
 * The clip is only requested once the browser falls idle, then crossfades in
 * and loops. It opens and closes on black, so the repeat has no visible seam.
 */
export default function HeroVideo({ src, poster, alt }: HeroVideoProps) {
    const [source, setSource] = useState<string>();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!isClipWorthLoading()) {
            return;
        }

        const load = () => setSource(src);

        if (typeof window.requestIdleCallback === 'function') {
            const handle = window.requestIdleCallback(load, { timeout: 2000 });

            return () => window.cancelIdleCallback(handle);
        }

        const timeout = window.setTimeout(load, 500);

        return () => window.clearTimeout(timeout);
    }, [src]);

    return (
        <>
            <img
                className="hero-still"
                src={poster}
                alt={alt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
            />
            {source && (
                <video
                    className="hero-clip"
                    data-playing={isPlaying ? '' : undefined}
                    src={source}
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                    tabIndex={-1}
                    onPlaying={() => setIsPlaying(true)}
                />
            )}
        </>
    );
}
