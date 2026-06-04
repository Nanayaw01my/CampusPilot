<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use Illuminate\Http\Request;

class ReminderController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Reminder::where('user_id', $request->user()->id)
                     ->orderBy('due_date')
                     ->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:assignment,exam,event,study,deadline',
            'due_date' => 'required|date',
            'priority' => 'required|string|in:urgent,high,medium,low',
        ]);

        $reminder = Reminder::create([
            ...$request->only(['title', 'type', 'due_date', 'priority', 'notify_email', 'notify_push']),
            'user_id' => $request->user()->id,
            'completed' => false,
        ]);

        return response()->json($reminder, 201);
    }

    public function update(Request $request, string $id)
    {
        $reminder = Reminder::where('user_id', $request->user()->id)->findOrFail($id);
        $reminder->update($request->only(['title', 'type', 'due_date', 'priority', 'notify_email', 'notify_push']));
        return response()->json($reminder);
    }

    public function destroy(Request $request, string $id)
    {
        $reminder = Reminder::where('user_id', $request->user()->id)->findOrFail($id);
        $reminder->delete();
        return response()->json(['message' => 'Reminder deleted']);
    }

    public function complete(Request $request, string $id)
    {
        $reminder = Reminder::where('user_id', $request->user()->id)->findOrFail($id);
        $reminder->update(['completed' => !$reminder->completed]);
        return response()->json(['message' => 'Status updated', 'completed' => $reminder->completed]);
    }
}
