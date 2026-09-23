<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Support\Seo;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection as SupportCollection;
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
        $categories = $this->publishedCategories();
        $category = $this->requestedCategory($request, $categories);
        $featured = $category === null ? $this->featuredPost() : null;
        $posts = $this->listedPosts($category, $featured);

        return Inertia::render('site/blog', [
            'seo' => $this->indexSeo($category, $posts),
            'featured' => $featured?->toSummary(),
            'posts' => $posts->through(fn (Post $post): array => $post->toSummary()),
            'categories' => $categories,
            'activeCategory' => $category,
        ]);
    }

    /**
     * Show a single article.
     */
    public function show(Request $request, Post $post): Response
    {
        $this->ensureVisible($request, $post);

        return Inertia::render('site/blog-detail', [
            'seo' => $this->articleSeo($post),
            'post' => [
                ...$post->toSummary(),
                'body' => $post->bodyHtml(),
                'updated_at' => $post->updated_at?->toIso8601String(),
            ],
            'related' => $this->relatedPosts($post)->map(fn (Post $item): array => $item->toSummary()),
        ]);
    }

    /**
     * The categories that have at least one published article.
     *
     * @return SupportCollection<int, string>
     */
    private function publishedCategories(): SupportCollection
    {
        /** @var SupportCollection<int, string> */
        return Post::query()->published()->orderBy('category')->distinct()->pluck('category');
    }

    /**
     * The category filter from the query string, or fail with a 404 when it is unknown.
     *
     * @param  SupportCollection<int, string>  $categories
     */
    private function requestedCategory(Request $request, SupportCollection $categories): ?string
    {
        $category = $request->string('category')->toString();

        if ($category === '') {
            return null;
        }

        if (! $categories->contains($category)) {
            throw new NotFoundHttpException;
        }

        return $category;
    }

    /**
     * The most recently published featured article.
     */
    private function featuredPost(): ?Post
    {
        return Post::query()->published()->where('featured', true)->latestPublished()->first();
    }

    /**
     * The current page of articles, or fail with a 404 past the last page.
     *
     * @return LengthAwarePaginator<int, Post>
     */
    private function listedPosts(?string $category, ?Post $featured): LengthAwarePaginator
    {
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

        return $posts;
    }

    /**
     * Search metadata for a page of the blog index.
     *
     * @param  LengthAwarePaginator<int, Post>  $posts
     */
    private function indexSeo(?string $category, LengthAwarePaginator $posts): Seo
    {
        $page = $posts->currentPage();
        $title = $category === null ? 'Insights & Updates' : "{$category} Insights";

        return Seo::make(
            $page > 1 ? "{$title} (Page {$page})" : $title,
            'Practical information on HVAC systems, energy-efficient climate control, equipment maintenance, electronics, and technical solutions from Green Means Ltd.',
        )
            ->canonical(route('blog', array_filter(['category' => $category, 'page' => $page > 1 ? $page : null])))
            ->breadcrumbs(['Insights & Updates' => route('blog')])
            ->schema([
                '@type' => 'Blog',
                'name' => 'Insights & Updates',
                'url' => route('blog'),
                'publisher' => ['@id' => route('home').'#organization'],
            ]);
    }

    /**
     * Hide drafts and scheduled articles from visitors; signed-in staff may preview them.
     */
    private function ensureVisible(Request $request, Post $post): void
    {
        if (! $post->isPublished() && $request->user() === null) {
            throw new NotFoundHttpException;
        }
    }

    /**
     * Two other published articles, preferring the same category.
     *
     * @return Collection<int, Post>
     */
    private function relatedPosts(Post $post): Collection
    {
        return Post::query()
            ->published()
            ->whereKeyNot($post->getKey())
            ->orderByRaw('category = ? desc', [$post->category])
            ->latestPublished()
            ->limit(2)
            ->get();
    }

    /**
     * Search metadata and structured data for an article.
     */
    private function articleSeo(Post $post): Seo
    {
        $url = route('blog.show', $post);
        $imageUrl = $post->imageUrl();

        $seo = Seo::make($post->meta_title ?? $post->title, $post->meta_description ?? $post->excerpt)
            ->canonical($url)
            ->image($imageUrl, $post->image_alt ?? $post->title)
            ->article($post->published_at, $post->updated_at)
            ->breadcrumbs([
                'Insights & Updates' => route('blog'),
                $post->title => $url,
            ])
            ->schema([
                '@type' => 'BlogPosting',
                'headline' => $post->title,
                'description' => $post->excerpt,
                'image' => $imageUrl === null ? null : url($imageUrl),
                'datePublished' => $post->published_at?->toIso8601String(),
                'dateModified' => $post->updated_at?->toIso8601String(),
                'articleSection' => $post->category,
                'mainEntityOfPage' => $url,
                'author' => ['@id' => route('home').'#organization'],
                'publisher' => ['@id' => route('home').'#organization'],
            ]);

        return $post->isPublished() ? $seo : $seo->noindex();
    }
}
