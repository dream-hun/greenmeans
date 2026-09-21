import { Head } from '@inertiajs/react';
import { ContactForm } from '@/components/site/contact-form';
import { FaqSection } from '@/components/site/sections';
import { appear, Section, SectionHeading } from '@/components/site/ui';
import type { Faq } from '@/types/site';

const quoteChecklist = [
    'Project or building location',
    'Type of building or room',
    'Approximate room dimensions or floor area',
    'Number of rooms or zones',
    'Existing HVAC equipment, if any',
    'Required service: new installation, replacement, maintenance, or repair',
    'Preferred project timeframe',
];

export default function Contact({
    services,
    faqs,
}: {
    services: string[];
    faqs: Faq[];
}) {
    return (
        <>
            <Head title="Contact Us">
                <meta
                    name="description"
                    content="Contact Green Means Ltd about HVAC installation, maintenance, electronics, appliances, displays, audio solutions, or technical repair."
                />
            </Head>

            <section className="detail-page section-space">
                <div className="page-container">
                    <div className="grid items-start gap-14 md:grid-cols-[1fr_1.15fr]">
                        <div {...appear('left', 0.2, true)}>
                            <h1 className="text-[38px] leading-tight font-medium lg:text-[50px]">
                                Contact Green Means Ltd
                            </h1>
                            <p className="text-muted mt-6 max-w-[500px]">
                                Need HVAC installation, maintenance,
                                electronics, appliances, displays, audio
                                solutions, or technical repair? Tell us what you
                                need and our team can advise on the next step.
                            </p>
                            <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-12">
                                <div>
                                    <h2 className="text-xl font-medium">
                                        Head Office
                                    </h2>
                                    <p className="text-muted mt-4 max-w-[240px] text-sm">
                                        Green Means Ltd
                                        <br />
                                        30 KN 1 Road
                                        <br />
                                        Muhima, Kigali
                                        <br />
                                        Rwanda
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium">
                                        Service Area
                                    </h2>
                                    <p className="text-muted mt-4 max-w-[240px] text-sm">
                                        Rwanda
                                        <br />
                                        Burundi
                                        <br />
                                        Eastern DRC
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium">
                                        Website
                                    </h2>
                                    <a
                                        className="text-muted mt-4 block text-sm break-all"
                                        href="https://www.greenmeans.rw"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        www.greenmeans.rw
                                    </a>
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium">
                                        LinkedIn
                                    </h2>
                                    <a
                                        className="text-muted mt-4 block text-sm"
                                        href="https://www.linkedin.com/company/green-means-ltd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Green Means Ltd
                                    </a>
                                </div>
                            </div>
                            <p className="text-muted mt-12 max-w-[440px] text-xs">
                                Telephone, WhatsApp, and email details are
                                published here once confirmed. In the meantime,
                                send your request through the form and our team
                                will respond.
                            </p>
                        </div>
                        <div {...appear('up', 0.4, true)}>
                            <ContactForm services={services} />
                        </div>
                    </div>
                </div>
            </section>

            <Section>
                <SectionHeading
                    number="02"
                    title={
                        <>
                            Requesting an <em>HVAC Quote?</em>
                        </>
                    }
                    description="To help us understand your requirements, include as much of the following information as possible."
                />
                <ul className="text-muted grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                    {quoteChecklist.map((item, index) => (
                        <li
                            key={item}
                            className="flex gap-3 border-b border-[#e8e8e8] pb-3"
                            {...appear('up', 0.2 + index * 0.1)}
                        >
                            <span className="text-forest" aria-hidden="true">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </Section>

            <FaqSection number="03" faqs={faqs} />
        </>
    );
}
