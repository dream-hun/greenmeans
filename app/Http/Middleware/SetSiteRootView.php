<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SetSiteRootView
{
    /**
     * Render the public website through its own root template.
     *
     * The marketing site ships a separate stylesheet to the application,
     * so it cannot share the `app` root view.
     */
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::setRootView('site');

        return $next($request);
    }
}
