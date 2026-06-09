<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            color: #374151;
            font-size: 13px;
            line-height: 1.6;
            padding: 40px;
            background: #ffffff;
        }

        .top-border {
            height: 8px;
            background: #f59e0b;
            margin: -40px -40px 30px -40px;
        }

        .header {
            width: 100%;
            margin-bottom: 40px;
        }

        .logo-table {
            width: 100%;
        }

        .logo-cell {
            width: 70%;
        }

        .invoice-cell {
            text-align: right;
            vertical-align: top;
        }

        .logo {
            width: 70px;
            height: auto;
        }

        .brand-name {
            font-size: 28px;
            font-weight: bold;
            color: #111827;
        }

        .brand-subtitle {
            color: #6b7280;
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .invoice-badge {
            background: #f59e0b;
            color: white;
            padding: 8px 18px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 20px;
            display: inline-block;
        }

        .invoice-number {
            margin-top: 10px;
            color: #6b7280;
        }

        .card {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .section-title {
            color: #111827;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .customer-name {
            font-size: 18px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 8px;
        }

        table.service-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.service-table thead {
            background: #f3f4f6;
        }

        table.service-table th {
            text-align: left;
            padding: 14px;
            color: #374151;
            font-size: 12px;
        }

        table.service-table td {
            padding: 14px;
            border-bottom: 1px solid #e5e7eb;
        }

        .total-box {
            margin-top: 30px;
            background: #fff7ed;
            border: 1px solid #fed7aa;
            padding: 20px;
            border-radius: 12px;
            text-align: right;
        }

        .total-label {
            font-size: 14px;
            color: #6b7280;
        }

        .total-amount {
            font-size: 30px;
            font-weight: bold;
            color: #f59e0b;
        }

        .bank-card {
            background: #fafafa;
            border: 1px solid #e5e7eb;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
        }

        .bank-card p {
            margin-bottom: 8px;
        }

        .footer {
            margin-top: 50px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
        }

        .thank-you {
            margin-top: 25px;
            text-align: center;
            font-size: 18px;
            color: #111827;
            font-weight: bold;
        }

        .highlight {
            color: #f59e0b;
            font-weight: bold;
        }
    </style>
</head>

<body>

    <div class="top-border"></div>

    <!-- HEADER -->
    <table class="logo-table">
        <tr>
            <td class="logo-cell">

                <table>
                    <tr>
                        <td style="width:80px;">
                            <img
                                src="{{ public_path('/logo.png') }}"
                                class="logo"
                                alt="Nile Photography">
                        </td>

                        <td>
                            <div class="brand-name">
                                Nile
                            </div>

                            <div class="brand-subtitle">
                                PHOTOGRAPHY
                            </div>
                        </td>
                    </tr>
                </table>

            </td>

            <td class="invoice-cell">
                <div class="invoice-badge">
                    INVOICE
                </div>

                <div class="invoice-number">
                    Invoice #{{ str_pad($booking->id, 5, '0', STR_PAD_LEFT) }}
                </div>

                <div class="invoice-number">
                    {{ now()->format('d M Y') }}
                </div>
            </td>
        </tr>
    </table>

    <!-- CUSTOMER -->
    <div class="card">
        <div class="section-title">
            Client Information
        </div>

        <div class="customer-name">
            {{ $booking->name }}
        </div>

        <p>Email: {{ $booking->email }}</p>
        <p>Phone: {{ $booking->phone }}</p>
        <p>Booking Date: {{ \Carbon\Carbon::parse($booking->date)->format('d M Y') }}</p>
    </div>

    <!-- SERVICE -->
    <div class="card">

        <div class="section-title">
            Booking Summary
        </div>

        <table class="service-table">
            <thead>
                <tr>
                    <th>Service</th>
                    <th>Event Date</th>
                    <th>Amount</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{{ $booking->service }}</td>
                    <td>{{ \Carbon\Carbon::parse($booking->date)->format('d M Y') }}</td>
                    <td>EUR {{ number_format($booking->amount, 0) }}</td>
                </tr>
            </tbody>
        </table>

        <div class="total-box">
            <div class="total-label">
                Total Amount Due
            </div>

            <div class="total-amount">
                EUR {{ number_format($booking->amount, 0) }}
            </div>
        </div>

    </div>

    <!-- BANK DETAILS -->
    <div class="bank-card">

        <div class="section-title">
            Payment Information
        </div>

        <p><strong>Bank:</strong> Revolut</p>
        <p><strong>Account Name:</strong> FAHAD LUTAAYA</p>
        <p><strong>IBAN:</strong> DE64100101789387070429</p>

        <br>

        <p>
            Please include
            <span class="highlight">
                Invoice #{{ str_pad($booking->id, 5, '0', STR_PAD_LEFT) }}
            </span>
            as your payment reference.
        </p>

    </div>

    <!-- MESSAGE -->
    @if($booking->message)
        <div class="card">
            <div class="section-title">
                Booking Notes
            </div>

            <p>{{ $booking->message }}</p>
        </div>
    @endif

    <div class="thank-you">
        Thank You For Choosing Nile Photography
    </div>

    <div class="footer">
        Capturing Moments • Creating Memories • Delivering Excellence
        <br><br>
        Nile Photography © {{ date('Y') }}
    </div>

</body>

</html>
