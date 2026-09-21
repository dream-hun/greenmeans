<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\NewsletterRequest;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;

class NewsletterController extends Controller
{
    /**
     * Subscribe an email address to the newsletter.
     */
    public function store(NewsletterRequest $request): RedirectResponse
    {
        NewsletterSubscriber::firstOrCreate($request->validated());

        return back();
    }
}
