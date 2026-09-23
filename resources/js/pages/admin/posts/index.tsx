import { Head, Link } from '@inertiajs/react';
import { Plus, Star } from 'lucide-react';
import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { create, index } from '@/routes/admin/posts';
import type { Paginated } from '@/types/site';

interface PostRow {
    id: number;
    slug: string;
    title: string;
    category: string;
    featured: boolean;
    published_at: string | null;
    is_published: boolean;
    updated_at: string | null;
}

export default function PostIndex({ posts }: { posts: Paginated<PostRow> }) {
    return (
        <>
            <Head title="Blog" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Blog"
                        description="Articles published under Insights & Updates on the website."
                    />
                    <Button asChild>
                        <Link href={create()}>
                            <Plus />
                            New article
                        </Link>
                    </Button>
                </div>

                {posts.data.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                        No articles yet. Create the first one to start the blog.
                    </p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Publish date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.data.map((post) => (
                                    <tr key={post.id} className="border-t">
                                        <td className="px-4 py-3">
                                            <Link
                                                href={PostController.edit(
                                                    post.id,
                                                )}
                                                className="inline-flex items-center gap-2 font-medium hover:underline"
                                            >
                                                {post.featured && (
                                                    <Star
                                                        className="size-4 fill-current text-amber-500"
                                                        aria-label="Featured"
                                                    />
                                                )}
                                                {post.title}
                                            </Link>
                                        </td>
                                        <td className="text-muted-foreground px-4 py-3">
                                            {post.category}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant={
                                                    post.is_published
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                            >
                                                {status(post)}
                                            </Badge>
                                        </td>
                                        <td className="text-muted-foreground px-4 py-3 whitespace-nowrap">
                                            {post.published_at
                                                ? new Date(
                                                      post.published_at,
                                                  ).toLocaleDateString()
                                                : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {posts.last_page > 1 && (
                    <div className="flex justify-between gap-2">
                        <Button
                            variant="outline"
                            disabled={!posts.prev_page_url}
                            asChild={Boolean(posts.prev_page_url)}
                        >
                            {posts.prev_page_url ? (
                                <Link href={posts.prev_page_url}>Previous</Link>
                            ) : (
                                'Previous'
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            disabled={!posts.next_page_url}
                            asChild={Boolean(posts.next_page_url)}
                        >
                            {posts.next_page_url ? (
                                <Link href={posts.next_page_url}>Next</Link>
                            ) : (
                                'Next'
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

function status(post: PostRow): string {
    if (post.is_published) {
        return 'Published';
    }

    return post.published_at ? 'Scheduled' : 'Draft';
}

PostIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Blog', href: index() },
    ],
};
