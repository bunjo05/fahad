<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>Payment Received Successfully</h2>

<p>Hello {{ $booking->name }},</p>

<p>
    We have successfully received your payment for your booking with
    <strong>Nile Photography</strong>.
</p>

<p>
    Service: {{ $booking->service }}<br>
    Amount Paid: EUR {{ number_format($booking->amount,2) }}
</p>

<p>
    Your receipt is attached to this email.
</p>

<p>
    Thank you for choosing Nile Photography.
</p>
</body>
</html>
