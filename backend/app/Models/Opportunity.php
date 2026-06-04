<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Opportunity extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'type', 'provider', 'deadline', 'location', 'stipend',
        'description', 'requirements', 'link', 'created_by',
    ];

    protected function casts(): array
    {
        return ['deadline' => 'date'];
    }
}
