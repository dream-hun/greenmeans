<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectToCanonicalHost
{
    /**
     * Permanently redirect the "www" variant of the site to the host in the application URL.
     *
     * Serving the site on both hosts splits ranking signals between two
     * copies of every page, so only the configured host is allowed to answer.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $canonicalHost = (string) parse_url((string) config('app.url'), PHP_URL_HOST);

        if ($canonicalHost !== '' && $this->isAlternateHost($request->getHost(), $canonicalHost)) {
            return redirect()->away(rtrim((string) config('app.url'), '/').$request->getRequestUri(), 301);
        }

        return $next($request);
    }

    /**
     * Whether the host differs from the canonical host only by a "www." prefix.
     */
    private function isAlternateHost(string $host, string $canonicalHost): bool
    {
        return $host === 'www.'.$canonicalHost || 'www.'.$host === $canonicalHost;
    }
}
