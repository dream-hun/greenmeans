import { Link } from '@inertiajs/react';
import {
    appear,
    Btn,
    postImage,
    Section,
    SectionHeading,
    SectionNumber,
} from '@/components/site/ui';
import { blog, contact } from '@/routes';
import { show } from '@/routes/blog';
import type { Post, PostSummary } from '@/types/site';

export default function BlogDetail({
    post,
    related,
}: {
    post: Post;
    related: PostSummary[];
}) {
    return (
        <>
            <section className="detail-page section-space">
                <div className="page-container">
                    <Link
                        href={blog.url()}
                        className="text-forest hover:text-ink mb-20 inline-block text-sm"
                        {...appear('up', 0.2, true)}
                    >
                        ‹ &nbsp; Back to Insights
                    </Link>

                    <div
                        className="mx-auto max-w-[800px]"
                        {...appear('up', 0.2, true)}
                    >
                        <SectionNumber>{post.category}</SectionNumber>
                        <h1 className="text-[30px] leading-tight font-medium lg:text-[38px]">
                            {post.title}
                        </h1>
                        <p className="text-muted mt-5 text-sm">
                            {post.published_at && (
                                <>
                                    <time dateTime={post.published_at}>
                                        {formatDate(post.published_at)}
                                    </time>
                                    {' · '}
                                </>
                            )}
                            {post.reading_time} read · Green Means Ltd
                        </p>
                    </div>

                    <img
                        src={postImage(post.image)}
                        alt={post.image_alt}
                        className="my-[60px] aspect-[2.4] w-full rounded-[20px] object-cover"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        {...appear('zoom', 0.4, true)}
                    />

                    <article
                        className="prose mx-auto max-w-[800px]"
                        {...appear('up', 0.2)}
                    >
                        <div
                            className="article-body"
                            dangerouslySetInnerHTML={{ __html: post.body }}
                        />

                        <h2>Need Help With Your Requirements?</h2>
                        <p>
                            Green Means Ltd can assess your requirements and
                            recommend an appropriate system for your
                            application.
                        </p>
                        <div className="mt-10">
                            <Btn
                                href={contact.url()}
                                label="Request a Consultation"
                            />
                        </div>
                    </article>
                </div>
            </section>

            {related.length > 0 && (
                <Section>
                    <SectionHeading
                        number="02"
                        title={
                            <>
                                More <em>Insights</em>
                            </>
                        }
                    />
                    <div className="grid gap-x-9 gap-y-10 md:grid-cols-2">
                        {related.map((item) => (
                            <Link
                                key={item.slug}
                                href={show.url(item.slug)}
                                className="group"
                                {...appear('zoom', 0.3)}
                            >
                                <div className="zoom-media rounded-[20px]">
                                    <img
                                        src={postImage(item.image)}
                                        alt={item.image_alt}
                                        className="aspect-[1.6] w-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="text-muted mt-5 flex justify-between text-sm">
                                    <span>{item.category}</span>
                                    <span>{item.reading_time}</span>
                                </div>
                                <h3 className="mt-2 text-lg font-medium">
                                    {item.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </Section>
            )}
        </>
    );
}

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(value));
}
