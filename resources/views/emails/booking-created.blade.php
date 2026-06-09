<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Booking</title>
</head>

<body style="margin:0; padding:0; background:#f4f6f9; font-family: Arial, Helvetica, sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9; padding:40px 0;">
        <tr>
            <td align="center">

                <!-- Container -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.05);">

                    <!-- Header -->
                    <tr>
                        <td style="background:#2d3748; padding:20px 30px; color:#ffffff;">
                            <h2 style="margin:0; font-size:20px;">New Booking Request</h2>
                            <p style="margin:5px 0 0; font-size:13px; color:#cbd5e0;">
                                A new booking has been submitted from your website
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:30px;">

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#2d3748;">

                                <tr>
                                    <td style="padding:10px 0; width:120px; font-weight:bold; color:#4a5568;">Name</td>
                                    <td style="padding:10px 0;">{{ $booking->name }}</td>
                                </tr>

                                <tr>
                                    <td style="padding:10px 0; font-weight:bold; color:#4a5568;">Email</td>
                                    <td style="padding:10px 0;">{{ $booking->email }}</td>
                                </tr>

                                <tr>
                                    <td style="padding:10px 0; font-weight:bold; color:#4a5568;">Phone</td>
                                    <td style="padding:10px 0;">{{ $booking->phone }}</td>
                                </tr>

                                <tr>
                                    <td style="padding:10px 0; font-weight:bold; color:#4a5568;">Service</td>
                                    <td style="padding:10px 0;">{{ $booking->service }}</td>
                                </tr>

                                <tr>
                                    <td style="padding:10px 0; font-weight:bold; color:#4a5568;">Date</td>
                                    <td style="padding:10px 0;">{{ $booking->date }}</td>
                                </tr>

                                <tr>
                                    <td style="padding:10px 0; font-weight:bold; color:#4a5568; vertical-align:top;">Message</td>
                                    <td style="padding:10px 0; line-height:1.6;">
                                        {{ $booking->message }}
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f7fafc; padding:15px 30px; font-size:12px; color:#718096; text-align:center;">
                            This is an automated notification from your booking system.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
