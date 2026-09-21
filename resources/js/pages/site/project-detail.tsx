import { Head, Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { ProjectGrid } from '@/components/site/sections';
import {
    appear,
    photo,
    Section,
    SectionHeading,
    SectionNumber,
} from '@/components/site/ui';
import { projects as projectsRoute } from '@/routes';
import type { Project } from '@/types/site';

export default function ProjectDetail({
    project,
    related,
}: {
    project: Project;
    related: Project[];
}) {
    const blocks = [
        {
            number: '02',
            heading: 'What the Work Involves',
            body: project.overview,
            image: 'project-block-overview',
        },
        {
            number: '03',
            heading: 'What We Assess First',
            body: project.requirement,
            image: 'project-block-assessment',
        },
        {
            number: '04',
            heading: 'What You Can Expect',
            body: project.outcome,
            image: 'project-block-outcome',
        },
    ];

    return (
        <>
            <Head title={project.name}>
                <meta name="description" content={project.summary} />
            </Head>

            <section className="detail-page section-space">
                <div className="page-container">
                    <Link
                        href={projectsRoute.url()}
                        className="text-forest hover:text-ink mb-20 inline-block text-sm"
                        {...appear('up', 0.2, true)}
                    >
                        ‹ &nbsp; Back to Projects
                    </Link>

                    <div className="project-detail-grid">
                        <div {...appear('up')}>
                            <SectionNumber>01</SectionNumber>
                            <h1 className="section-title">{project.name}</h1>
                            <dl className="mt-8 space-y-4 text-sm">
                                <div>
                                    <dt className="text-muted">Category</dt>
                                    <dd>{project.category}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted">Service area</dt>
                                    <dd>Rwanda, Burundi &amp; Eastern DRC</dd>
                                </div>
                                <div>
                                    <dt className="text-muted">Status</dt>
                                    <dd>{project.status}</dd>
                                </div>
                            </dl>
                        </div>
                        <div {...appear('up', 0.4)}>
                            <p className="text-muted ml-auto max-w-[400px]">
                                {project.summary}
                            </p>
                            <img
                                src={photo(project.image)}
                                alt=""
                                className="mt-16 aspect-[1.46] w-full rounded-[20px] object-cover"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                            />
                        </div>

                        {blocks.map((block) => (
                            <Fragment key={block.number}>
                                <div {...appear('up')}>
                                    <SectionNumber>
                                        {block.number}
                                    </SectionNumber>
                                    <h2 className="section-title max-w-[300px]">
                                        {block.heading}
                                    </h2>
                                </div>
                                <div {...appear('up', 0.4)}>
                                    <p className="text-muted">{block.body}</p>
                                    <img
                                        src={photo(block.image)}
                                        alt=""
                                        className="mt-16 aspect-[1.46] w-full rounded-[20px] object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <p className="text-muted mt-16 max-w-[640px] text-sm">
                        Verified client names, locations, completion dates, and
                        measured results are published once approved for
                        release.
                    </p>
                </div>
            </section>

            <Section>
                <SectionHeading
                    number="05"
                    title={
                        <>
                            More <em>Projects</em>
                        </>
                    }
                />
                <ProjectGrid projects={related} />
            </Section>
        </>
    );
}
