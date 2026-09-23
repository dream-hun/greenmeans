import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ServiceIcon from '@/components/site/service-icon';
import { supplierLogos } from '@/components/site/supplier-logos';
import { Counter, Ticker } from '@/components/site/motion';
import {
    appear,
    Btn,
    graphic,
    photo,
    SectionHeading,
    SectionNumber,
    Section,
    GreenPanel,
} from '@/components/site/ui';
import { show as showProject } from '@/routes/projects';
import { show as showService } from '@/routes/services';
import { projects as projectsRoute } from '@/routes';
import type { Faq, Project, Service, Stat, Step, Value } from '@/types/site';

export function StatGrid({ stats }: { stats: Stat[] }) {
    return (
        <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat, index) => (
                <div
                    key={stat.label}
                    className="stat-card"
                    {...appear('up', 0.2 + index * 0.2)}
                >
                    <div className="text-muted flex justify-between gap-2 text-xs">
                        <span>{stat.label}</span>
                        <span aria-hidden="true">+</span>
                    </div>
                    <Counter
                        className="text-forest my-6 text-center text-[30px] font-medium lg:text-[40px]"
                        value={stat.value}
                        start={stat.start}
                        suffix={stat.suffix}
                        grouping={stat.grouping ?? true}
                    />
                    <div className="text-muted flex justify-between text-[10px]">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <span aria-hidden="true">↗</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function StatsSection({
    number,
    stats,
}: {
    number: string;
    stats: Stat[];
}) {
    return (
        <Section>
            <SectionHeading
                number={number}
                title={
                    <>
                        Green Means <em>in Numbers</em>
                    </>
                }
            />
            <StatGrid stats={stats} />
        </Section>
    );
}

export function ServiceRail({ services }: { services: Service[] }) {
    return (
        <Ticker
            label="Our services"
            className="ticker-fade service-rail"
            pauseOnHover
            {...appear('zoom', 0.4)}
        >
            {services.map((service) => (
                <Link
                    key={service.slug}
                    href={showService.url(service.slug)}
                    className="service-card group"
                >
                    <ServiceIcon slug={service.slug} />
                    <div>
                        <SectionNumber>{service.number}</SectionNumber>
                        <h3 className="mb-3 text-[22px] font-medium">
                            {service.title}
                        </h3>
                        <p className="text-muted text-sm">{service.excerpt}</p>
                    </div>
                </Link>
            ))}
        </Ticker>
    );
}

export function ValuesTicker({ values }: { values: Value[] }) {
    return (
        <Ticker label="Our values" {...appear('zoom', 0.4)}>
            {values.map((value) => (
                <article
                    key={value.title}
                    className="flex min-h-91.25 w-100 max-w-[80vw] shrink-0 flex-col items-start justify-between gap-14 rounded-xl bg-white/10 p-6"
                >
                    <span className="pill bg-white/20">{value.label}</span>
                    <div>
                        <h3 className="text-xl font-medium">{value.title}</h3>
                        <p className="mt-4 text-sm text-white/75">
                            {value.description}
                        </p>
                    </div>
                </article>
            ))}
        </Ticker>
    );
}

export function ProcessCards({ steps }: { steps: Step[] }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2">
            {steps.map((step, index) => (
                <article
                    key={step.step}
                    className="rounded-2xl border border-white/10 bg-white/10 p-6"
                    {...appear('up', 0.2 + index * 0.2)}
                >
                    <div className="process-media">
                        <img
                            src={photo(step.image ?? '')}
                            alt=""
                            loading="lazy"
                            decoding="async"
                        />
                        <span className="float-slot float-down right-2.75 bottom-5.25">
                            <span
                                className="float-badge"
                                {...appear('zoom-sm', 1, true)}
                            >
                                <img
                                    src={graphic(
                                        'HdS3Irm33ndSVEcU5pGRaxhw.svg',
                                    )}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                />
                            </span>
                        </span>
                        <span className="float-slot -bottom-3.25 left-0 float-right">
                            <span
                                className="process-pill"
                                {...appear('zoom-sm', 1, true)}
                            >
                                {step.pill ?? step.step}
                            </span>
                        </span>
                    </div>
                    <h3 className="mt-9 text-lg font-medium">{step.title}</h3>
                    <p className="mt-4 mb-3 text-sm text-white/75">
                        {step.description}
                    </p>
                </article>
            ))}
        </div>
    );
}

export function StepCards({ steps }: { steps: Step[] }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
                <article
                    key={step.step}
                    className="flex h-full min-h-72 flex-col justify-between gap-8 rounded-2xl border border-black/5 bg-white p-6"
                    {...appear('up', 0.2 + index * 0.2)}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xl font-medium">{step.step}.</p>
                            <p className="text-muted mt-1 text-xs">{`{ ${step.title} }`}</p>
                        </div>
                        <img
                            src={graphic('20D4hUtHpwXiNfbWGBlN84jClCM.svg')}
                            alt=""
                            className="size-12 shrink-0"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-medium">{step.title}</h3>
                        <p className="text-muted mt-4 text-sm">
                            {step.description}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
}

export function SuccessStories({
    number,
    projects,
}: {
    number: string;
    projects: Project[];
}) {
    return (
        <GreenPanel>
            <SectionHeading
                number={number}
                title={
                    <>
                        Solutions Delivered for <em>Real-World Environments</em>
                    </>
                }
                description="Our work covers HVAC installation, climate-control systems, equipment supply, electronics, displays, audio solutions, and technical servicing."
                action={
                    <Btn
                        href={projectsRoute.url()}
                        label="View Our Projects"
                        variant="btn-white"
                    />
                }
            />
            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        className="success-card success-card-compact group"
                        href={showProject.url(project.slug)}
                        {...appear('zoom-sm', 0.4)}
                    >
                        <div className="flex min-w-0 flex-col items-start justify-between gap-8">
                            <span className="pill">
                                {project.category}{' '}
                                <span className="pill-arrow" aria-hidden="true">
                                    ↗
                                </span>
                            </span>
                            <div>
                                <p className="mb-3 text-xs text-white/70">{`{ ${project.number} }`}</p>
                                <h3 className="text-xl leading-[1.45] font-medium lg:text-[22px]">
                                    {project.name}
                                </h3>
                                <p className="mt-3 text-[11px] text-white/70">
                                    Green Means Ltd
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span className="tag">
                                        {project.category}
                                    </span>
                                    <span className="tag">
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="zoom-media h-full rounded-lg">
                            <img
                                src={photo(project.image)}
                                alt=""
                                className="h-full min-h-70 w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </GreenPanel>
    );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
                <Link
                    key={project.slug}
                    href={showProject.url(project.slug)}
                    className="project-card group"
                    {...appear('zoom', 0.3)}
                >
                    <div className="zoom-media">
                        <img
                            src={photo(project.image)}
                            alt=""
                            className="aspect-[1.5] w-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div className="text-muted flex items-start justify-between gap-4 p-6 text-sm">
                        <h2 className="font-normal">{project.name}</h2>
                        <span>{`_${project.number.padStart(3, '0')}`}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

/**
 * Manufacturer marks, shown on the flip cards from the reference design.
 */
export function PartnerLogos({ number }: { number: string }) {
    return (
        <Section>
            <SectionHeading
                number={number}
                title={
                    <>
                        Equipment From Reputable
                        <br />
                        <em>Manufacturers &amp; Suppliers</em>
                    </>
                }
                description="We work with reputable manufacturers and suppliers to provide dependable equipment backed by professional installation and technical support."
            />
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {supplierLogos.map((logo) => (
                    <div
                        key={logo.name}
                        className="logo-flip h-25"
                        {...appear('zoom', 0.4)}
                    >
                        <div className="logo-flip-inner">
                            <div className="logo-face">
                                <svg
                                    viewBox={logo.viewBox}
                                    height={logo.height}
                                    fill="currentColor"
                                    role="img"
                                    aria-label={logo.name}
                                >
                                    <path d={logo.path} />
                                </svg>
                            </div>
                            <div
                                className="logo-face logo-back"
                                aria-hidden="true"
                            >
                                <svg
                                    viewBox={logo.viewBox}
                                    height={logo.height}
                                    fill="currentColor"
                                >
                                    <path d={logo.path} />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}

export function FaqSection({ number, faqs }: { number: string; faqs: Faq[] }) {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <Section>
            <SectionHeading
                number={number}
                title={
                    <>
                        Frequently Asked <em>Questions</em>
                    </>
                }
                description="Answers to the questions we are asked most often about HVAC work, equipment supply, servicing, and repairs."
            />
            <div className="faq-layout">
                <img
                    src={photo('ac-indoor-airflow')}
                    alt="A wall-mounted split unit beside its outdoor condenser"
                    className="faq-image"
                    loading="lazy"
                    decoding="async"
                    {...appear('zoom', 0.4)}
                />
                <div className="flex flex-col gap-4" {...appear('up', 0.6)}>
                    {faqs.map((faq, index) => (
                        <details
                            key={faq.question}
                            className="faq-item"
                            open={open === index}
                            onToggle={(event) => {
                                const isOpen = event.currentTarget.open;

                                setOpen((current) =>
                                    isOpen
                                        ? index
                                        : current === index
                                          ? null
                                          : current,
                                );
                            }}
                        >
                            <summary>
                                {faq.question}
                                <span className="faq-plus" aria-hidden="true">
                                    +
                                </span>
                            </summary>
                            <p>{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </Section>
    );
}
