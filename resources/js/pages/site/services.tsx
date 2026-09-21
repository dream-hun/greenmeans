import { Head } from '@inertiajs/react';
import { Ticker } from '@/components/site/motion';
import { FaqSection, ProcessCards } from '@/components/site/sections';
import ServiceSlider from '@/components/site/service-slider';
import {
    appear,
    Btn,
    GreenPanel,
    PageHero,
    photo,
    Section,
    SectionHeading,
} from '@/components/site/ui';
import { contact } from '@/routes';
import type { Faq, Service, Step } from '@/types/site';

interface Props {
    services: Service[];
    approach: Step[];
    faqs: Faq[];
}

const railImages = [
    'ac-indoor-split',
    'ac-outdoor-bank',
    'rail-supplier-brands',
];

export default function Services({ services, approach, faqs }: Props) {
    return (
        <>
            <Head title="Our Services">
                <meta
                    name="description"
                    content="Integrated solutions covering climate control, equipment supply, installation, maintenance, and repair from Green Means Ltd."
                />
            </Head>

            <PageHero
                title="HVAC, Electronics & Technical Services"
                description="Green Means Ltd provides integrated solutions covering climate control, equipment supply, installation, maintenance, and repair."
            />

            <Ticker
                label="Our work"
                className="image-rail section-space"
                {...appear('zoom', 0.6, true)}
            >
                {railImages.map((image) => (
                    <img
                        key={image}
                        src={photo(image)}
                        alt=""
                        className="h-[330px] w-[580px] shrink-0 rounded-[20px] object-cover"
                        loading="eager"
                        decoding="async"
                    />
                ))}
            </Ticker>

            <Section>
                <SectionHeading
                    number="01"
                    title="Our Services"
                    description="Eight service areas, from HVAC design and installation through to electronics supply, displays, audio, and our repair service centre."
                />
                <ServiceSlider services={services} />
            </Section>

            <GreenPanel>
                <SectionHeading
                    number="02"
                    title={
                        <>
                            Our Four-Step <em>Process</em>
                        </>
                    }
                    description="Every assignment follows the same route, so you always know which stage the work is at."
                />
                <ProcessCards steps={approach} />
            </GreenPanel>

            <Section className="section-top">
                <div className="section-heading" {...appear('up')}>
                    <div>
                        <span className="section-number">{'{ 03 }'}</span>
                        <h2>
                            Need Help Choosing
                            <br />
                            <em>the Right Service?</em>
                        </h2>
                    </div>
                    <div className="section-description">
                        <p>
                            Send us your requirements, equipment details, site
                            information, or technical problem. Our team will
                            identify the appropriate next step.
                        </p>
                        <Btn href={contact.url()} label="Request a Quote" />
                    </div>
                </div>
            </Section>

            <FaqSection number="04" faqs={faqs} />
        </>
    );
}
