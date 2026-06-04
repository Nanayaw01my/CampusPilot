<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'type', 'title', 'message', 'icon', 'read', 'data',
    ];

    protected function casts(): array
    {
        return ['read' => 'boolean', 'data' => 'array'];
    }
}
