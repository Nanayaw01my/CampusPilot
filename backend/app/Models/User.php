<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'department', 'level', 'role',
        'avatar', 'bookmarks', 'reading_progress', 'saved_opportunities',
        'saved_questions', 'last_active',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'bookmarks' => 'array',
            'reading_progress' => 'array',
            'saved_opportunities' => 'array',
            'saved_questions' => 'array',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}
