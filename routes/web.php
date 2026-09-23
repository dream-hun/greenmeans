<?php

use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Site\BlogController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\NewsletterController;
use App\Http\Controllers\Site\PageController;
use App\Http\Controllers\Site\SitemapController;
use App\Http\Middleware\SetSiteRootView;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::middleware(SetSiteRootView::class)->group(function () {
    Route::get('/', [PageController::class, 'home'])->name('home');
    Route::get('about', [PageController::class, 'about'])->name('about');

    Route::get('services', [PageController::class, 'services'])->name('services');
    Route::get('services/{service}', [PageController::class, 'service'])->name('services.show');

    Route::get('projects', [PageController::class, 'projects'])->name('projects');
    Route::get('projects/{project}', [PageController::class, 'project'])->name('projects.show');

    Route::get('blog', [BlogController::class, 'index'])->name('blog');
    Route::get('blog/{post}', [BlogController::class, 'show'])->name('blog.show');

    Route::get('contact', [PageController::class, 'contact'])->name('contact');
    Route::post('contact', [ContactController::class, 'store'])->name('contact.store');

    Route::post('newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');

    Route::get('privacy-policy', [PageController::class, 'privacy'])->name('privacy-policy');
    Route::get('terms-of-service', [PageController::class, 'terms'])->name('terms-of-service');
});

Route::get('sitemap.xml', [SitemapController::class, 'sitemap'])->name('sitemap');
Route::get('robots.txt', [SitemapController::class, 'robots'])->name('robots');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn (): Response => Inertia::render('dashboard'))->name('dashboard');

    Route::resource('dashboard/posts', PostController::class)
        ->except('show')
        ->names('admin.posts')
        ->parameters(['posts' => 'post:id']);
});

require __DIR__.'/settings.php';
