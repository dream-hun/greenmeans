import { Head, Link } from '@inertiajs/react';
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
import { show } from '@/routes/blog';
import type { Post } from '@/types/site';

interface Props {
    featured: Post;
    posts: Post[];
    categories: string[];
}

export default function Blog({ featured, posts, categories }: Props) {
    return (
        <>
            <Head title="Insights & Updates">
                <meta
                    name="description"
                    content="Practical information on HVAC systems, energy-efficient climate control, equipment maintenance, electronics, and technical solutions from Green Means Ltd."
                />
            </Head>

            <PageHero
                title="Insights & Updates"
                description="Practical information on HVAC systems, energy-efficient climate control, equipment maintenance, electronics, and technical solutions from Green Means Ltd."
            />

            <GreenPanel>
                <SectionHeading
                    number="01"
                    title={
                        <>
                            Featured <em>Article</em>
                        </>
                    }
                />
                <Link
                    className="success-card group"
                    href={show.url(featured.slug)}
                    {...appear('zoom-sm', 0.4)}
                >
                    <div className="flex min-w-0 flex-col items-start justify-between gap-8">
                        <span className="pill">
                            {featured.category}{' '}
                            <span className="pill-arrow" aria-hidden="true">
                                ↗
                            </span>
                        </span>
                        <div>
                            <h2 className="text-xl leading-[1.45] font-medium lg:text-[22px]">
                                {featured.title}
                            </h2>
                            <p className="mt-4 text-sm text-white/75">
                                {featured.excerpt}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-1">
                                <span className="tag">
                                    {featured.reading_time} read
                                </span>
                                <span className="tag">Green Means Ltd</span>
                            </div>
                        </div>
                    </div>
                    <div className="zoom-media h-full rounded-lg">
                        <img
                            src={photo(featured.image)}
                            alt=""
                            className="h-full min-h-[280px] w-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </Link>
            </GreenPanel>

            <Section className="section-top">
                <SectionHeading
                    number="02"
                    title={
                        <>
                            Latest <em>Articles</em>
                        </>
                    }
                    description="Guidance drawn from the work we do: system selection, installation planning, maintenance, displays, and repairs."
                />
                <div className="grid gap-x-9 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={show.url(post.slug)}
                            className="group"
                            {...appear('zoom', 0.3)}
                        >
                            <div className="zoom-media rounded-[20px]">
                                <img
                                    src={photo(post.image)}
                                    alt=""
                                    className="aspect-[1.3] w-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="text-muted mt-5 flex justify-between text-sm">
                                <span>{post.category}</span>
                                <span>{post.reading_time}</span>
                            </div>
                            <h3 className="mt-2 text-lg font-medium">
                                {post.title}
                            </h3>
                            <p className="text-muted mt-3 text-sm">
                                {post.excerpt}
                            </p>
                        </Link>
                    ))}
                </div>
            </Section>

            <Section>
                <div className="section-heading" {...appear('up')}>
                    <div>
                        <SectionNumber>03</SectionNumber>
                        <h2>
                            Need Technical Support
                            <br />
                            <em>Rather Than an Article?</em>
                        </h2>
                    </div>
                    <div className="section-description">
                        <p>
                            Contact Green Means Ltd for HVAC installation,
                            maintenance, equipment supply, or repair services.
                        </p>
                        <Btn href={contact.url()} label="Contact Our Team" />
                    </div>
                </div>
                <div
                    className="mt-10 flex flex-wrap gap-2"
                    {...appear('up', 0.4)}
                >
                    {categories.map((category) => (
                        <span
                            key={category}
                            className="text-muted rounded-full border border-[#dcdcdc] px-4 py-2 text-xs"
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </Section>
        </>
    );
}
