<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color:#333;">

    <h2>Nile Photography</h2>

    <p>Hello {{ $contact->name }},</p>

    <p>Thank you for contacting us.</p>

    <div
        style="
            background:#f9fafb;
            border-left:4px solid #f59e0b;
            padding:20px;
            margin:20px 0;
        "
    >
        {!! nl2br(e($replyMessage)) !!}
    </div>

    <hr>

    <p>
        <strong>Your Original Message</strong>
    </p>

    <p>
        {{ $contact->message }}
    </p>

    <br>

    <p>
        Regards,<br>
        Nile Photography
    </p>

</body>
</html>
