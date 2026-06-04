<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Book;
use App\Models\Event;
use App\Models\Opportunity;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_users' => User::count(),
            'active_today' => User::whereDate('last_active', today())->count(),
            'books_uploaded' => Book::count(),
            'total_downloads' => Book::sum('downloads'),
            'events_this_month' => Event::whereMonth('date', now()->month)->count(),
            'opportunities_listed' => Opportunity::count(),
        ]);
    }

    public function users(Request $request)
    {
        $query = User::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->department) {
            $query->where('department', $request->department);
        }

        return response()->json($query->orderBy('created_at', 'desc')->paginate(25));
    }

    public function analytics()
    {
        $weeklyData = collect(range(0, 6))->map(function ($days) {
            $date = now()->subDays($days);
            return [
                'day' => $date->format('D'),
                'users' => User::whereDate('created_at', $date)->count(),
                'downloads' => Book::sum('downloads') / 7,
            ];
        })->reverse()->values();

        return response()->json([
            'weekly_growth' => $weeklyData,
            'top_books' => Book::orderBy('downloads', 'desc')->limit(5)->get(['title', 'downloads']),
            'department_stats' => User::selectRaw('department, count(*) as students')
                ->groupBy('department')
                ->get(),
        ]);
    }
}
