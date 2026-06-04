<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Audio extends Model
{
    use HasFactory;

    protected $table = 'audio_books';

    protected $fillable = [
        'title', 'author', 'category', 'description', 'audio_url',
        'cover_url', 'duration', 'plays', 'likes', 'uploaded_by',
    ];

    protected function casts(): array
    {
        return ['plays' => 'integer', 'likes' => 'integer'];
    }
}
