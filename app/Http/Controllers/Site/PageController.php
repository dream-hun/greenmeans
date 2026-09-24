<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Support\Seo;
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
            'seo' => Seo::make(
                'HVAC & Air Conditioning in Kigali, Rwanda',
                'Green Means Ltd designs, supplies, installs and repairs air conditioning, VRF and HVAC systems in Kigali, Rwanda, plus appliance repair. Request a free quote.',
            )->schema($this->faqSchema()),
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
            'seo' => Seo::make(
                'About Us: HVAC Contractor in Kigali',
                'Green Means Ltd is a Kigali-based HVAC and technical services contractor, founded in 2020, delivering air conditioning, electronics and repair across Rwanda.',
            )->image('/site/optimized/banner-about.webp')->breadcrumbs(['About Us' => route('about')]),
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
            'seo' => Seo::make(
                'HVAC, AC & Electronics Services in Rwanda',
                'HVAC design, AC installation, maintenance and repair, equipment supply, displays, audio and an appliance repair centre in Kigali, Rwanda. Explore our services.',
            )->breadcrumbs(['Our Services' => route('services')]),
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

        /** @var array{slug: string, title: string, seo_title: string, meta_description: string, excerpt: string, image: string} $entry */
        $entry = $services[$index];

        return Inertia::render('site/service-detail', [
            'seo' => Seo::make($entry['seo_title'], $entry['meta_description'])
                ->image("/site/optimized/{$entry['image']}.webp", $entry['title'])
                ->breadcrumbs([
                    'Our Services' => route('services'),
                    $entry['title'] => route('services.show', $entry['slug']),
                ])
                ->schema([
                    '@type' => 'Service',
                    'name' => $entry['title'],
                    'description' => $entry['excerpt'],
                    'serviceType' => $entry['title'],
                    'url' => route('services.show', $entry['slug']),
                    'provider' => ['@id' => route('home').'#organization'],
                    'areaServed' => ['@type' => 'Country', 'name' => 'Rwanda'],
                ]),
            'service' => $entry,
        ]);
    }

    /**
     * Show the projects overview page.
     */
    public function projects(): Response
    {
        return Inertia::render('site/projects', [
            'seo' => Seo::make(
                'HVAC & Air Conditioning Projects in Rwanda',
                'VRF, air conditioning, heating, air handling, display and audio work by Green Means Ltd across Rwanda, from site assessment to handover. View our projects.',
            )->breadcrumbs(['Our Projects' => route('projects')]),
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

        /** @var array{slug: string, name: string, seo_title: string, meta_description: string, summary: string, image: string} $entry */
        $entry = $projects[$index];

        return Inertia::render('site/project-detail', [
            'seo' => Seo::make($entry['seo_title'], $entry['meta_description'])
                ->image("/site/optimized/{$entry['image']}.webp", $entry['name'])
                ->breadcrumbs([
                    'Our Projects' => route('projects'),
                    $entry['name'] => route('projects.show', $entry['slug']),
                ]),
            'project' => $entry,
            'related' => array_slice(
                array_merge(array_slice($projects, $index + 1), array_slice($projects, 0, $index)),
                0,
                2
            ),
        ]);
    }

    /**
     * Show the contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('site/contact', [
            'seo' => Seo::make(
                'Contact Us for an HVAC Quote in Kigali',
                'Request a quote for AC installation, HVAC maintenance, AC repair or appliance repair in Kigali. Call 0793 084 852 or email sales@greenmeans.rw today.',
            )->breadcrumbs(['Contact Us' => route('contact')])->schema([
                '@type' => 'ContactPage',
                'url' => route('contact'),
                'about' => ['@id' => route('home').'#organization'],
            ]),
            'services' => array_column($this->serviceCatalogue(), 'title'),
            'faqs' => config('site.faqs'),
        ]);
    }

    /**
     * Show the privacy policy.
     */
    public function privacy(): Response
    {
        return Inertia::render('site/privacy-policy', [
            'seo' => Seo::make(
                'Privacy Policy',
                'How Green Means Ltd collects, uses, and protects the information you share with us.',
            ),
        ]);
    }

    /**
     * Show the terms of service.
     */
    public function terms(): Response
    {
        return Inertia::render('site/terms-of-service', [
            'seo' => Seo::make(
                'Terms of Service',
                'The terms that apply to the use of the Green Means Ltd website and to enquiries submitted through it.',
            ),
        ]);
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
     * Structured data for the frequently asked questions shown on the page.
     *
     * @return array<string, mixed>
     */
    private function faqSchema(): array
    {
        /** @var list<array{question: string, answer: string}> $faqs */
        $faqs = config('site.faqs');

        return [
            '@type' => 'FAQPage',
            'mainEntity' => array_map(fn (array $faq): array => [
                '@type' => 'Question',
                'name' => $faq['question'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $faq['answer']],
            ], $faqs),
        ];
    }

    /**
     * Add the display number used by the design to each entry.
     *
     * @template TEntry of array<string, mixed>
     *
     * @param  array<int, TEntry>  $entries
     * @return list<TEntry>
     */
    private function numbered(array $entries): array
    {
        $numberedEntries = [];

        foreach ($entries as $index => $entry) {
            $entry['number'] = str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT);
            $numberedEntries[] = $entry;
        }

        return $numberedEntries;
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
