<?php

namespace App\Mail;

use App\Models\Contact;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactReplyMail extends Mailable
{
    use SerializesModels;

    public $contact;
    public $replyMessage;

    public function __construct(Contact $contact, string $replyMessage)
    {
        $this->contact = $contact;
        $this->replyMessage = $replyMessage;
    }

    public function build()
    {
        return $this
            ->subject('Re: Your enquiry to Nile Photography')
            ->view('emails.contact-reply');
    }
}
