<?php

namespace App\Http\Controllers;

use App\Mail\BookingCreated;
use App\Mail\ContactCreated;
use App\Models\Booking;
use App\Models\Contact;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{
    public function index()
    {
        return inertia('Home', [
            'seo' => [
                'title' => 'Professional Photography Services ',
                'description' => 'Capture your most precious moments with Nile Photography. Specializing in weddings, portraits, events, and commercial photography.',
                'keywords' => 'photography, wedding photography, portrait photography, event photography, Nile Photography',
                'image' => asset('gallery-4.jpg'),
                'url' => route('home'),
            ]
        ]);
    }

    public function about()
    {
        return inertia('About', [
            'seo' => [
                'title' => 'About ',
                'description' => 'Learn about Nile Photography, our passion for storytelling, and our commitment to capturing authentic moments through wedding, portrait, event, and commercial photography.',
                'keywords' => 'about Nile Photography, professional photographer, wedding photographer, portrait photographer, event photography, photography studio, creative photography, storytelling photography',
                'image' => asset('gallery-2.jpg'),
                'url' => url()->current(),
            ]
        ]);
    }

    public function blog()
    {
        return inertia('Blog');
    }

    public function portfolio()
    {
        $portfolios = Portfolio::with('images')->get();

        return inertia('Portfolio', [
            'portfolios' => $portfolios,
            'seo' => [
                'title' => 'Photography Portfolio | Weddings, Portraits & Events',
                'description' => 'Explore the Nile Photography portfolio featuring stunning wedding photography, portraits, corporate events, family sessions, and creative photography projects. Discover our latest work and timeless visual stories.',
                'keywords' => 'photography portfolio, wedding photography gallery, portrait photography portfolio, event photography, professional photographer portfolio, family photography, corporate photography, creative photography gallery',
                'image' => $portfolios->first()
                    ? asset('storage/' . $portfolios->first()->featured_image)
                    : asset('gallery-1.jpg'),
                'url' => url()->current(),
            ]
        ]);
    }

    public function services()
    {
        return inertia('Services', [
            'seo' => [
                'title' => 'Photography Services | Wedding, Portrait, Event & Commercial Photography',
                'description' => 'Discover professional photography services from Nile Photography. We specialize in wedding photography, portraits, corporate events, commercial photography, and custom photography sessions designed to preserve your most important moments.',
                'keywords' => 'photography services, wedding photography, portrait photography, event photography, commercial photography, corporate photography, professional photographer, photography booking, family photography, business photography',
                'image' => asset('gallery-1.jpg'),
                'url' => url()->current(),
            ]
        ]);
    }

    public function contact()
    {
        return inertia('Contact', [
            'seo' => [
                'title' => 'Contact | Book Your Photography Session',
                'description' => 'Get in touch with Nile Photography to book wedding photography, portrait sessions, event coverage, commercial photography, or request a custom quote. We are ready to bring your vision to life.',
                'keywords' => 'contact photographer, photography booking, wedding photographer contact, portrait photography booking, event photographer, commercial photographer, photography consultation, Berlin photographer',
                'image' => asset('gallery-3.jpg'),
                'url' => url()->current(),
            ]
        ]);
    }

    public function storeContact(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'service' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validatedData);

        Mail::to('admin@nilephotography.de')
            ->send(new ContactCreated($contact));

        return redirect()
            ->back()
            ->with('success', 'Your message has been sent successfully!');
    }

    public function storeBooking(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'service' => 'required|string|max:255',
            'date' => 'required|date',
            'message' => 'required|string',
        ]);

        $booking = Booking::create($validatedData);

        Mail::to('admin@nilephotography.de')
            ->send(new BookingCreated($booking));

        return redirect()
            ->back()
            ->with('success', 'Your booking request has been sent successfully!');
    }
}
