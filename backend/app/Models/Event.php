<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'type', 'description', 'date', 'time', 'location',
        'capacity', 'registered', 'organizer', 'organizer_id', 'image_url',
    ];

    protected function casts(): array
    {
        return ['date' => 'date', 'capacity' => 'integer', 'registered' => 'integer'];
    }
}
