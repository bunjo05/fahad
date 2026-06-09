<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/blog', [HomeController::class, 'blog'])->name('blog');
Route::get('/portfolio', [HomeController::class, 'portfolio'])->name('portfolio');
Route::get('/services', [HomeController::class, 'services'])->name('services');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');

Route::post('/contact', [HomeController::class, 'storeContact'])->name('contact.store');
Route::post('/booking', [HomeController::class, 'storeBooking'])->name('booking.store');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard/bookings', [DashboardController::class, 'bookings'])->name('dashboard.bookings.index');
    Route::patch(
        '/dashboard/bookings/{booking}',
        [DashboardController::class, 'updateBooking']
    )->name('dashboard.bookings.update');
    Route::get('/dashboard/contacts', [DashboardController::class, 'contacts'])->name('dashboard.contacts.index');
    Route::patch(
        '/dashboard/contacts/{contact}/read',
        [DashboardController::class, 'markContactRead']
    )->name('dashboard.contacts.read');
    Route::post(
        '/dashboard/contacts/{contact}/reply',
        [DashboardController::class, 'replyToContact']
    )->name('dashboard.contacts.reply');
    Route::get('/dashboard/portfolio', [DashboardController::class, 'portfolio'])->name('dashboard.portfolio.index');
    Route::post(
        '/dashboard/portfolio',
        [DashboardController::class, 'storePortfolio']
    )->name('dashboard.portfolio.store');
    Route::put('/dashboard/portfolio/{portfolio}', [DashboardController::class, 'updatePortfolio'])
        ->name('dashboard.portfolio.update');

    Route::delete('/dashboard/portfolio/{portfolio}', [DashboardController::class, 'destroyPortfolio'])
        ->name('dashboard.portfolio.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
