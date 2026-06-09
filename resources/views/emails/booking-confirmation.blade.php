<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>

<h2>Booking Confirmation</h2>

<p>Hello {{ $booking->name }},</p>

<p>
    Thank you for choosing us.
    Your booking has been confirmed.
</p>

<h3>Booking Details</h3>

<ul>
    <li><strong>Booking ID:</strong> #{{ $booking->id }}</li>
    <li><strong>Service:</strong> {{ $booking->service }}</li>
    <li><strong>Date:</strong> {{ $booking->date }}</li>
    <li><strong>Amount:</strong> ${{ number_format($booking->amount, 2) }}</li>
</ul>

<h3>Bank Details</h3>

<ul>
    <li>Bank: Equity Bank</li>
    <li>Account Name: Your Business Name</li>
    <li>Account Number: 123456789</li>
    <li>Swift Code: EQBLUGKA</li>
</ul>

<p>
    The invoice is attached to this email.
</p>

<p>
    Regards,<br>
    Your Business
</p>

</body>
</html>
