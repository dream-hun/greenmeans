<?php

namespace App\Http\Requests\Admin;

use App\Models\Post;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $slug = $this->string('slug')->trim()->toString();

        $this->merge([
            'slug' => Str::slug($slug !== '' ? $slug : $this->string('title')->toString()),
            'featured' => $this->boolean('featured'),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $post = $this->route('post');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique(Post::class)->ignore($post instanceof Post ? $post->id : null),
            ],
            'category' => ['required', 'string', 'max:100'],
            'excerpt' => ['required', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'image_alt' => ['nullable', 'string', 'max:255'],
            'meta_title' => ['nullable', 'string', 'max:70'],
            'meta_description' => ['nullable', 'string', 'max:320'],
            'featured' => ['boolean'],
            'published_at' => ['nullable', 'date'],
        ];
    }

    /**
     * The validated article attributes, excluding the image upload.
     *
     * @return array{slug: string, title: string, category: string, excerpt: string, body: string, image_alt: string|null, meta_title: string|null, meta_description: string|null, featured: bool, published_at: Carbon|null}
     */
    public function postAttributes(): array
    {
        return [
            'slug' => $this->string('slug')->toString(),
            'title' => $this->string('title')->trim()->toString(),
            'category' => $this->string('category')->trim()->toString(),
            'excerpt' => $this->string('excerpt')->trim()->toString(),
            'body' => $this->string('body')->toString(),
            'image_alt' => $this->optionalString('image_alt'),
            'meta_title' => $this->optionalString('meta_title'),
            'meta_description' => $this->optionalString('meta_description'),
            'featured' => $this->boolean('featured'),
            'published_at' => $this->date('published_at'),
        ];
    }

    /**
     * A trimmed string input, or null when it was left empty.
     */
    private function optionalString(string $key): ?string
    {
        $value = $this->string($key)->trim()->toString();

        return $value === '' ? null : $value;
    }
}
