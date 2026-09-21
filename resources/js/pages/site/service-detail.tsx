import { Head } from '@inertiajs/react';
import { ServiceEnquiryForm } from '@/components/site/contact-form';
import { appear, Btn, photo, SectionNumber } from '@/components/site/ui';
import { contact } from '@/routes';
import type { Service } from '@/types/site';

const environments = [
    'Residential',
    'Commercial',
    'Institutional',
    'Hospitality',
    'Retail',
    'Offices',
    'Event venues',
];

export default function ServiceDetail({ service }: { service: Service }) {
    return (
        <>
            <Head title={service.title}>
                <meta name="description" content={service.excerpt} />
            </Head>

            <section className="detail-page section-space">
                <div className="page-container">
                    <div
                        className="section-heading"
                        {...appear('up', 0.2, true)}
                    >
                        <div>
                            <SectionNumber>{service.number}</SectionNumber>
                            <h1 className="section-title max-w-[400px]">
                                {service.title}
                            </h1>
                        </div>
                        <p className="section-description text-muted">
                            {service.summary}
                        </p>
                    </div>

                    <img
                        src={photo(service.image)}
                        alt=""
                        className="mb-[100px] aspect-[3] w-full rounded-[20px] object-cover"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        {...appear('zoom', 0.2, true)}
                    />

                    <div className="grid items-start gap-14 md:grid-cols-[1.55fr_1fr]">
                        <article className="prose" {...appear('up')}>
                            <p>{service.intro}</p>

                            <h4>What’s Included</h4>
                            <ul>
                                {service.included.map((item) => (
                                    <li key={item}>
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>

                            <h4>{service.title} for Every Space</h4>
                            <p>{service.excerpt}</p>

                            <h4>What You Can Expect</h4>
                            <ul>
                                {service.results.map((item) => (
                                    <li key={item}>
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>

                            <h4>Environments We Serve</h4>
                            <ul>
                                {environments.map((item) => (
                                    <li key={item}>
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>

                            <h4>Ready to Discuss Your Requirements?</h4>
                            <p>
                                Send us your site information, equipment
                                details, or technical problem, and our team will
                                identify the appropriate next step.
                            </p>
                            <div className="mt-10">
                                <Btn
                                    href={contact.url()}
                                    label="Request a Quote"
                                />
                            </div>
                        </article>

                        <aside
                            className="md:sticky md:top-[134px]"
                            {...appear('up', 0.4)}
                        >
                            <ServiceEnquiryForm service={service.title} />
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
