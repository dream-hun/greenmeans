<?php

use App\Models\NewsletterSubscriber;

test('an email address is subscribed', function () {
    $response = $this->from(route('home'))->post(route('newsletter.store'), [
        'email' => 'reader@example.com',
    ]);

    $response->assertRedirect(route('home'));
    $response->assertSessionHasNoErrors();
    expect(NewsletterSubscriber::sole()->email)->toBe('reader@example.com');
});

test('subscribing twice keeps a single record', function () {
    NewsletterSubscriber::factory()->create(['email' => 'reader@example.com']);

    $response = $this->from(route('home'))->post(route('newsletter.store'), [
        'email' => 'reader@example.com',
    ]);

    $response->assertSessionHasNoErrors();
    expect(NewsletterSubscriber::count())->toBe(1);
});

test('an invalid email address is rejected', function () {
    $response = $this->from(route('home'))->post(route('newsletter.store'), [
        'email' => 'not-an-email',
    ]);

    $response->assertSessionHasErrors('email');
    expect(NewsletterSubscriber::count())->toBe(0);
});
