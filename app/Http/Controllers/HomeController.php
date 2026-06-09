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
        return inertia('Home');
    }

    public function about()
    {
        return inertia('About');
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
        ]);
    }

    public function services()
    {
        return inertia('Services');
    }

    public function contact()
    {
        return inertia('Contact');
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

        Mail::to('bunjosteven5@gmail.com')
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

        Mail::to('bunjosteven5@gmail.com')
            ->send(new BookingCreated($booking));

        return redirect()
            ->back()
            ->with('success', 'Your booking request has been sent successfully!');
    }
}
