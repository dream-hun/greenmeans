import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface EditablePost {
    id: number;
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    body: string;
    image_url: string | null;
    image_alt: string | null;
    meta_title: string | null;
    meta_description: string | null;
    featured: boolean;
    published_at: string | null;
    is_published: boolean;
}

const textareaClassName =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive block w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm';

/**
 * The fields shared by the create and edit article forms.
 */
export default function PostFormFields({
    post,
    categories,
    errors,
}: {
    post?: EditablePost;
    categories: string[];
    errors: Partial<Record<string, string>>;
}) {
    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
                <Field label="Title" name="title" error={errors.title}>
                    <Input
                        id="title"
                        name="title"
                        defaultValue={post?.title}
                        required
                        maxLength={255}
                    />
                </Field>

                <Field
                    label="Slug"
                    name="slug"
                    error={errors.slug}
                    hint="The article address, e.g. /blog/understanding-vrf-systems. Leave empty to generate it from the title."
                >
                    <Input
                        id="slug"
                        name="slug"
                        defaultValue={post?.slug}
                        maxLength={255}
                    />
                </Field>

                <Field
                    label="Excerpt"
                    name="excerpt"
                    error={errors.excerpt}
                    hint="Shown on the blog listing and used as the search result description."
                >
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        defaultValue={post?.excerpt}
                        required
                        maxLength={500}
                        rows={3}
                        className={textareaClassName}
                    />
                </Field>

                <Field
                    label="Body"
                    name="body"
                    error={errors.body}
                    hint="Write in Markdown: ## for headings, - for bullet points, **bold**, and [text](https://example.com) for links."
                >
                    <textarea
                        id="body"
                        name="body"
                        defaultValue={post?.body}
                        required
                        rows={24}
                        className={`${textareaClassName} font-mono`}
                    />
                </Field>
            </div>

            <div className="space-y-6">
                <Field
                    label="Publish date"
                    name="published_at"
                    error={errors.published_at}
                    hint="Leave empty to keep the article as a draft. A future date schedules it."
                >
                    <Input
                        id="published_at"
                        name="published_at"
                        type="datetime-local"
                        defaultValue={post?.published_at ?? undefined}
                    />
                </Field>

                <Field label="Category" name="category" error={errors.category}>
                    <Input
                        id="category"
                        name="category"
                        defaultValue={post?.category}
                        required
                        maxLength={100}
                        list="post-categories"
                    />
                    <datalist id="post-categories">
                        {categories.map((category) => (
                            <option key={category} value={category} />
                        ))}
                    </datalist>
                </Field>

                <div className="flex items-center gap-2">
                    <input
                        id="featured"
                        name="featured"
                        type="checkbox"
                        value="1"
                        defaultChecked={post?.featured}
                        className="size-4"
                    />
                    <Label htmlFor="featured">
                        Feature this article on the blog
                    </Label>
                </div>

                <Field
                    label="Image"
                    name="image"
                    error={errors.image}
                    hint="JPG, PNG, or WebP up to 4 MB. A wide image around 1600 × 900 works best."
                >
                    {post?.image_url && (
                        <img
                            src={post.image_url}
                            alt=""
                            className="mb-2 aspect-video w-full rounded-md object-cover"
                        />
                    )}
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                    />
                </Field>

                <Field
                    label="Image description"
                    name="image_alt"
                    error={errors.image_alt}
                    hint="Describes the image for screen readers and search engines. Defaults to the title."
                >
                    <Input
                        id="image_alt"
                        name="image_alt"
                        defaultValue={post?.image_alt ?? undefined}
                        maxLength={255}
                    />
                </Field>

                <fieldset className="space-y-6 rounded-lg border p-4">
                    <legend className="px-1 text-sm font-medium">
                        Search engines
                    </legend>

                    <Field
                        label="SEO title"
                        name="meta_title"
                        error={errors.meta_title}
                        hint="Optional. Up to 70 characters; defaults to the title."
                    >
                        <Input
                            id="meta_title"
                            name="meta_title"
                            defaultValue={post?.meta_title ?? undefined}
                            maxLength={70}
                        />
                    </Field>

                    <Field
                        label="SEO description"
                        name="meta_description"
                        error={errors.meta_description}
                        hint="Optional. Around 155 characters; defaults to the excerpt."
                    >
                        <textarea
                            id="meta_description"
                            name="meta_description"
                            defaultValue={post?.meta_description ?? undefined}
                            maxLength={320}
                            rows={3}
                            className={textareaClassName}
                        />
                    </Field>
                </fieldset>
            </div>
        </div>
    );
}

function Field({
    label,
    name,
    error,
    hint,
    children,
}: {
    label: string;
    name: string;
    error?: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>
            {children}
            {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
            <InputError message={error} />
        </div>
    );
}
