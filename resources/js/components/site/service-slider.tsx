import { useState } from 'react';
import { appear, Btn, photo } from '@/components/site/ui';
import { show } from '@/routes/services';
import type { Service } from '@/types/site';

export default function ServiceSlider({ services }: { services: Service[] }) {
    const [index, setIndex] = useState(0);
    const service = services[index];

    const move = (delta: number) =>
        setIndex(
            (current) => (current + delta + services.length) % services.length,
        );

    return (
        <div className="service-slider" {...appear('zoom', 0.4)}>
            <div className="slider-controls">
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="circle-button"
                        aria-label="Previous service"
                        onClick={() => move(-1)}
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        className="circle-button"
                        aria-label="Next service"
                        onClick={() => move(1)}
                    >
                        →
                    </button>
                </div>
                <span className="text-[48px] font-medium">
                    /{service.number}
                </span>
            </div>
            <div className="min-w-0">
                <article className="service-slide" key={service.slug}>
                    <div className="relative overflow-hidden rounded-[20px]">
                        <img
                            src={photo(service.image)}
                            alt=""
                            className="h-full min-h-[440px] w-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="from-forest/80 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-8 pt-20 pb-7 text-right text-xs leading-6 text-white">
                            {service.highlights.map((highlight) => (
                                <p key={highlight}>• {highlight}</p>
                            ))}
                        </div>
                    </div>
                    <div className="self-center">
                        <p className="text-muted mb-5 text-xs">{`{ ${service.label} }`}</p>
                        <h3 className="text-2xl font-medium">
                            {service.title}
                        </h3>
                        <p className="text-muted mt-6">{service.summary}</p>
                        <ul className="text-muted my-5 list-inside list-disc space-y-2 text-sm">
                            {service.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                        <Btn
                            href={show.url(service.slug)}
                            label="Explore Service"
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}
