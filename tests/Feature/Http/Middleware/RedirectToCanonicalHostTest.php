<?php

beforeEach(function () {
    config(['app.url' => 'https://greenmeans.rw']);
});

test('the www host redirects permanently to the canonical host, keeping the path and query', function () {
    $response = $this->get('https://www.greenmeans.rw/blog?category=HVAC');

    $response->assertMovedPermanently();
    $response->assertRedirect('https://greenmeans.rw/blog?category=HVAC');
});

test('the canonical host is served without a redirect', function () {
    $this->get('https://greenmeans.rw/about')->assertOk();
});

test('the canonical host redirects the bare domain when the application url uses www', function () {
    config(['app.url' => 'https://www.greenmeans.rw']);

    $this->get('https://greenmeans.rw/about')->assertRedirect('https://www.greenmeans.rw/about');
});
