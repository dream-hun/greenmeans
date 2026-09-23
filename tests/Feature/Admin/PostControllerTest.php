<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;

test('guests cannot manage articles', function () {
    $this->get(route('admin.posts.index'))->assertRedirect(route('login'));
    $this->post(route('admin.posts.store'), [])->assertRedirect(route('login'));

    expect(Post::count())->toBe(0);
});

test('the article list includes drafts', function () {
    Post::factory()->create();
    Post::factory()->draft()->create();

    $response = $this->actingAs(User::factory()->create())->get(route('admin.posts.index'));

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('admin/posts/index')
        ->has('posts.data', 2)
    );
});

test('an article is created with an uploaded image and a slug from its title', function () {
    Storage::fake('public');

    $response = $this->actingAs(User::factory()->create())->post(route('admin.posts.store'), [
        'title' => 'Sizing a Split System',
        'slug' => '',
        'category' => 'HVAC',
        'excerpt' => 'How to size a split system.',
        'body' => "## Start with the room\n\nMeasure it.",
        'image' => UploadedFile::fake()->image('split.jpg', 1600, 900),
        'published_at' => '2026-09-01T09:00',
    ]);

    $post = Post::sole();

    $response->assertRedirect(route('admin.posts.edit', $post));
    expect($post->slug)->toBe('sizing-a-split-system')
        ->and($post->featured)->toBeFalse()
        ->and($post->published_at?->toDateString())->toBe('2026-09-01');
    Storage::disk('public')->assertExists((string) $post->image);
});

test('an article without the required fields is rejected', function () {
    $response = $this->actingAs(User::factory()->create())->post(route('admin.posts.store'), []);

    $response->assertSessionHasErrors(['title', 'slug', 'category', 'excerpt', 'body']);
    expect(Post::count())->toBe(0);
});

test('an article slug must be unique', function () {
    Post::factory()->create(['slug' => 'taken']);

    $response = $this->actingAs(User::factory()->create())->post(route('admin.posts.store'), [
        'title' => 'Another',
        'slug' => 'taken',
        'category' => 'HVAC',
        'excerpt' => 'Excerpt.',
        'body' => 'Body.',
    ]);

    $response->assertSessionHasErrors(['slug' => 'The slug has already been taken.']);
});

test('replacing an article image removes the previous upload', function () {
    Storage::fake('public');
    $old = UploadedFile::fake()->image('old.jpg')->store('posts', 'public');
    $post = Post::factory()->create(['image' => $old]);

    $this->actingAs(User::factory()->create())->put(route('admin.posts.update', $post), [
        'title' => $post->title,
        'slug' => $post->slug,
        'category' => $post->category,
        'excerpt' => $post->excerpt,
        'body' => $post->body,
        'image' => UploadedFile::fake()->image('new.jpg'),
    ])->assertRedirect(route('admin.posts.edit', $post));

    Storage::disk('public')->assertMissing((string) $old);
    Storage::disk('public')->assertExists((string) $post->refresh()->image);
});

test('featuring an article unfeatures the previous one', function () {
    $previous = Post::factory()->featured()->create();
    $post = Post::factory()->create();

    $this->actingAs(User::factory()->create())->put(route('admin.posts.update', $post), [
        'title' => $post->title,
        'slug' => $post->slug,
        'category' => $post->category,
        'excerpt' => $post->excerpt,
        'body' => $post->body,
        'featured' => '1',
    ]);

    expect($post->refresh()->featured)->toBeTrue()
        ->and($previous->refresh()->featured)->toBeFalse();
});

test('deleting an article removes it and its uploaded image', function () {
    Storage::fake('public');
    $image = UploadedFile::fake()->image('photo.jpg')->store('posts', 'public');
    $post = Post::factory()->create(['image' => $image]);

    $response = $this->actingAs(User::factory()->create())->delete(route('admin.posts.destroy', $post));

    $response->assertRedirect(route('admin.posts.index'));
    expect(Post::count())->toBe(0);
    Storage::disk('public')->assertMissing((string) $image);
});
