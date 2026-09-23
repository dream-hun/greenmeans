import { Head } from '@inertiajs/react';
import {
    PartnerLogos,
    StatsSection,
    StepCards,
    ValuesTicker,
} from '@/components/site/sections';
import {
    appear,
    Btn,
    GreenPanel,
    PageHero,
    photo,
    Section,
    SectionHeading,
    SectionNumber,
} from '@/components/site/ui';
import { contact } from '@/routes';
import type { Stat, Step, Value } from '@/types/site';

interface Props {
    stats: Stat[];
    values: Value[];
    howWeWork: Step[];
}

const capabilities = [
    'VRF system design, supply, and installation',
    'Air-conditioning supply, installation, maintenance, and repair',
    'Heating-system supply and installation',
    'Air handling unit supply and installation',
    'Television and electronics supply',
    'Indoor and outdoor display solutions',
    'Home-appliance supply',
    'Sound and audio solutions',
    'Mobile-phone and electronics repair',
    'Television and refrigerator repair',
    'Air-conditioner repair and maintenance',
];

export default function About({ stats, values, howWeWork }: Props) {
    return (
        <>
            <Head title="About Us">
                <meta
                    name="description"
                    content="Green Means Ltd is a privately held specialty trade contractor headquartered in Kigali, Rwanda, founded in 2020."
                />
            </Head>

            <PageHero
                title="For Sustainable Solutions"
                description="Green Means Ltd provides HVAC, electronics, appliances, display, audio, and technical service solutions with a focus on quality, sustainability, and customer requirements."
            />

            <div
                className="wide-banner section-space"
                {...appear('zoom', 0.6, true)}
            >
                <img
                    src={photo('ac-outdoor-bank')}
                    alt="Cassette, split, and round-flow air-conditioning units supplied by Green Means Ltd"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                />
            </div>

            <StatsSection number="01" stats={stats} />

            <Section>
                <div className="editorial-grid">
                    <div {...appear('left')}>
                        <SectionNumber>02</SectionNumber>
                        <h2 className="section-title">
                            Who We Are: <em>Equipment</em>
                            <br />
                            <em>and Expertise</em>
                        </h2>
                    </div>
                    <div>
                        <p className="text-muted" {...appear('up', 0.4)}>
                            Green Means Ltd is a privately held specialty trade
                            contractor headquartered in Kigali, Rwanda. Founded
                            in 2020, the company serves customers in Rwanda. Our
                            work combines equipment supply with technical
                            expertise. We design, supply, install, maintain, and
                            repair HVAC systems while also providing
                            electronics, home appliances, display solutions,
                            sound systems, and technical repair services. We
                            support clients from initial requirements through
                            installation and ongoing maintenance, helping them
                            select solutions that are suitable for their spaces
                            and operational needs.
                        </p>
                        <div className="mt-12" {...appear('up', 0.4)}>
                            <h3 className="text-xl font-medium">What We Do</h3>
                            <ul className="text-muted mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                                {capabilities.map((capability) => (
                                    <li
                                        key={capability}
                                        className="flex gap-3 border-b border-[#e8e8e8] pb-3"
                                    >
                                        <span
                                            className="text-forest"
                                            aria-hidden="true"
                                        >
                                            —
                                        </span>
                                        {capability}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            <Section>
                <SectionHeading
                    number="03"
                    title={
                        <>
                            Our <em>Mission</em>
                        </>
                    }
                    description="Our mission guides the way we select and deliver solutions."
                />
                <div className="grid">
                    <article
                        className="grid items-center gap-6 rounded-2xl border border-black/5 bg-white p-6 md:grid-cols-2 md:gap-8 md:p-8"
                        {...appear('up', 0.4)}
                    >
                        <img
                            src={photo('about-mission')}
                            alt=""
                            className="aspect-[1.5] w-full rounded-xl object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl font-medium">
                                Our Mission
                            </h3>
                            <p className="text-muted text-sm">
                                To deliver innovative and environmentally
                                responsible solutions that meet diverse customer
                                needs while advancing energy efficiency,
                                dependable technology, and responsible business
                                practices across the HVAC, electronics, and
                                related sectors.
                            </p>
                        </div>
                    </article>
                </div>
            </Section>

            <GreenPanel after={<ValuesTicker values={values} />}>
                <SectionHeading
                    number="04"
                    title={
                        <>
                            The Values That <em>Guide Us</em>
                        </>
                    }
                    description="We consider energy efficiency, dependable equipment, and each customer's actual requirements in the solutions we recommend."
                />
            </GreenPanel>

            <Section className="section-top">
                <SectionHeading
                    number="05"
                    title={
                        <>
                            How We <em>Work</em>
                        </>
                    }
                    description="From the first requirement conversation to after-sales support, the same team stays with the project."
                />
                <StepCards steps={howWeWork} />
            </Section>

            <PartnerLogos number="06" />

            <Section>
                <div className="section-heading" {...appear('up')}>
                    <div>
                        <SectionNumber>07</SectionNumber>
                        <h2>
                            Work With a Technical Team Focused on
                            <br />
                            <em>Long-Term Performance</em>
                        </h2>
                    </div>
                    <div className="section-description">
                        <p>
                            Whether you need a new HVAC system, equipment
                            maintenance, electronics, appliances, displays,
                            audio solutions, or repairs, contact our team to
                            discuss your requirements.
                        </p>
                        <Btn href={contact.url()} label="Get in Touch" />
                    </div>
                </div>
            </Section>
        </>
    );
}
