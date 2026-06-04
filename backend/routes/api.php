<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\AudioController;
use App\Http\Controllers\PastQuestionController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\ReminderController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AdminController;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::patch('/auth/profile', [AuthController::class, 'updateProfile']);

    // Library
    Route::get('/library', [LibraryController::class, 'index']);
    Route::get('/library/{id}', [LibraryController::class, 'show']);
    Route::post('/library', [LibraryController::class, 'store']);
    Route::post('/library/{id}/bookmark', [LibraryController::class, 'bookmark']);
    Route::patch('/library/{id}/progress', [LibraryController::class, 'updateProgress']);

    // Audio
    Route::get('/audio', [AudioController::class, 'index']);
    Route::get('/audio/{id}', [AudioController::class, 'show']);
    Route::post('/audio', [AudioController::class, 'store']);
    Route::post('/audio/{id}/like', [AudioController::class, 'like']);

    // Past Questions
    Route::get('/past-questions', [PastQuestionController::class, 'index']);
    Route::get('/past-questions/{id}', [PastQuestionController::class, 'show']);
    Route::post('/past-questions', [PastQuestionController::class, 'store']);
    Route::post('/past-questions/{id}/save', [PastQuestionController::class, 'save']);

    // Events
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{id}', [EventController::class, 'show']);
    Route::post('/events', [EventController::class, 'store']);
    Route::post('/events/{id}/register', [EventController::class, 'register']);

    // Opportunities
    Route::get('/opportunities', [OpportunityController::class, 'index']);
    Route::get('/opportunities/{id}', [OpportunityController::class, 'show']);
    Route::post('/opportunities', [OpportunityController::class, 'store']);
    Route::post('/opportunities/{id}/bookmark', [OpportunityController::class, 'bookmark']);

    // Reminders
    Route::get('/reminders', [ReminderController::class, 'index']);
    Route::post('/reminders', [ReminderController::class, 'store']);
    Route::put('/reminders/{id}', [ReminderController::class, 'update']);
    Route::delete('/reminders/{id}', [ReminderController::class, 'destroy']);
    Route::patch('/reminders/{id}/complete', [ReminderController::class, 'complete']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllRead']);
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markRead']);

    // Admin
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'stats']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::get('/analytics', [AdminController::class, 'analytics']);
    });

    // Global search
    Route::get('/search', function (\Illuminate\Http\Request $request) {
        $q = $request->get('q', '');
        return response()->json([
            'query' => $q,
            'results' => [
                'books' => \App\Models\Book::where('title', 'like', "%$q%")->limit(5)->get(),
                'events' => \App\Models\Event::where('title', 'like', "%$q%")->limit(5)->get(),
                'opportunities' => \App\Models\Opportunity::where('title', 'like', "%$q%")->limit(5)->get(),
            ]
        ]);
    });
});
