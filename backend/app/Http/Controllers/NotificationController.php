<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Notification::where('user_id', $request->user()->id)
                        ->orderBy('created_at', 'desc')
                        ->limit(50)
                        ->get()
        );
    }

    public function markRead(Request $request, string $id)
    {
        Notification::where('user_id', $request->user()->id)
                    ->where('id', $id)
                    ->update(['read' => true]);

        return response()->json(['message' => 'Marked as read']);
    }

    public function markAllRead(Request $request)
    {
        Notification::where('user_id', $request->user()->id)
                    ->where('read', false)
                    ->update(['read' => true]);

        return response()->json(['message' => 'All notifications marked as read']);
    }
}
