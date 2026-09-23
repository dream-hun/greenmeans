import { Form, Head } from '@inertiajs/react';
import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import PostFormFields from '@/components/admin/post-form';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { create, index } from '@/routes/admin/posts';

export default function CreatePost({ categories }: { categories: string[] }) {
    return (
        <>
            <Head title="New article" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading
                    title="New article"
                    description="Write an article for the Insights & Updates blog."
                />

                <Form {...PostController.store.form()} className="space-y-8">
                    {({ processing, errors }) => (
                        <>
                            <PostFormFields
                                categories={categories}
                                errors={errors}
                            />

                            <Button disabled={processing}>
                                Create article
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

CreatePost.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Blog', href: index() },
        { title: 'New article', href: create() },
    ],
};
