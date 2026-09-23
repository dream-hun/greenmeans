<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * List every public page for search engines.
     */
    public function sitemap(): Response
    {
        $blogUpdatedAt = Post::query()->published()->orderByDesc('updated_at')->first()?->updated_at;

        /** @var list<array{slug: string}> $services */
        $services = config('site.services');

        /** @var list<array{slug: string}> $projects */
        $projects = config('site.projects');

        $entries = [
            ['loc' => route('home'), 'priority' => '1.0'],
            ['loc' => route('about'), 'priority' => '0.8'],
            ['loc' => route('services'), 'priority' => '0.9'],
            ...array_map(fn (array $service): array => ['loc' => route('services.show', $service['slug']), 'priority' => '0.8'], $services),
            ['loc' => route('projects'), 'priority' => '0.8'],
            ...array_map(fn (array $project): array => ['loc' => route('projects.show', $project['slug']), 'priority' => '0.7'], $projects),
            ['loc' => route('blog'), 'priority' => '0.8', 'lastmod' => $blogUpdatedAt],
            ...Post::query()->published()->latestPublished()->get()->map(fn (Post $post): array => [
                'loc' => route('blog.show', $post),
                'priority' => '0.7',
                'lastmod' => $post->updated_at,
            ])->all(),
            ['loc' => route('contact'), 'priority' => '0.7'],
            ['loc' => route('privacy-policy'), 'priority' => '0.3'],
            ['loc' => route('terms-of-service'), 'priority' => '0.3'],
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

        foreach ($entries as $entry) {
            $xml .= '  <url>'."\n";
            $xml .= '    <loc>'.e($entry['loc']).'</loc>'."\n";

            if (isset($entry['lastmod'])) {
                $xml .= '    <lastmod>'.$entry['lastmod']->toAtomString().'</lastmod>'."\n";
            }

            $xml .= '    <priority>'.$entry['priority'].'</priority>'."\n";
            $xml .= '  </url>'."\n";
        }

        $xml .= '</urlset>'."\n";

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    /**
     * Tell crawlers which areas to skip and where the sitemap lives.
     */
    public function robots(): Response
    {
        $lines = app()->isProduction()
            ? [
                'User-agent: *',
                'Disallow: /dashboard',
                'Disallow: /settings',
                'Disallow: /login',
                'Disallow: /forgot-password',
                'Disallow: /reset-password',
                'Disallow: /two-factor-challenge',
                '',
                'Sitemap: '.route('sitemap'),
            ]
            : ['User-agent: *', 'Disallow: /'];

        return response(implode("\n", $lines)."\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }
}
