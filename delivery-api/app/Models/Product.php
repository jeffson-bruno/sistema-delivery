<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_type_id',
        'name',
        'description',
        'price',
        'is_promotional',
        'promotion_price',
        'promotion_units_available',
        'preparation_time',
        'image_path',
        'is_active',
    ];

    public function type()
    {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }
}

