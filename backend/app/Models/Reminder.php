<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reminder extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'type', 'due_date', 'priority',
        'completed', 'notify_email', 'notify_push',
    ];

    protected function casts(): array
    {
        return ['due_date' => 'datetime', 'completed' => 'boolean', 'notify_email' => 'boolean', 'notify_push' => 'boolean'];
    }
}
