```blade
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Payment Receipt</title>

    <style>
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
        }

        body{
            font-family: DejaVu Sans, sans-serif;
            background:#f8fafc;
            color:#1f2937;
            font-size:14px;
            line-height:1.6;
        }

        .wrapper{
            padding:30px;
        }

        .receipt-card{
            background:#ffffff;
            border-radius:12px;
            overflow:hidden;
            border:1px solid #e5e7eb;
        }

        /* HEADER */

        .header{
            background:#111827;
            color:#ffffff;
            padding:30px;
        }

        .header-table{
            width:100%;
        }

        .logo{
            width:70px;
        }

        .brand-name{
            font-size:34px;
            font-weight:bold;
            color:#ffffff;
        }

        .brand-subtitle{
            font-size:14px;
            color:#d1d5db;
            letter-spacing:2px;
            text-transform:uppercase;
        }

        .receipt-title{
            text-align:right;
        }

        .receipt-title h1{
            font-size:28px;
            margin-bottom:8px;
        }

        .receipt-number{
            color:#fbbf24;
            font-weight:bold;
        }

        /* STATUS */

        .status-bar{
            background:#ecfdf5;
            border-bottom:1px solid #d1fae5;
            padding:15px 30px;
        }

        .status-badge{
            display:inline-block;
            background:#10b981;
            color:white;
            padding:8px 18px;
            border-radius:30px;
            font-size:12px;
            font-weight:bold;
        }

        /* CONTENT */

        .content{
            padding:30px;
        }

        .section-title{
            font-size:12px;
            text-transform:uppercase;
            letter-spacing:1px;
            color:#9ca3af;
            margin-bottom:12px;
            font-weight:bold;
        }

        .customer-box{
            background:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:10px;
            padding:18px;
            margin-bottom:30px;
        }

        .grid{
            width:100%;
        }

        .grid td{
            vertical-align:top;
            width:50%;
        }

        .meta{
            margin-bottom:8px;
        }

        .meta strong{
            display:block;
            color:#6b7280;
            font-size:11px;
            text-transform:uppercase;
        }

        /* SERVICE TABLE */

        table.items{
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
        }

        table.items th{
            background:#111827;
            color:white;
            padding:14px;
            text-align:left;
            font-size:12px;
        }

        table.items td{
            padding:14px;
            border-bottom:1px solid #e5e7eb;
        }

        table.items tbody tr:nth-child(even){
            background:#fafafa;
        }

        /* TOTAL BOX */

        .summary{
            margin-top:30px;
            width:320px;
            float:right;
        }

        .summary-card{
            border:1px solid #e5e7eb;
            border-radius:10px;
            overflow:hidden;
        }

        .summary-header{
            background:#f59e0b;
            color:white;
            padding:12px 18px;
            font-weight:bold;
        }

        .summary-body{
            padding:18px;
        }

        .summary-row{
            margin-bottom:10px;
        }

        .grand-total{
            margin-top:15px;
            padding-top:15px;
            border-top:2px solid #e5e7eb;
            font-size:22px;
            font-weight:bold;
            color:#f59e0b;
        }

        .clear{
            clear:both;
        }

        /* THANK YOU */

        .thank-you{
            margin-top:50px;
            background:#fff7ed;
            border:1px solid #fed7aa;
            border-radius:10px;
            padding:20px;
            text-align:center;
        }

        .thank-you h3{
            color:#c2410c;
            margin-bottom:10px;
        }

        /* FOOTER */

        .footer{
            margin-top:40px;
            padding-top:20px;
            border-top:1px solid #e5e7eb;
            text-align:center;
            color:#6b7280;
            font-size:12px;
        }
    </style>
</head>
<body>

<div class="wrapper">

    <div class="receipt-card">

        <div class="header">

            <table class="header-table">
                <tr>

                    <td width="90">
                        <img
                            src="{{ public_path('logo-white.png') }}"
                            class="logo"
                        >
                    </td>

                    <td>
                        <div class="brand-name">Nile</div>
                        <div class="brand-subtitle">
                            Photography
                        </div>
                    </td>

                    <td class="receipt-title">
                        <h1>PAYMENT RECEIPT</h1>

                        <div class="receipt-number">
                            Receipt #RCP-{{ str_pad($booking->id,6,'0',STR_PAD_LEFT) }}
                        </div>

                        <div>
                            {{ now()->format('d M Y') }}
                        </div>
                    </td>

                </tr>
            </table>

        </div>

        <div class="status-bar">
            <span class="status-badge">
                PAYMENT RECEIVED
            </span>
        </div>

        <div class="content">

            <div class="section-title">
                Customer Information
            </div>

            <div class="customer-box">

                <table class="grid">
                    <tr>

                        <td>
                            <div class="meta">
                                <strong>Client Name</strong>
                                {{ $booking->name }}
                            </div>

                            <div class="meta">
                                <strong>Email Address</strong>
                                {{ $booking->email }}
                            </div>
                        </td>

                        <td>
                            <div class="meta">
                                <strong>Phone Number</strong>
                                {{ $booking->phone }}
                            </div>

                            <div class="meta">
                                <strong>Booking Date</strong>
                                {{ $booking->date }}
                            </div>
                        </td>

                    </tr>
                </table>

            </div>

            <div class="section-title">
                Service Details
            </div>

            <table class="items">

                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Amount Paid</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{{ $booking->service }}</td>
                        <td>{{ $booking->payment_method ?? 'Bank Transfer' }}</td>
                        <td>Paid</td>
                        <td>EUR {{ number_format($booking->amount,2) }}</td>
                    </tr>
                </tbody>

            </table>

            <div class="summary">

                <div class="summary-card">

                    <div class="summary-header">
                        Payment Summary
                    </div>

                    <div class="summary-body">

                        <div class="summary-row">
                            Service Amount:
                            <strong>
                                EUR {{ number_format($booking->amount,2) }}
                            </strong>
                        </div>

                        <div class="grand-total">
                            EUR {{ number_format($booking->amount,2) }}
                        </div>

                    </div>

                </div>

            </div>

            <div class="clear"></div>

            <div class="thank-you">
                <h3>Thank You For Your Payment</h3>

                <p>
                    Your booking has been successfully confirmed.
                    We appreciate your trust in Nile Photography and
                    look forward to capturing your special moments.
                </p>
            </div>

            <div class="footer">

                <strong>Nile Photography</strong><br>

                Professional Photography Services<br>

                © {{ date('Y') }} Nile Photography.
                All Rights Reserved.

            </div>

        </div>

    </div>

</div>

</body>
</html>
```
