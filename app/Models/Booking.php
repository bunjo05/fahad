<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'service',
        'date',
        'message',
        'status',
        'payment_status',
        'payment_method',
        'amount',
    ];
}
