<?php

use App\Models\Post;
use App\Models\User;

test('public pages render search and social metadata on the server', function () {
    $response = $this->get(route('about'));

    $response->assertOk();
    $response->assertSee('<title data-inertia>About Us: HVAC Contractor in Kigali - '.config('app.name').'</title>', false);
    $response->assertSee('<meta data-inertia="description" name="description" content="Green Means Ltd is a Kigali-based HVAC', false);
    $response->assertSee('<link data-inertia="canonical" rel="canonical" href="'.route('about').'">', false);
    $response->assertSee('<meta data-inertia="og:image" property="og:image" content="'.url('/site/optimized/banner-about.webp').'">', false);
    $response->assertSee('"@type":"HVACBusiness"', false);
    $response->assertSee('"@type":"BreadcrumbList"', false);
});

test('service pages use their search title and description', function () {
    $response = $this->get(route('services.show', 'hvac-installation'));

    $response->assertSee('<title data-inertia>AC &amp; HVAC Installation in Kigali, Rwanda - '.config('app.name').'</title>', false);
    $response->assertSee('<meta data-inertia="description" name="description" content="Professional air conditioner, VRF and air handling unit installation in Kigali', false);
});

test('every service and project has a title and description that fit search results', function (string $key) {
    $suffixLength = strlen(' - '.config('app.name'));

    /** @var list<array{slug: string, seo_title: string, meta_description: string}> $entries */
    $entries = config("site.{$key}");

    foreach ($entries as $entry) {
        expect(strlen($entry['seo_title']) + $suffixLength)->toBeLessThanOrEqual(60, "{$entry['slug']} title");
        expect(strlen($entry['meta_description']))->toBeBetween(120, 160);
    }
})->with(['services', 'projects']);

test('the business structured data lists every service', function () {
    $response = $this->get(route('home'));

    $response->assertSee('"@type":"OfferCatalog"', false);
    $response->assertSee('"url":"'.route('services.show', 'repair-service-center').'"', false);
});

test('public pages load google tag manager in production', function () {
    app()->detectEnvironment(fn () => 'production');
    config(['services.google_tag_manager.id' => 'GTM-TEST123']);

    $response = $this->get(route('home'));

    $response->assertSee("'dataLayer','GTM-TEST123'", false);
    $response->assertSee('https://www.googletagmanager.com/ns.html?id=GTM-TEST123', false);
});

test('google tag manager is not loaded outside production', function () {
    config(['services.google_tag_manager.id' => 'GTM-TEST123']);

    $this->get(route('home'))->assertDontSee('GTM-TEST123', false);
});

test('article metadata escapes content from the editor', function () {
    $post = Post::factory()->create(['title' => 'Cooling </script><script>alert(1)</script>']);

    $response = $this->get(route('blog.show', $post));

    $response->assertOk();
    $response->assertSee('"@type":"BlogPosting"', false);
    $response->assertSee('<meta data-inertia="og:type" property="og:type" content="article">', false);
    $response->assertDontSee('</script><script>alert(1)', false);
});

test('missing pages are not indexed', function () {
    $this->get('/no-such-page')
        ->assertNotFound()
        ->assertSee('<meta data-inertia="robots" name="robots" content="noindex, follow">', false);
});

test('application pages are not indexed', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertSee('<meta name="robots" content="noindex, nofollow">', false);
});

test('the sitemap lists public pages and published articles only', function () {
    $published = Post::factory()->create();
    $draft = Post::factory()->draft()->create();

    $response = $this->get(route('sitemap'));

    $response->assertOk();
    $response->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
    $response->assertSee('<loc>'.route('home').'</loc>', false);
    $response->assertSee('<loc>'.route('services.show', 'hvac-design').'</loc>', false);
    $response->assertSee('<loc>'.route('blog.show', $published).'</loc>', false);
    $response->assertDontSee(route('blog.show', $draft), false);
});

test('robots.txt points crawlers to the sitemap in production', function () {
    app()->detectEnvironment(fn () => 'production');

    $this->get(route('robots'))
        ->assertOk()
        ->assertSee('Sitemap: '.route('sitemap'))
        ->assertSee('Disallow: /dashboard');
});

test('robots.txt blocks crawlers outside production', function () {
    $this->get(route('robots'))
        ->assertOk()
        ->assertSee("User-agent: *\nDisallow: /\n", false);
});
