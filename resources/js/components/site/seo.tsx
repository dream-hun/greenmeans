import { Head, usePage } from '@inertiajs/react';
import type { Seo as SeoData } from '@/types/site';

/**
 * Keeps the search and social metadata in sync with the current page.
 *
 * The `head-key` values match the tags rendered by the `site` Blade
 * template, so the server-rendered tags are replaced rather than duplicated.
 */
export default function Seo() {
    const { seo } = usePage<{ seo?: SeoData }>().props;

    if (!seo) {
        return null;
    }

    return (
        <Head title={seo.title}>
            <meta
                head-key="description"
                name="description"
                content={seo.description}
            />
            <meta head-key="robots" name="robots" content={seo.robots} />
            <link head-key="canonical" rel="canonical" href={seo.canonical} />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={seo.site_name}
            />
            <meta
                head-key="og:locale"
                property="og:locale"
                content={seo.locale}
            />
            <meta head-key="og:type" property="og:type" content={seo.type} />
            <meta head-key="og:title" property="og:title" content={seo.title} />
            <meta
                head-key="og:description"
                property="og:description"
                content={seo.description}
            />
            <meta head-key="og:url" property="og:url" content={seo.canonical} />
            <meta head-key="og:image" property="og:image" content={seo.image} />
            <meta
                head-key="og:image:alt"
                property="og:image:alt"
                content={seo.image_alt}
            />
            {seo.published_time && (
                <meta
                    head-key="article:published_time"
                    property="article:published_time"
                    content={seo.published_time}
                />
            )}
            {seo.modified_time && (
                <meta
                    head-key="article:modified_time"
                    property="article:modified_time"
                    content={seo.modified_time}
                />
            )}
            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={seo.title}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={seo.description}
            />
            <meta
                head-key="twitter:image"
                name="twitter:image"
                content={seo.image}
            />
            <script
                head-key="schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: seo.schema }}
            />
        </Head>
    );
}
