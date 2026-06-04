<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PastQuestion extends Model
{
    use HasFactory;

    protected $table = 'past_questions';

    protected $fillable = [
        'course', 'department', 'year', 'level', 'semester',
        'file_url', 'downloads', 'uploaded_by',
    ];

    protected function casts(): array
    {
        return ['downloads' => 'integer'];
    }
}
