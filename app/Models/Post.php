<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $category
 * @property string $excerpt
 * @property string $body
 * @property string|null $image
 * @property string|null $image_alt
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property bool $featured
 * @property CarbonImmutable|null $published_at
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 */
#[Fillable(['slug', 'title', 'category', 'excerpt', 'body', 'image', 'image_alt', 'meta_title', 'meta_description', 'featured', 'published_at'])]
class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory;

    /**
     * Average adult reading speed, in words per minute.
     */
    private const int WORDS_PER_MINUTE = 200;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Only include articles whose publication date has passed.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function published(Builder $query): void
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    /**
     * Order articles from the most recently published.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function latestPublished(Builder $query): void
    {
        $query->orderByDesc('published_at')->orderByDesc('id');
    }

    /**
     * Determine whether the article is visible on the public website.
     */
    public function isPublished(): bool
    {
        return $this->published_at !== null && $this->published_at->isPast();
    }

    /**
     * The public URL of the article image.
     *
     * Bundled images are stored as absolute paths, uploaded images as
     * paths on the public disk.
     */
    public function imageUrl(): ?string
    {
        if ($this->image === null || $this->image === '') {
            return null;
        }

        if (Str::startsWith($this->image, ['/', 'http://', 'https://'])) {
            return $this->image;
        }

        return Storage::disk('public')->url($this->image);
    }

    /**
     * Whether the image was uploaded rather than bundled with the website.
     */
    public function hasUploadedImage(): bool
    {
        return $this->image !== null && $this->imageUrl() !== $this->image;
    }

    /**
     * The estimated reading time, e.g. "3 minutes".
     */
    public function readingTime(): string
    {
        $minutes = max(1, (int) ceil(str_word_count(strip_tags($this->body)) / self::WORDS_PER_MINUTE));

        return $minutes.' '.Str::plural('minute', $minutes);
    }

    /**
     * The article body rendered from Markdown, with raw HTML removed.
     */
    public function bodyHtml(): string
    {
        return Str::markdown($this->body, [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
    }

    /**
     * The fields needed to list the article on the public website.
     *
     * @return array{slug: string, title: string, category: string, excerpt: string, image: string|null, image_alt: string, reading_time: string, featured: bool, published_at: string|null}
     */
    public function toSummary(): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'category' => $this->category,
            'excerpt' => $this->excerpt,
            'image' => $this->imageUrl(),
            'image_alt' => $this->image_alt ?? $this->title,
            'reading_time' => $this->readingTime(),
            'featured' => $this->featured,
            'published_at' => $this->published_at?->toIso8601String(),
        ];
    }
}
