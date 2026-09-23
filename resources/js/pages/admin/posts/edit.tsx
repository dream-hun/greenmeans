import { Form, Head, Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import type { EditablePost } from '@/components/admin/post-form';
import PostFormFields from '@/components/admin/post-form';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { dashboard } from '@/routes';
import { show } from '@/routes/blog';
import { index } from '@/routes/admin/posts';

export default function EditPost({
    post,
    categories,
}: {
    post: EditablePost;
    categories: string[];
}) {
    return (
        <>
            <Head title={`Edit: ${post.title}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Edit article"
                        description={
                            post.is_published
                                ? 'This article is live on the website.'
                                : 'This article is not visible to the public yet.'
                        }
                    />
                    <Button variant="outline" asChild>
                        <Link href={show(post.slug)} target="_blank">
                            <ExternalLink />
                            {post.is_published ? 'View' : 'Preview'}
                        </Link>
                    </Button>
                </div>

                <Form
                    {...PostController.update.form(post.id)}
                    options={{ preserveScroll: true }}
                    className="space-y-8"
                >
                    {({ processing, errors }) => (
                        <>
                            <PostFormFields
                                key={post.slug}
                                post={post}
                                categories={categories}
                                errors={errors}
                            />

                            <div className="flex items-center justify-between gap-4">
                                <Button disabled={processing}>
                                    Save changes
                                </Button>
                                <DeletePost post={post} />
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

function DeletePost({ post }: { post: EditablePost }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant="destructive">
                    Delete article
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Delete this article?</DialogTitle>
                <DialogDescription>
                    “{post.title}” will be removed from the website permanently.
                    This cannot be undone.
                </DialogDescription>
                <Form {...PostController.destroy.form(post.id)}>
                    {({ processing }) => (
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button variant="destructive" disabled={processing}>
                                Delete article
                            </Button>
                        </DialogFooter>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

EditPost.layout = (props: { post: EditablePost }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Blog', href: index() },
        { title: props.post.title, href: PostController.edit(props.post.id) },
    ],
});
