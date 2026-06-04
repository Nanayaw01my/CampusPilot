<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::where('date', '>=', now());

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->orderBy('date')->paginate(20));
    }

    public function show(string $id)
    {
        return response()->json(Event::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
            'location' => 'required|string',
            'capacity' => 'required|integer|min:1',
        ]);

        $event = Event::create([
            ...$request->only(['title', 'type', 'date', 'time', 'location', 'capacity', 'description']),
            'organizer_id' => $request->user()->id,
            'registered' => 0,
        ]);

        return response()->json($event, 201);
    }

    public function register(Request $request, string $id)
    {
        $event = Event::findOrFail($id);

        if ($event->registered >= $event->capacity) {
            return response()->json(['message' => 'Event is at full capacity'], 422);
        }

        $event->increment('registered');

        return response()->json(['message' => 'Successfully registered for event']);
    }
}
