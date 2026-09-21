import { Head, Link } from '@inertiajs/react';
import {
    appear,
    Btn,
    photo,
    Section,
    SectionHeading,
    SectionNumber,
} from '@/components/site/ui';
import { blog, contact } from '@/routes';
import { show } from '@/routes/blog';
import type { Post } from '@/types/site';

export default function BlogDetail({
    post,
    related,
}: {
    post: Post;
    related: Post[];
}) {
    return (
        <>
            <Head title={post.title}>
                <meta name="description" content={post.excerpt} />
            </Head>

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
                            {post.reading_time} read · Green Means Ltd
                        </p>
                    </div>

                    <img
                        src={photo(post.image)}
                        alt=""
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
                        {post.body.map((block, index) => {
                            if ('heading' in block) {
                                return <h2 key={index}>{block.heading}</h2>;
                            }

                            if ('list' in block) {
                                return (
                                    <ul key={index}>
                                        {block.list.map((item) => (
                                            <li key={item}>
                                                <p>{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }

                            return <p key={index}>{block.text}</p>;
                        })}

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
                                    src={photo(item.image)}
                                    alt=""
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
        </>
    );
}
