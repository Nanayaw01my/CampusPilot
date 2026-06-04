<?php

namespace App\Http\Controllers;

use App\Models\PastQuestion;
use Illuminate\Http\Request;

class PastQuestionController extends Controller
{
    public function index(Request $request)
    {
        $query = PastQuestion::query();

        if ($request->department) $query->where('department', $request->department);
        if ($request->year) $query->where('year', $request->year);
        if ($request->level) $query->where('level', $request->level);
        if ($request->search) $query->where('course', 'like', '%' . $request->search . '%');

        return response()->json($query->orderBy('created_at', 'desc')->paginate(20));
    }

    public function show(string $id)
    {
        $q = PastQuestion::findOrFail($id);
        $q->increment('downloads');
        return response()->json($q);
    }

    public function store(Request $request)
    {
        $request->validate([
            'course' => 'required|string|max:255',
            'department' => 'required|string',
            'year' => 'required|string',
            'level' => 'required|string',
            'semester' => 'required|string',
            'file' => 'required|file|mimes:pdf|max:51200',
        ]);

        $pq = PastQuestion::create([
            ...$request->only(['course', 'department', 'year', 'level', 'semester']),
            'uploaded_by' => $request->user()->id,
            'downloads' => 0,
        ]);

        return response()->json($pq, 201);
    }

    public function save(Request $request, string $id)
    {
        $user = $request->user();
        $saved = $user->saved_questions ?? [];

        if (in_array($id, $saved)) {
            $saved = array_values(array_filter($saved, fn($s) => $s !== $id));
            $message = 'Removed from saved';
        } else {
            $saved[] = $id;
            $message = 'Saved successfully';
        }

        $user->update(['saved_questions' => $saved]);
        return response()->json(['message' => $message]);
    }
}
