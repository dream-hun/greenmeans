<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Support\Seo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BlogController extends Controller
{
    /**
     * Number of articles listed on each page of the blog.
     */
    private const int PER_PAGE = 9;

    /**
     * Show the blog index, optionally filtered by category.
     */
    public function index(Request $request): Response
    {
        $categories = Post::query()->published()->orderBy('category')->distinct()->pluck('category');
        $category = $request->string('category')->toString() ?: null;

        if ($category !== null && ! $categories->contains($category)) {
            throw new NotFoundHttpException;
        }

        $featured = $category === null
            ? Post::query()->published()->where('featured', true)->latestPublished()->first()
            : null;

        $posts = Post::query()
            ->published()
            ->when($category, fn ($query, string $category) => $query->where('category', $category))
            ->when($featured, fn ($query, Post $featured) => $query->whereKeyNot($featured->getKey()))
            ->latestPublished()
            ->paginate(self::PER_PAGE)
            ->withQueryString();

        if ($posts->currentPage() > 1 && $posts->isEmpty()) {
            throw new NotFoundHttpException;
        }

        $canonicalQuery = array_filter([
            'category' => $category,
            'page' => $posts->currentPage() > 1 ? $posts->currentPage() : null,
        ]);

        $title = $category === null ? 'Insights & Updates' : "{$category} Insights";

        return Inertia::render('site/blog', [
            'seo' => Seo::make(
                $posts->currentPage() > 1 ? "{$title} (Page {$posts->currentPage()})" : $title,
                'Practical information on HVAC systems, energy-efficient climate control, equipment maintenance, electronics, and technical solutions from Green Means Ltd.',
            )
                ->canonical(route('blog', $canonicalQuery))
                ->breadcrumbs(['Insights & Updates' => route('blog')])
                ->schema([
                    '@type' => 'Blog',
                    'name' => 'Insights & Updates',
                    'url' => route('blog'),
                    'publisher' => ['@id' => route('home').'#organization'],
                ]),
            'featured' => $featured?->toSummary(),
            'posts' => $posts->through(fn (Post $post): array => $post->toSummary()),
            'categories' => $categories,
            'activeCategory' => $category,
        ]);
    }

    /**
     * Show a single article.
     *
     * Signed-in staff may preview drafts and scheduled articles.
     */
    public function show(Request $request, Post $post): Response
    {
        if (! $post->isPublished() && $request->user() === null) {
            throw new NotFoundHttpException;
        }

        $related = Post::query()
            ->published()
            ->whereKeyNot($post->getKey())
            ->orderByRaw('category = ? desc', [$post->category])
            ->latestPublished()
            ->limit(2)
            ->get();

        $seo = Seo::make($post->meta_title ?? $post->title, $post->meta_description ?? $post->excerpt)
            ->canonical(route('blog.show', $post))
            ->image($post->imageUrl(), $post->image_alt ?? $post->title)
            ->article($post->published_at, $post->updated_at)
            ->breadcrumbs([
                'Insights & Updates' => route('blog'),
                $post->title => route('blog.show', $post),
            ])
            ->schema([
                '@type' => 'BlogPosting',
                'headline' => $post->title,
                'description' => $post->excerpt,
                'image' => $post->imageUrl() === null ? null : url($post->imageUrl()),
                'datePublished' => $post->published_at?->toIso8601String(),
                'dateModified' => $post->updated_at?->toIso8601String(),
                'articleSection' => $post->category,
                'mainEntityOfPage' => route('blog.show', $post),
                'author' => ['@id' => route('home').'#organization'],
                'publisher' => ['@id' => route('home').'#organization'],
            ]);

        if (! $post->isPublished()) {
            $seo->noindex();
        }

        return Inertia::render('site/blog-detail', [
            'seo' => $seo,
            'post' => [
                ...$post->toSummary(),
                'body' => $post->bodyHtml(),
                'updated_at' => $post->updated_at?->toIso8601String(),
            ],
            'related' => $related->map(fn (Post $item): array => $item->toSummary()),
        ]);
    }
}
