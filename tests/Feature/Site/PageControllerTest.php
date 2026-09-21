<?php

use Inertia\Testing\AssertableInertia;

test('the home page renders with its content', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('site/home')
        ->has('services', count(config('site.services')))
        ->has('projects', 2)
        ->has('faqs')
    );
});

test('each marketing page renders its own component', function (string $route, string $component) {
    $response = $this->get(route($route));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page->component($component));
})->with([
    ['about', 'site/about'],
    ['services', 'site/services'],
    ['projects', 'site/projects'],
    ['blog', 'site/blog'],
    ['contact', 'site/contact'],
    ['privacy-policy', 'site/privacy-policy'],
    ['terms-of-service', 'site/terms-of-service'],
]);

test('a service page renders the requested service', function () {
    $response = $this->get(route('services.show', 'hvac-design'));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('site/service-detail')
        ->where('service.title', 'HVAC Design')
        ->where('service.number', '01')
    );
});

test('a project page renders the project and two others', function () {
    $response = $this->get(route('projects.show', 'vrf-system-installation'));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('site/project-detail')
        ->where('project.slug', 'vrf-system-installation')
        ->has('related', 2)
    );
});

test('the blog lists the featured article separately', function () {
    $response = $this->get(route('blog'));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('site/blog')
        ->where('featured.featured', true)
        ->has('posts', count(config('site.posts')) - 1)
    );
});

test('an article page renders the requested article', function () {
    $response = $this->get(route('blog.show', 'understanding-vrf-systems'));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('site/blog-detail')
        ->where('post.title', 'Understanding VRF Systems')
    );
});

test('an unknown slug returns the branded 404 page', function (string $route, string $parameter) {
    $response = $this->get(route($route, $parameter));

    $response->assertNotFound();
    $response->assertInertia(fn (AssertableInertia $page) => $page->component('site/not-found'));
})->with([
    ['services.show', 'no-such-service'],
    ['projects.show', 'no-such-project'],
    ['blog.show', 'no-such-article'],
]);
