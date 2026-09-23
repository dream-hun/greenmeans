<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="js">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="theme-color" content="#1b4332">

        <link rel="icon" href="/Greenmeans.png" type="image/png">
        <link rel="sitemap" type="application/xml" href="{{ route('sitemap') }}">
        <link rel="apple-touch-icon" href="/Greenmeans.png">
        <link rel="preload" href="/site/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>

        @viteReactRefresh
        @vite(['resources/css/site.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        {{-- Server-rendered fallback when SSR is unavailable; keys match the Seo React component. --}}
        <x-inertia::head>
            @php($seo = $page['props']['seo'] ?? null)
            @if (is_array($seo))
                <title data-inertia>{{ $seo['title'] }} - {{ config('app.name') }}</title>
                <meta data-inertia="description" name="description" content="{{ $seo['description'] }}">
                <meta data-inertia="robots" name="robots" content="{{ $seo['robots'] }}">
                <link data-inertia="canonical" rel="canonical" href="{{ $seo['canonical'] }}">
                <meta data-inertia="og:site_name" property="og:site_name" content="{{ $seo['site_name'] }}">
                <meta data-inertia="og:locale" property="og:locale" content="{{ $seo['locale'] }}">
                <meta data-inertia="og:type" property="og:type" content="{{ $seo['type'] }}">
                <meta data-inertia="og:title" property="og:title" content="{{ $seo['title'] }}">
                <meta data-inertia="og:description" property="og:description" content="{{ $seo['description'] }}">
                <meta data-inertia="og:url" property="og:url" content="{{ $seo['canonical'] }}">
                <meta data-inertia="og:image" property="og:image" content="{{ $seo['image'] }}">
                <meta data-inertia="og:image:alt" property="og:image:alt" content="{{ $seo['image_alt'] }}">
                @if ($seo['published_time'])
                    <meta data-inertia="article:published_time" property="article:published_time" content="{{ $seo['published_time'] }}">
                @endif
                @if ($seo['modified_time'])
                    <meta data-inertia="article:modified_time" property="article:modified_time" content="{{ $seo['modified_time'] }}">
                @endif
                <meta data-inertia="twitter:card" name="twitter:card" content="summary_large_image">
                <meta data-inertia="twitter:title" name="twitter:title" content="{{ $seo['title'] }}">
                <meta data-inertia="twitter:description" name="twitter:description" content="{{ $seo['description'] }}">
                <meta data-inertia="twitter:image" name="twitter:image" content="{{ $seo['image'] }}">
                <script data-inertia="schema" type="application/ld+json">{!! $seo['schema'] !!}</script>
            @else
                <title data-inertia>{{ config('app.name') }}</title>
            @endif
        </x-inertia::head>
    </head>
    <body class="bg-paper font-sans text-ink antialiased">
        <x-inertia::app />
    </body>
</html>
