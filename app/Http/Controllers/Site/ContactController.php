<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\ContactRequest;
use App\Models\ContactEnquiry;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    /**
     * Store an enquiry sent from one of the site's contact forms.
     */
    public function store(ContactRequest $request): RedirectResponse
    {
        ContactEnquiry::create($request->validated());

        return back();
    }
}
