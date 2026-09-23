import { Link } from '@inertiajs/react';
import {
    appear,
    Btn,
    GreenPanel,
    PageHero,
    postImage,
    Section,
    SectionHeading,
    SectionNumber,
} from '@/components/site/ui';
import { blog, contact } from '@/routes';
import { show } from '@/routes/blog';
import type { Paginated, PostSummary } from '@/types/site';

interface Props {
    featured: PostSummary | null;
    posts: Paginated<PostSummary>;
    categories: string[];
    activeCategory: string | null;
}

export default function Blog({
    featured,
    posts,
    categories,
    activeCategory,
}: Props) {
    return (
        <>
            <PageHero
                title={
                    activeCategory
                        ? `${activeCategory} Insights`
                        : 'Insights & Updates'
                }
                description="Practical information on HVAC systems, energy-efficient climate control, equipment maintenance, electronics, and technical solutions from Green Means Ltd."
            />

            {featured && posts.current_page === 1 && (
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
                                src={postImage(featured.image)}
                                alt={featured.image_alt}
                                className="h-full min-h-[280px] w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </Link>
                </GreenPanel>
            )}

            <Section className="section-top">
                <SectionHeading
                    number={featured ? '02' : '01'}
                    title={
                        <>
                            Latest <em>Articles</em>
                        </>
                    }
                    description="Guidance drawn from the work we do: system selection, installation planning, maintenance, displays, and repairs."
                />

                {categories.length > 1 && (
                    <nav
                        aria-label="Article categories"
                        className="mb-12 flex flex-wrap gap-2"
                        {...appear('up', 0.3)}
                    >
                        <CategoryLink
                            href={blog.url()}
                            label="All"
                            active={activeCategory === null}
                        />
                        {categories.map((category) => (
                            <CategoryLink
                                key={category}
                                href={blog.url({ query: { category } })}
                                label={category}
                                active={activeCategory === category}
                            />
                        ))}
                    </nav>
                )}

                {posts.data.length === 0 ? (
                    <p className="text-muted">
                        No articles have been published yet. Check back soon.
                    </p>
                ) : (
                    <div className="grid gap-x-9 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <Link
                                key={post.slug}
                                href={show.url(post.slug)}
                                className="group"
                                {...appear('zoom', 0.3)}
                            >
                                <div className="zoom-media rounded-[20px]">
                                    <img
                                        src={postImage(post.image)}
                                        alt={post.image_alt}
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
                )}

                {posts.last_page > 1 && (
                    <nav
                        aria-label="Article pages"
                        className="mt-16 flex flex-wrap items-center justify-center gap-2"
                    >
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    aria-current={
                                        link.active ? 'page' : undefined
                                    }
                                    className={`rounded-full border px-4 py-2 text-sm ${
                                        link.active
                                            ? 'border-forest bg-forest text-white'
                                            : 'text-muted hover:text-ink border-[#dcdcdc]'
                                    }`}
                                >
                                    {link.label
                                        .replace('&laquo;', '‹')
                                        .replace('&raquo;', '›')}
                                </Link>
                            ) : null,
                        )}
                    </nav>
                )}
            </Section>

            <Section>
                <div className="section-heading" {...appear('up')}>
                    <div>
                        <SectionNumber>{featured ? '03' : '02'}</SectionNumber>
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
            </Section>
        </>
    );
}

function CategoryLink({
    href,
    label,
    active,
}: {
    href: string;
    label: string;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            preserveScroll
            aria-current={active ? 'page' : undefined}
            className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                active
                    ? 'border-forest bg-forest text-white'
                    : 'text-muted hover:text-ink border-[#dcdcdc]'
            }`}
        >
            {label}
        </Link>
    );
}
