<?php

use App\Models\Post;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

test('the blog lists only published articles', function () {
    $published = Post::factory()->create();
    Post::factory()->draft()->create();
    Post::factory()->scheduled()->create();

    $response = $this->get(route('blog'));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('site/blog')
        ->where('featured', null)
        ->has('posts.data', 1)
        ->where('posts.data.0.slug', $published->slug)
    );
});

test('the blog can be filtered by category', function () {
    $hvac = Post::factory()->create(['category' => 'HVAC']);
    Post::factory()->create(['category' => 'Maintenance']);

    $response = $this->get(route('blog', ['category' => 'HVAC']));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->where('activeCategory', 'HVAC')
        ->has('posts.data', 1)
        ->where('posts.data.0.slug', $hvac->slug)
        ->where('categories', ['HVAC', 'Maintenance'])
        ->where('seo.canonical', route('blog', ['category' => 'HVAC']))
    );
});

test('an unknown blog category or page returns not found', function (array $query) {
    Post::factory()->create(['category' => 'HVAC']);

    $this->get(route('blog', $query))->assertNotFound();
})->with([
    'unknown category' => [['category' => 'Plumbing']],
    'page past the end' => [['page' => 5]],
]);

test('an article renders its markdown body without raw html', function () {
    $post = Post::factory()->create([
        'body' => "## Sizing\n\nPlan **carefully**.\n\n<script>alert('xss')</script>\n\n[bad](javascript:alert(1))",
    ]);

    $response = $this->get(route('blog.show', $post));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('site/blog-detail')
        ->where('post.body', fn (string $body) => str_contains($body, '<h2>Sizing</h2>')
            && str_contains($body, '<strong>carefully</strong>')
            && ! str_contains($body, '<script>')
            && ! str_contains($body, 'javascript:'))
    );
});

test('related articles favour the same category', function () {
    $post = Post::factory()->create(['category' => 'HVAC']);
    $sameCategory = Post::factory()->create(['category' => 'HVAC', 'published_at' => now()->subMonth()]);
    Post::factory()->create(['category' => 'Maintenance', 'published_at' => now()->subHour()]);

    $response = $this->get(route('blog.show', $post));

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->has('related', 2)
        ->where('related.0.slug', $sameCategory->slug)
    );
});

test('unpublished articles are hidden from visitors', function (?string $publishedAt) {
    $post = Post::factory()->create(['published_at' => $publishedAt]);

    $this->get(route('blog.show', $post))->assertNotFound();
})->with([
    'draft' => [null],
    'scheduled' => [fn () => now()->addWeek()->toDateTimeString()],
]);

test('signed-in staff can preview a draft, which is not indexed', function () {
    $post = Post::factory()->draft()->create();

    $response = $this->actingAs(User::factory()->create())->get(route('blog.show', $post));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->where('post.slug', $post->slug)
        ->where('seo.robots', 'noindex, follow')
    );
});
