<?php

namespace App\Http\Controllers;

use App\Models\Audio;
use Illuminate\Http\Request;

class AudioController extends Controller
{
    public function index(Request $request)
    {
        $query = Audio::query();

        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('author', 'like', '%' . $request->search . '%');
            });
        }

        return response()->json($query->orderBy('plays', 'desc')->paginate(20));
    }

    public function show(string $id)
    {
        $audio = Audio::findOrFail($id);
        $audio->increment('plays');
        return response()->json($audio);
    }

    public function like(string $id)
    {
        $audio = Audio::findOrFail($id);
        $audio->increment('likes');
        return response()->json(['message' => 'Liked', 'likes' => $audio->likes]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
            'duration' => 'required|string',
        ]);

        $audio = Audio::create([
            ...$request->only(['title', 'author', 'category', 'description', 'duration', 'audio_url', 'cover_url']),
            'uploaded_by' => $request->user()->id,
        ]);

        return response()->json($audio, 201);
    }
}
