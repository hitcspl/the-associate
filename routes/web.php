<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/inquiries', [InquiryController::class, 'store'])->name('inquiries.store');

// Public marketing pages. These components are self-contained, so they are
// rendered directly instead of going through a controller.
Route::inertia('/about', 'about/about')->name('about');
Route::inertia('/properties', 'properties/properties')->name('properties');
Route::inertia('/services', 'services/services')->name('services');
Route::inertia('/contact', 'contact/contact')->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
