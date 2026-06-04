<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'author', 'category', 'description', 'file_url',
        'cover_url', 'pages', 'size', 'downloads', 'views', 'rating',
        'uploaded_by',
    ];

    protected function casts(): array
    {
        return ['downloads' => 'integer', 'views' => 'integer', 'pages' => 'integer', 'rating' => 'float'];
    }
}
