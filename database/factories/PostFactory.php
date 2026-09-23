<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = rtrim(fake()->unique()->sentence(5), '.');

        return [
            'slug' => Str::slug($title),
            'title' => $title,
            'category' => fake()->randomElement(['HVAC', 'Maintenance', 'Display Solutions']),
            'excerpt' => fake()->paragraph(),
            'body' => '## '.fake()->sentence()."\n\n".fake()->paragraph()."\n\n".fake()->paragraph(),
            'image' => '/site/optimized/ac-indoor-airflow.webp',
            'image_alt' => null,
            'meta_title' => null,
            'meta_description' => null,
            'featured' => false,
            'published_at' => now()->subDay(),
        ];
    }

    /**
     * Indicate that the article is the featured article.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
        ]);
    }

    /**
     * Indicate that the article is an unpublished draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the article is scheduled for a future date.
     */
    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'published_at' => now()->addWeek(),
        ]);
    }
}
