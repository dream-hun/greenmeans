import { Head, Link } from '@inertiajs/react';
import {
    FaqSection,
    PartnerLogos,
    ProcessCards,
    StatsSection,
    StepCards,
    SuccessStories,
    ServiceRail,
} from '@/components/site/sections';
import HeroVideo from '@/components/site/hero-video';
import { ScrollReveal } from '@/components/site/motion';
import {
    appear,
    Btn,
    clip,
    GreenPanel,
    photo,
    Section,
    SectionHeading,
    SectionNumber,
} from '@/components/site/ui';
import { about, blog, contact, services as servicesRoute } from '@/routes';
import type { Faq, Project, Service, Stat, Step, Value } from '@/types/site';

interface Props {
    services: Service[];
    projects: Project[];
    stats: Stat[];
    values: Value[];
    approach: Step[];
    faqs: Faq[];
}

export default function Home({
    services,
    projects,
    stats,
    values,
    approach,
    faqs,
}: Props) {
    return (
        <>
            <Head>
                <link
                    rel="preload"
                    as="image"
                    href={photo('hero-home-poster')}
                    fetchPriority="high"
                />
            </Head>

            <section className="home-hero">
                <div className="hero-media" {...appear('zoom', 0, true)}>
                    <HeroVideo
                        src={clip('hero-home')}
                        poster={photo('hero-home-poster')}
                        alt="A wall-mounted split air-conditioning unit supplied by Green Means Ltd"
                    />
                    <div className="hero-shade" />
                </div>
                <div className="page-container">
                    <div className="hero-copy">
                        <h1 {...appear('fade', 0, true)}>
                            Sustainable HVAC Solutions for
                            <br className="hidden md:block" /> Comfortable,
                            Efficient Spaces
                        </h1>
                        <p {...appear('up', 0.4, true)}>
                            HVAC, refrigeration and cold room, electronics,
                            appliance, display, audio, and technical support
                            solutions for homes, businesses, institutions, and
                            commercial facilities in Kigali and across Rwanda.
                        </p>
                        <div
                            className="mt-11.25 flex flex-wrap justify-center gap-3"
                            {...appear('up', 0.6, true)}
                        >
                            <Btn href={contact.url()} label="Request a Quote" />
                            <Btn
                                href={servicesRoute.url()}
                                label="Explore Our Services"
                                variant="btn-outline"
                            />
                        </div>
                    </div>
                    <div className="hero-bottom">
                        <Link
                            className="hero-update"
                            href={blog.url()}
                            {...appear('left', 0.6, true)}
                        >
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs font-medium">
                                        Insights
                                    </p>
                                    <p className="text-sm">Latest Article</p>
                                </div>
                                <span className="mini-arrow" aria-hidden="true">
                                    ↗
                                </span>
                            </div>
                            <p className="mt-3 text-[8px] leading-[1.75]">
                                What to consider before choosing an
                                air-conditioning system.
                            </p>
                        </Link>
                        <div
                            className="hero-reviews"
                            {...appear('right', 0.6, true)}
                        >
                            <div>
                                <p className="text-lg font-medium">
                                    Kigali, Rwanda
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Section className="section-top">
                <div className="about-intro">
                    <div
                        className="flex flex-col items-start justify-between gap-10"
                        {...appear('up')}
                    >
                        <div>
                            <SectionNumber>01</SectionNumber>
                            <h2 className="section-title">
                                About <em>Green Means</em>
                            </h2>
                        </div>
                        <p className="text-muted max-w-87.5">
                            Founded in 2020 and headquartered in Kigali, Green
                            Means Ltd provides technical solutions across
                            Rwanda.
                        </p>
                    </div>
                    <div {...appear('up')}>
                        <ScrollReveal
                            className="text-muted text-[22px] leading-[1.43] lg:text-[28px]"
                            text="From system design and equipment supply to installation, maintenance, and repair, we provide practical solutions focused on performance, energy efficiency, reliability, and long-term customer support."
                        />
                        <div className="mt-12">
                            <Btn
                                href={about.url()}
                                label="Learn More About Us"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            <StatsSection number="02" stats={stats} />

            <section className="section-space overflow-hidden">
                <div className="page-container">
                    <SectionHeading
                        number="03"
                        title={
                            <>
                                Technical Solutions
                                <br />
                                <em>Built Around Your Needs</em>
                            </>
                        }
                        description="Our core expertise is in HVAC systems. We also supply electronics and home appliances, provide display solutions, deliver sound and audio systems, and operate a repair service centre."
                        action={
                            <Btn
                                href={servicesRoute.url()}
                                label="View All Services"
                            />
                        }
                    />
                </div>
                <ServiceRail services={services} />
            </section>

            <SuccessStories number="04" projects={projects} />

            <Section className="section-top">
                <SectionHeading
                    number="05"
                    title={
                        <>
                            Why <em>Green Means</em>
                        </>
                    }
                    description="Every project starts with the customer's actual requirements. We recommend solutions according to the space, application, performance requirements, and budget."
                />
                <StepCards
                    steps={values.map((value, index) => ({
                        step: String(index + 1).padStart(2, '0'),
                        title: value.title,
                        description: value.description,
                    }))}
                />
            </Section>

            <GreenPanel>
                <SectionHeading
                    number="06"
                    title={
                        <>
                            Our <em>Approach</em>
                        </>
                    }
                    description="A consistent four-step method, from the first site review through to maintenance once the system is running."
                />
                <ProcessCards steps={approach} />
            </GreenPanel>

            <PartnerLogos number="07" />

            <FaqSection number="08" faqs={faqs} />
        </>
    );
}
