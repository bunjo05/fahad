<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Mail\Mailable;

class PaymentReceiptMail extends Mailable
{
    public $booking;
    public $pdfPath;

    public function __construct(Booking $booking, string $pdfPath)
    {
        $this->booking = $booking;
        $this->pdfPath = $pdfPath;
    }

    public function build()
    {
        return $this
            ->subject('Payment Receipt - Nile Photography')
            ->view('emails.payment-receipt')
            ->attach($this->pdfPath, [
                'as' => 'Payment-Receipt.pdf',
                'mime' => 'application/pdf',
            ]);
    }
}
