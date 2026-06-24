<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation;
use App\Mail\ContactReplyMail;
use App\Mail\PaymentReceiptMail;
use App\Models\Booking;
use App\Models\Contact;
use App\Models\ContactReply;
use App\Models\Portfolio;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    public function dashboard()
    {
        return inertia('Dashboard/Dashboard', [
            'stats' => [

                // Totals
                'totalBookings' => Booking::count(),
                'totalContacts' => Contact::count(),
                'totalPortfolio' => Portfolio::count(),

                // Booking Status
                'pendingBookings' => Booking::where('status', 'pending')->count(),
                'confirmedBookings' => Booking::where('status', 'confirmed')->count(),
                'cancelledBookings' => Booking::where('status', 'cancelled')->count(),

                // Payment Status
                'pendingPayments' => Booking::where('payment_status', 'pending')->count(),
                'paidPayments' => Booking::where('payment_status', 'paid')->count(),
                'failedPayments' => Booking::where('payment_status', 'failed')->count(),
                'refundedPayments' => Booking::where('payment_status', 'refunded')->count(),

                // Contacts
                'unreadContacts' => Contact::where('status', 'unread')->count(),
                'readContacts' => Contact::where('status', 'read')->count(),

                // Revenue
                'totalRevenue' => Booking::where('payment_status', 'paid')
                    ->sum('amount'),
            ],

            'recentBookings' => Booking::latest()
                ->take(5)
                ->get(),

            'recentContacts' => Contact::latest()
                ->take(5)
                ->get(),
        ]);
    }

    public function bookings()
    {
        $bookings = Booking::orderBy('created_at', 'desc')->get();
        return inertia('Dashboard/Bookings', [
            'bookings' => $bookings,
        ]);
    }

    public function updateBooking(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'amount' => 'nullable|numeric|min:0',
            'payment_status' => 'nullable|in:pending,paid,failed',
        ]);

        $oldPaymentStatus = $booking->payment_status;
        $oldAmount = $booking->amount;

        $data = [];

        if ($request->filled('amount')) {
            $data['amount'] = $request->amount;
            $data['status'] = 'confirmed';
        }

        if (
            ($booking->status === 'confirmed' || isset($data['status']))
            && $request->filled('payment_status')
        ) {
            $data['payment_status'] = $request->payment_status;
        }

        $booking->update($data);

        $booking->refresh();

        /*
    |--------------------------------------------------------------------------
    | Invoice Email
    |--------------------------------------------------------------------------
    */

        if (
            is_null($oldAmount) &&
            !is_null($booking->amount)
        ) {
            $invoicePdf = Pdf::loadView(
                'pdf.invoice',
                ['booking' => $booking]
            );

            $invoicePath = storage_path(
                'app/public/invoice-' . $booking->id . '.pdf'
            );

            $invoicePdf->save($invoicePath);

            Mail::to($booking->email)
                ->send(new BookingConfirmation(
                    $booking,
                    $invoicePath
                ));
        }

        /*
    |--------------------------------------------------------------------------
    | Receipt Email
    |--------------------------------------------------------------------------
    */

        if (
            $oldPaymentStatus !== 'paid'
            && $booking->payment_status === 'paid'
        ) {

            $receiptPdf = Pdf::loadView(
                'pdf.receipt',
                ['booking' => $booking]
            );

            $receiptPath = storage_path(
                'app/public/receipt-' . $booking->id . '.pdf'
            );

            $receiptPdf->save($receiptPath);

            Mail::to($booking->email)
                ->send(
                    new PaymentReceiptMail(
                        $booking,
                        $receiptPath
                    )
                );
        }

        return back()->with(
            'success',
            'Booking updated successfully.'
        );
    }
    public function contacts()
    {
        $contacts = Contact::with([
            'replies.user'
        ])
            ->latest()
            ->get();

        return inertia('Dashboard/Contacts', [
            'contacts' => $contacts,
        ]);
    }

    public function markContactRead(Contact $contact)
    {
        $contact->update([
            'status' => 'read'
        ]);

        return back();
    }

    public function replyToContact(
        Request $request,
        Contact $contact
    ) {
        $validated = $request->validate([
            'reply_message' => [
                'required',
                'string',
                'min:10',
            ],
        ]);

        ContactReply::create([
            'contact_id' => $contact->id,
            'user_id' => Auth::id(),
            'message' => $validated['reply_message'],
        ]);

        Mail::to($contact->email)
            ->send(
                new ContactReplyMail(
                    $contact,
                    $validated['reply_message']
                )
            );

        $contact->update([
            'status' => 'read',
        ]);

        return back()->with(
            'success',
            'Reply sent successfully.'
        );
    }

    public function portfolio()
    {
        $portfolio = Portfolio::with('images')->latest()->get();

        return inertia('Dashboard/Portfolio', [
            'portfolio' => $portfolio,
        ]);
    }

    public function storePortfolio(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'featured_image' => 'required|image',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'images.*' => 'image',
        ]);

        // Featured image
        $featuredPath = $request->file('featured_image')
            ->store('portfolio/featured', 'public');

        // Create portfolio
        $portfolio = Portfolio::create([
            'name' => $validated['name'],
            'featured_image' => $featuredPath,
            'description' => $validated['description'],
            'category' => $validated['category'],
        ]);

        // Gallery images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('portfolio/gallery', 'public');

                $portfolio->images()->create([
                    'image_path' => $path,
                ]);
            }
        }

        return back()->with('success', 'Portfolio created successfully.');
    }

    public function updatePortfolio(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'featured_image' => 'nullable|image',
            'images.*' => 'nullable|image',
        ]);

        $data = [
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ];

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')
                ->store('portfolio/featured', 'public');
        }

        $portfolio->update($data);

        return back()->with('success', 'Portfolio updated');
    }

    public function destroyPortfolio(Portfolio $portfolio)
    {
        $portfolio->delete();

        return back()->with('success', 'Portfolio deleted');
    }
}
