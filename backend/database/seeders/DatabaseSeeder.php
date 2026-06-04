<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Book;
use App\Models\Event;
use App\Models\Opportunity;
use App\Models\PastQuestion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@campuspilot.app',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'department' => 'Administration',
            'level' => 'N/A',
        ]);

        User::create([
            'name' => 'Alex Johnson',
            'email' => 'student@university.edu',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'department' => 'Computer Science',
            'level' => '300',
        ]);

        foreach ([
            ['title' => 'Introduction to Algorithms', 'author' => 'Thomas H. Cormen', 'category' => 'Computer Science', 'pages' => 1312, 'rating' => 4.8, 'downloads' => 234],
            ['title' => 'Calculus: Early Transcendentals', 'author' => 'James Stewart', 'category' => 'Mathematics', 'pages' => 1368, 'rating' => 4.6, 'downloads' => 189],
            ['title' => 'Principles of Economics', 'author' => 'N. Gregory Mankiw', 'category' => 'Economics', 'pages' => 892, 'rating' => 4.5, 'downloads' => 312],
        ] as $book) {
            Book::create($book);
        }

        Event::create(['title' => 'Tech Innovation Summit 2024', 'type' => 'Conference', 'date' => now()->addDays(10), 'time' => '09:00 AM', 'location' => 'Main Auditorium', 'capacity' => 500, 'registered' => 342, 'description' => 'Annual technology conference.']);

        Opportunity::create(['title' => 'Google Summer of Code 2024', 'type' => 'Internship', 'provider' => 'Google', 'deadline' => now()->addDays(25), 'location' => 'Remote', 'stipend' => '$3,000/month', 'description' => 'Work on open source projects with Google mentors.']);

        PastQuestion::create(['course' => 'CS 301 - Data Structures', 'department' => 'Computer Science', 'year' => '2023', 'level' => '300', 'semester' => 'First', 'downloads' => 456]);
    }
}
