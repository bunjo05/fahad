<?php

namespace App\Models;

use App\Models\PortfolioImage;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'name',
        'description',
        'featured_image',
        'category',
    ];

    public function images()
    {
        return $this->hasMany(PortfolioImage::class);
    }
}
