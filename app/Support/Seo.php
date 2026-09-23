<?php

namespace App\Support;

use Carbon\CarbonInterface;
use Illuminate\Contracts\Support\Arrayable;

/**
 * Search engine and social sharing metadata for a public page.
 *
 * Rendered server-side by the site root template and kept up to date
 * during client-side navigation by the `Seo` React component.
 *
 * @implements Arrayable<string, mixed>
 */
class Seo implements Arrayable
{
    private ?string $canonical = null;

    private ?string $image = null;

    private ?string $imageAlt = null;

    private string $type = 'website';

    private bool $indexable = true;

    private ?CarbonInterface $publishedAt = null;

    private ?CarbonInterface $modifiedAt = null;

    /**
     * @var list<array<string, mixed>>
     */
    private array $schema = [];

    public function __construct(
        private string $title,
        private string $description,
    ) {}

    /**
     * Create the metadata for a page.
     */
    public static function make(string $title, string $description): self
    {
        return new self($title, $description);
    }

    /**
     * Override the canonical URL, which defaults to the current URL without its query string.
     */
    public function canonical(string $url): self
    {
        $this->canonical = $url;

        return $this;
    }

    /**
     * Set the image shown when the page is shared.
     */
    public function image(?string $url, ?string $alt = null): self
    {
        $this->image = $url;
        $this->imageAlt = $alt;

        return $this;
    }

    /**
     * Describe the page as an article.
     */
    public function article(?CarbonInterface $publishedAt, ?CarbonInterface $modifiedAt): self
    {
        $this->type = 'article';
        $this->publishedAt = $publishedAt;
        $this->modifiedAt = $modifiedAt;

        return $this;
    }

    /**
     * Ask search engines not to index the page.
     */
    public function noindex(): self
    {
        $this->indexable = false;

        return $this;
    }

    /**
     * Add a structured data node to the page.
     *
     * @param  array<string, mixed>  $node
     */
    public function schema(array $node): self
    {
        $this->schema[] = $node;

        return $this;
    }

    /**
     * Add a breadcrumb trail, from the home page to the current page.
     *
     * @param  array<string, string>  $trail  Absolute URLs keyed by page name.
     */
    public function breadcrumbs(array $trail): self
    {
        $items = [];
        $position = 1;

        foreach (['Home' => route('home')] + $trail as $name => $url) {
            $items[] = [
                '@type' => 'ListItem',
                'position' => $position++,
                'name' => $name,
                'item' => $url,
            ];
        }

        return $this->schema([
            '@type' => 'BreadcrumbList',
            'itemListElement' => $items,
        ]);
    }

    /**
     * The structured data describing the business, included on every page.
     *
     * @return array<string, mixed>
     */
    public static function organization(): array
    {
        /** @var array{name: string, short_name: string, founded: int, address: array{street: string, area: string, country: string}, phone_link: string, email: string, linkedin: string, areas: list<string>} $company */
        $company = config('site.company');

        /** @var list<array{slug: string, title: string}> $services */
        $services = config('site.services');

        return [
            '@type' => 'HVACBusiness',
            '@id' => route('home').'#organization',
            'name' => $company['name'],
            'alternateName' => $company['short_name'],
            'url' => route('home'),
            'logo' => asset('Greenmeans.png'),
            'image' => asset('site/optimized/hero-home-poster.webp'),
            'foundingDate' => (string) $company['founded'],
            'telephone' => $company['phone_link'],
            'email' => $company['email'],
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => $company['address']['street'],
                'addressLocality' => $company['address']['area'],
                'addressCountry' => 'RW',
            ],
            'areaServed' => [
                ['@type' => 'City', 'name' => 'Kigali'],
                ...array_map(fn (string $area): array => ['@type' => 'Country', 'name' => $area], $company['areas']),
            ],
            'hasOfferCatalog' => [
                '@type' => 'OfferCatalog',
                'name' => 'HVAC and technical services',
                'itemListElement' => array_map(fn (array $service): array => [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => $service['title'],
                        'url' => route('services.show', $service['slug']),
                    ],
                ], $services),
            ],
            'sameAs' => [$company['linkedin']],
        ];
    }

    /**
     * Get the metadata as an array.
     *
     * @return array{title: string, description: string, canonical: string, image: string, image_alt: string, type: string, robots: string, site_name: string, locale: string, published_time: string|null, modified_time: string|null, schema: string}
     */
    public function toArray(): array
    {
        $siteName = (string) config('app.name');

        return [
            'title' => $this->title,
            'description' => $this->description,
            'canonical' => $this->canonical ?? url()->current(),
            'image' => $this->image === null ? asset('site/optimized/hero-home-poster.webp') : url($this->image),
            'image_alt' => $this->imageAlt ?? $siteName,
            'type' => $this->type,
            'robots' => $this->indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
            'site_name' => $siteName,
            'locale' => 'en_RW',
            'published_time' => $this->publishedAt?->toIso8601String(),
            'modified_time' => $this->modifiedAt?->toIso8601String(),
            'schema' => $this->jsonLd(),
        ];
    }

    /**
     * The page's structured data, encoded for a JSON-LD script tag.
     */
    private function jsonLd(): string
    {
        $graph = [
            self::organization(),
            [
                '@type' => 'WebSite',
                '@id' => route('home').'#website',
                'url' => route('home'),
                'name' => config('app.name'),
                'publisher' => ['@id' => route('home').'#organization'],
            ],
            ...$this->schema,
        ];

        return (string) json_encode(
            ['@context' => 'https://schema.org', '@graph' => $graph],
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP,
        );
    }
}
