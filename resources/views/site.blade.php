<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="js">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="theme-color" content="#1b4332">

        <link rel="icon" href="/site/brand/mark-64.png" type="image/png" sizes="64x64">
        <link rel="apple-touch-icon" href="/site/brand/mark-64.png">
        <link rel="preload" href="/site/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>

        @viteReactRefresh
        @vite(['resources/css/site.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name') }}</title>
        </x-inertia::head>
    </head>
    <body class="bg-paper font-sans text-ink antialiased">
        <x-inertia::app />
    </body>
</html>
