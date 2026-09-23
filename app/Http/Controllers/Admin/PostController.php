<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * List every article, including drafts and scheduled articles.
     */
    public function index(): Response
    {
        $posts = Post::query()
            ->orderByRaw('published_at is null desc')
            ->latestPublished()
            ->paginate(20)
            ->through(fn (Post $post): array => [
                'id' => $post->id,
                'slug' => $post->slug,
                'title' => $post->title,
                'category' => $post->category,
                'featured' => $post->featured,
                'published_at' => $post->published_at?->toIso8601String(),
                'is_published' => $post->isPublished(),
                'updated_at' => $post->updated_at?->toIso8601String(),
            ]);

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for writing a new article.
     */
    public function create(): Response
    {
        return Inertia::render('admin/posts/create', [
            'categories' => $this->categories(),
        ]);
    }

    /**
     * Store a new article.
     */
    public function store(PostRequest $request): RedirectResponse
    {
        $post = new Post;

        $this->save($post, $request);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Article created.']);

        return to_route('admin.posts.edit', $post);
    }

    /**
     * Show the form for editing an article.
     */
    public function edit(Post $post): Response
    {
        return Inertia::render('admin/posts/edit', [
            'post' => [
                'id' => $post->id,
                'slug' => $post->slug,
                'title' => $post->title,
                'category' => $post->category,
                'excerpt' => $post->excerpt,
                'body' => $post->body,
                'image_url' => $post->imageUrl(),
                'image_alt' => $post->image_alt,
                'meta_title' => $post->meta_title,
                'meta_description' => $post->meta_description,
                'featured' => $post->featured,
                'published_at' => $post->published_at?->format('Y-m-d\TH:i'),
                'is_published' => $post->isPublished(),
            ],
            'categories' => $this->categories(),
        ]);
    }

    /**
     * Update an article.
     */
    public function update(PostRequest $request, Post $post): RedirectResponse
    {
        $this->save($post, $request);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Article updated.']);

        return to_route('admin.posts.edit', $post);
    }

    /**
     * Delete an article and its uploaded image.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->deleteUploadedImage($post);

        $post->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Article deleted.']);

        return to_route('admin.posts.index');
    }

    /**
     * Fill the article from the request and persist it.
     */
    private function save(Post $post, PostRequest $request): void
    {
        $post->fill($request->postAttributes());

        $image = $request->file('image');

        if ($image instanceof UploadedFile) {
            $this->deleteUploadedImage($post);

            $post->image = $image->store('posts', 'public') ?: null;
        }

        DB::transaction(function () use ($post): void {
            if ($post->featured) {
                Post::query()->whereKeyNot($post->getKey())->update(['featured' => false]);
            }

            $post->save();
        });
    }

    /**
     * Remove the article's uploaded image from storage.
     */
    private function deleteUploadedImage(Post $post): void
    {
        if ($post->image !== null && $post->hasUploadedImage()) {
            Storage::disk('public')->delete($post->image);
        }
    }

    /**
     * The categories already in use, offered as suggestions.
     *
     * @return list<string>
     */
    private function categories(): array
    {
        /** @var list<string> */
        return Post::query()->orderBy('category')->distinct()->pluck('category')->all();
    }
}
