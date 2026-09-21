<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PageController extends Controller
{
    /**
     * Show the home page.
     */
    public function home(): Response
    {
        return Inertia::render('site/home', [
            'services' => $this->serviceCatalogue(),
            'projects' => array_slice($this->projectCatalogue(), 0, 2),
            'stats' => config('site.stats'),
            'values' => config('site.values'),
            'approach' => config('site.approach'),
            'faqs' => config('site.faqs'),
        ]);
    }

    /**
     * Show the about page.
     */
    public function about(): Response
    {
        return Inertia::render('site/about', [
            'stats' => config('site.stats'),
            'values' => array_slice(config('site.values'), 0, 3),
            'howWeWork' => config('site.how_we_work'),
        ]);
    }

    /**
     * Show the services overview page.
     */
    public function services(): Response
    {
        return Inertia::render('site/services', [
            'services' => $this->serviceCatalogue(),
            'approach' => config('site.approach'),
            'faqs' => config('site.faqs'),
        ]);
    }

    /**
     * Show a single service.
     */
    public function service(string $service): Response
    {
        $services = $this->serviceCatalogue();
        $index = $this->indexOf($services, $service);

        return Inertia::render('site/service-detail', [
            'service' => $services[$index],
        ]);
    }

    /**
     * Show the projects overview page.
     */
    public function projects(): Response
    {
        return Inertia::render('site/projects', [
            'projects' => $this->projectCatalogue(),
            'process' => config('site.project_process'),
        ]);
    }

    /**
     * Show a single project.
     */
    public function project(string $project): Response
    {
        $projects = $this->projectCatalogue();
        $index = $this->indexOf($projects, $project);

        return Inertia::render('site/project-detail', [
            'project' => $projects[$index],
            'related' => array_values(array_slice(
                array_merge(array_slice($projects, $index + 1), array_slice($projects, 0, $index)),
                0,
                2
            )),
        ]);
    }

    /**
     * Show the blog index.
     */
    public function blog(): Response
    {
        $posts = $this->postCatalogue();

        return Inertia::render('site/blog', [
            'featured' => Arr::first($posts, fn (array $post): bool => $post['featured']) ?? $posts[0],
            'posts' => array_values(array_filter($posts, fn (array $post): bool => ! $post['featured'])),
            'categories' => array_values(array_unique(array_column($posts, 'category'))),
        ]);
    }

    /**
     * Show a single article.
     */
    public function post(string $post): Response
    {
        $posts = $this->postCatalogue();
        $index = $this->indexOf($posts, $post);

        return Inertia::render('site/blog-detail', [
            'post' => $posts[$index],
            'related' => array_values(array_slice(
                array_merge(array_slice($posts, $index + 1), array_slice($posts, 0, $index)),
                0,
                2
            )),
        ]);
    }

    /**
     * Show the contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('site/contact', [
            'services' => array_column($this->serviceCatalogue(), 'title'),
            'faqs' => config('site.faqs'),
        ]);
    }

    /**
     * Show the privacy policy.
     */
    public function privacy(): Response
    {
        return Inertia::render('site/privacy-policy');
    }

    /**
     * Show the terms of service.
     */
    public function terms(): Response
    {
        return Inertia::render('site/terms-of-service');
    }

    /**
     * The service catalogue, numbered in configuration order.
     *
     * @return array<int, array<string, mixed>>
     */
    private function serviceCatalogue(): array
    {
        return $this->numbered(config('site.services'));
    }

    /**
     * The project catalogue, numbered in configuration order.
     *
     * @return array<int, array<string, mixed>>
     */
    private function projectCatalogue(): array
    {
        return $this->numbered(config('site.projects'));
    }

    /**
     * The article catalogue, numbered in configuration order.
     *
     * @return array<int, array<string, mixed>>
     */
    private function postCatalogue(): array
    {
        return $this->numbered(config('site.posts'));
    }

    /**
     * Add the display number used by the design to each entry.
     *
     * @param  array<int, array<string, mixed>>  $entries
     * @return array<int, array<string, mixed>>
     */
    private function numbered(array $entries): array
    {
        return array_values(array_map(
            fn (array $entry, int $index): array => [...$entry, 'number' => str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)],
            $entries,
            array_keys($entries)
        ));
    }

    /**
     * Resolve the position of a slug, or fail with a 404.
     *
     * @param  array<int, array<string, mixed>>  $entries
     */
    private function indexOf(array $entries, string $slug): int
    {
        $index = array_search($slug, array_column($entries, 'slug'), true);

        if ($index === false) {
            throw new NotFoundHttpException;
        }

        return $index;
    }
}
