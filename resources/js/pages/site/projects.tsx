import { ProjectGrid, StepCards } from '@/components/site/sections';
import {
    appear,
    Btn,
    PageHero,
    Section,
    SectionHeading,
    SectionNumber,
} from '@/components/site/ui';
import { contact } from '@/routes';
import type { Project, Step } from '@/types/site';

const capabilities = [
    'HVAC design',
    'HVAC equipment supply',
    'Air-conditioning installation',
    'VRF system installation',
    'Heating systems',
    'Air handling units',
    'HVAC maintenance and repair',
    'Indoor and outdoor displays',
    'Sound and audio systems',
    'Electronics and appliance solutions',
];

export default function Projects({
    projects,
    process,
}: {
    projects: Project[];
    process: Step[];
}) {
    return (
        <>
            <PageHero
                title="Our Projects"
                description="Explore HVAC, climate-control, electronics, display, audio, and technical solutions delivered by Green Means Ltd."
            />

            <Section>
                <div className="editorial-grid">
                    <div {...appear('left')}>
                        <SectionNumber>01</SectionNumber>
                        <h2 className="section-title">
                            Every Project Has <em>Different</em>
                            <br />
                            <em>Technical Requirements</em>
                        </h2>
                    </div>
                    <div {...appear('up', 0.4)}>
                        <p className="text-muted">
                            Green Means Ltd approaches each assignment by first
                            understanding the environment, application, expected
                            performance, and client requirements before
                            selecting and implementing a solution.
                        </p>
                        <ul className="text-muted mt-10 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
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
            </Section>

            <Section>
                <SectionHeading
                    number="02"
                    title={
                        <>
                            What We <em>Deliver</em>
                        </>
                    }
                    description="Verified client projects, locations, and completion dates will be published here once approved. The work below describes what each category involves."
                />
                <ProjectGrid projects={projects} />
            </Section>

            <Section>
                <SectionHeading
                    number="03"
                    title={
                        <>
                            Our Project <em>Process</em>
                        </>
                    }
                    description="From the first site review through to maintenance support, every project follows the same sequence."
                />
                <StepCards steps={process} />
            </Section>

            <Section>
                <div className="section-heading" {...appear('up')}>
                    <div>
                        <SectionNumber>04</SectionNumber>
                        <h2>
                            Planning an HVAC or
                            <br />
                            <em>Technical Installation?</em>
                        </h2>
                    </div>
                    <div className="section-description">
                        <p>
                            Tell us what you are building, upgrading, replacing,
                            or repairing, and our team will advise on the next
                            step.
                        </p>
                        <Btn
                            href={contact.url()}
                            label="Discuss Your Project"
                        />
                    </div>
                </div>
            </Section>
        </>
    );
}
