<?php

namespace Database\Seeders;

use App\Models\Audio;
use App\Models\Book;
use App\Models\Event;
use App\Models\Notification;
use App\Models\Opportunity;
use App\Models\PastQuestion;
use App\Models\Reminder;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(['email' => 'admin@campuspilot.app'], [
            'name' => 'Admin User',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'department' => 'Administration',
            'level' => 'N/A',
            'bookmarks' => [],
            'reading_progress' => [],
            'saved_opportunities' => [],
            'saved_questions' => [],
        ]);

        $student = User::firstOrCreate(['email' => 'student@university.edu'], [
            'name' => 'Alex Johnson',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'department' => 'Computer Science',
            'level' => '300',
            'bookmarks' => [],
            'reading_progress' => [],
            'saved_opportunities' => [],
            'saved_questions' => [],
        ]);

        $books = [
            ['title' => 'Introduction to Algorithms', 'author' => 'Thomas H. Cormen', 'category' => 'Computer Science', 'description' => 'Comprehensive introduction to modern algorithms and data structures.', 'pages' => 1312, 'rating' => 4.8, 'downloads' => 2340, 'views' => 8900],
            ['title' => 'Calculus: Early Transcendentals', 'author' => 'James Stewart', 'category' => 'Mathematics', 'description' => 'A rigorous and comprehensive calculus textbook for engineering students.', 'pages' => 1368, 'rating' => 4.6, 'downloads' => 1890, 'views' => 7200],
            ['title' => 'Principles of Economics', 'author' => 'N. Gregory Mankiw', 'category' => 'Economics', 'description' => 'The leading economics textbook used by top universities worldwide.', 'pages' => 892, 'rating' => 4.5, 'downloads' => 3120, 'views' => 11400],
            ['title' => 'Organic Chemistry', 'author' => 'Paula Yurkanis Bruice', 'category' => 'Chemistry', 'description' => 'Modern approach to organic chemistry with real-world applications.', 'pages' => 1296, 'rating' => 4.3, 'downloads' => 1560, 'views' => 5800],
            ['title' => 'Engineering Mechanics: Dynamics', 'author' => 'J.L. Meriam', 'category' => 'Engineering', 'description' => 'Fundamental principles of dynamics applied to engineering problems.', 'pages' => 736, 'rating' => 4.4, 'downloads' => 1234, 'views' => 4600],
            ['title' => 'Gray\'s Anatomy', 'author' => 'Henry Gray', 'category' => 'Medicine', 'description' => 'The definitive human anatomy reference used by medical students globally.', 'pages' => 1576, 'rating' => 4.9, 'downloads' => 4560, 'views' => 18900],
            ['title' => 'Data Structures & Algorithm Analysis', 'author' => 'Mark Allen Weiss', 'category' => 'Computer Science', 'description' => 'Thorough analysis of data structures and algorithms with C++ implementations.', 'pages' => 640, 'rating' => 4.6, 'downloads' => 1890, 'views' => 7100],
            ['title' => 'Linear Algebra and Its Applications', 'author' => 'David C. Lay', 'category' => 'Mathematics', 'description' => 'Modern introduction to linear algebra with extensive applications.', 'pages' => 560, 'rating' => 4.7, 'downloads' => 2100, 'views' => 8200],
        ];

        foreach ($books as $book) {
            Book::firstOrCreate(['title' => $book['title']], array_merge($book, ['uploaded_by' => $admin->id]));
        }

        $audioBooks = [
            ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'category' => 'Computer Science', 'description' => 'A handbook of agile software craftsmanship.', 'duration' => '8h 45m', 'plays' => 4230, 'likes' => 890],
            ['title' => 'The Wealth of Nations', 'author' => 'Adam Smith', 'category' => 'Economics', 'description' => 'The foundational work of classical economics.', 'duration' => '12h 20m', 'plays' => 2890, 'likes' => 560],
            ['title' => 'A Brief History of Time', 'author' => 'Stephen Hawking', 'category' => 'Physics', 'description' => 'An exploration of cosmology and physics.', 'duration' => '5h 55m', 'plays' => 6780, 'likes' => 1340],
            ['title' => 'Thinking, Fast and Slow', 'author' => 'Daniel Kahneman', 'category' => 'Psychology', 'description' => 'How the two systems that shape thinking work.', 'duration' => '10h 30m', 'plays' => 5120, 'likes' => 1020],
            ['title' => 'The Art of War', 'author' => 'Sun Tzu', 'category' => 'History', 'description' => 'Ancient Chinese military treatise applicable to modern life.', 'duration' => '1h 20m', 'plays' => 3450, 'likes' => 780],
            ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'category' => 'History', 'description' => 'A brief history of humankind from the Stone Age to the present.', 'duration' => '11h 15m', 'plays' => 7890, 'likes' => 1890],
        ];

        foreach ($audioBooks as $audio) {
            Audio::firstOrCreate(['title' => $audio['title']], array_merge($audio, ['uploaded_by' => $admin->id]));
        }

        $events = [
            ['title' => 'Tech Innovation Summit 2025', 'type' => 'Conference', 'description' => 'Annual technology conference showcasing cutting-edge innovations and research.', 'date' => now()->addDays(10), 'time' => '09:00 AM', 'location' => 'Main Auditorium, Block A', 'capacity' => 500, 'registered' => 342],
            ['title' => 'Python Workshop: Machine Learning', 'type' => 'Workshop', 'description' => 'Hands-on workshop covering supervised learning, neural networks, and model deployment.', 'date' => now()->addDays(5), 'time' => '02:00 PM', 'location' => 'CS Lab 3, Block B', 'capacity' => 60, 'registered' => 54],
            ['title' => 'Inter-Faculty Football Tournament', 'type' => 'Sports', 'description' => 'Annual football competition between faculty teams.', 'date' => now()->addDays(14), 'time' => '10:00 AM', 'location' => 'Sports Complex', 'capacity' => 1000, 'registered' => 234],
            ['title' => 'Career Fair 2025', 'type' => 'Career', 'description' => 'Connect with 50+ top employers and explore full-time and internship opportunities.', 'date' => now()->addDays(21), 'time' => '09:00 AM', 'location' => 'Sports Hall', 'capacity' => 2000, 'registered' => 1456],
            ['title' => 'Entrepreneurship & Startup Pitch', 'type' => 'Academic', 'description' => 'Present your startup idea to a panel of investors and industry experts.', 'date' => now()->addDays(7), 'time' => '01:00 PM', 'location' => 'Business School Auditorium', 'capacity' => 300, 'registered' => 187],
            ['title' => 'Cultural Night: Voices of Africa', 'type' => 'Cultural', 'description' => 'Annual cultural showcase featuring music, dance, and cuisine from across Africa.', 'date' => now()->addDays(18), 'time' => '06:00 PM', 'location' => 'University Amphitheatre', 'capacity' => 800, 'registered' => 612],
        ];

        foreach ($events as $event) {
            Event::firstOrCreate(['title' => $event['title']], array_merge($event, ['organizer_id' => $admin->id]));
        }

        $opportunities = [
            ['title' => 'Google Summer of Code 2025', 'type' => 'Internship', 'provider' => 'Google', 'deadline' => now()->addDays(25), 'location' => 'Remote', 'stipend' => '$3,500/month', 'description' => 'Work on open source projects with mentorship from Google engineers.', 'requirements' => 'Open to university students worldwide.'],
            ['title' => 'MTN Foundation Scholarship', 'type' => 'Scholarship', 'provider' => 'MTN Foundation', 'deadline' => now()->addDays(30), 'location' => 'Ghana', 'stipend' => 'GHS 5,000/year', 'description' => 'Merit-based scholarship for outstanding STEM students in Ghana.', 'requirements' => 'GPA 3.5+ required.'],
            ['title' => 'WAEC Coding Challenge 2025', 'type' => 'Competition', 'provider' => 'WAEC', 'deadline' => now()->addDays(15), 'location' => 'Online', 'stipend' => '$5,000 prize', 'description' => 'Solve real-world problems through code. Top 3 win cash prizes.', 'requirements' => 'Open to all students.'],
            ['title' => 'Carnegie Mellon Africa Fellowship', 'type' => 'Grant', 'provider' => 'Carnegie Mellon', 'deadline' => now()->addDays(45), 'location' => 'Kigali, Rwanda', 'stipend' => 'Full funding', 'description' => 'Research fellowship for outstanding African students in technology.', 'requirements' => 'Final year or postgraduate students.'],
            ['title' => 'Erasmus+ Exchange Program', 'type' => 'Exchange', 'provider' => 'European Union', 'deadline' => now()->addDays(60), 'location' => 'Europe', 'stipend' => '€800/month', 'description' => 'Study abroad at a top European university for one semester.', 'requirements' => 'Min. 2.5 GPA, language proficiency required.'],
            ['title' => 'Microsoft Africa Research Institute', 'type' => 'Internship', 'provider' => 'Microsoft', 'deadline' => now()->addDays(20), 'location' => 'Nairobi, Kenya', 'stipend' => '$2,000/month', 'description' => 'Cutting-edge AI research internship with Microsoft\'s Africa team.', 'requirements' => 'CS or related field, Python/ML experience.'],
        ];

        foreach ($opportunities as $opp) {
            Opportunity::firstOrCreate(['title' => $opp['title']], array_merge($opp, ['created_by' => $admin->id]));
        }

        $pastQuestions = [
            ['course' => 'CS 301 - Data Structures & Algorithms', 'department' => 'Computer Science', 'year' => '2024', 'level' => '300', 'semester' => 'First', 'downloads' => 1456],
            ['course' => 'MATH 201 - Calculus II', 'department' => 'Mathematics', 'year' => '2024', 'level' => '200', 'semester' => 'Second', 'downloads' => 2340],
            ['course' => 'ECON 101 - Principles of Microeconomics', 'department' => 'Economics', 'year' => '2023', 'level' => '100', 'semester' => 'First', 'downloads' => 3120],
            ['course' => 'CS 201 - Object-Oriented Programming', 'department' => 'Computer Science', 'year' => '2024', 'level' => '200', 'semester' => 'First', 'downloads' => 1890],
            ['course' => 'CHEM 101 - General Chemistry I', 'department' => 'Chemistry', 'year' => '2023', 'level' => '100', 'semester' => 'Second', 'downloads' => 2100],
            ['course' => 'ENG 401 - Structural Analysis', 'department' => 'Engineering', 'year' => '2024', 'level' => '400', 'semester' => 'First', 'downloads' => 890],
            ['course' => 'MED 301 - Human Physiology', 'department' => 'Medicine', 'year' => '2023', 'level' => '300', 'semester' => 'Second', 'downloads' => 1670],
            ['course' => 'CS 401 - Software Engineering', 'department' => 'Computer Science', 'year' => '2024', 'level' => '400', 'semester' => 'Second', 'downloads' => 1234],
        ];

        foreach ($pastQuestions as $pq) {
            PastQuestion::firstOrCreate(['course' => $pq['course'], 'year' => $pq['year']], array_merge($pq, ['uploaded_by' => $admin->id]));
        }

        Reminder::firstOrCreate(
            ['user_id' => $student->id, 'title' => 'Data Structures Assignment Due'],
            ['type' => 'assignment', 'due_date' => now()->addDays(3), 'priority' => 'urgent', 'completed' => false, 'notify_email' => true, 'notify_push' => true]
        );
        Reminder::firstOrCreate(
            ['user_id' => $student->id, 'title' => 'Calculus Mid-Semester Exam'],
            ['type' => 'exam', 'due_date' => now()->addDays(7), 'priority' => 'high', 'completed' => false, 'notify_email' => true, 'notify_push' => true]
        );
        Reminder::firstOrCreate(
            ['user_id' => $student->id, 'title' => 'Register for Tech Innovation Summit'],
            ['type' => 'event', 'due_date' => now()->addDays(9), 'priority' => 'medium', 'completed' => false, 'notify_email' => false, 'notify_push' => true]
        );
        Reminder::firstOrCreate(
            ['user_id' => $student->id, 'title' => 'MTN Scholarship Application Deadline'],
            ['type' => 'deadline', 'due_date' => now()->addDays(28), 'priority' => 'high', 'completed' => false, 'notify_email' => true, 'notify_push' => true]
        );

        Notification::firstOrCreate(
            ['user_id' => $student->id, 'title' => 'New book available: Clean Code'],
            ['type' => 'book', 'message' => '"Clean Code" by Robert C. Martin has been added to the library.', 'icon' => 'book', 'read' => false]
        );
        Notification::firstOrCreate(
            ['user_id' => $student->id, 'title' => 'Event reminder: Tech Innovation Summit'],
            ['type' => 'calendar', 'message' => 'The Tech Innovation Summit starts in 10 days. Don\'t forget to register!', 'icon' => 'calendar', 'read' => false]
        );
        Notification::firstOrCreate(
            ['user_id' => $student->id, 'title' => 'New scholarship opportunity posted'],
            ['type' => 'star', 'message' => 'MTN Foundation Scholarship 2025 is now accepting applications. Deadline in 30 days.', 'icon' => 'star', 'read' => true]
        );
    }
}
