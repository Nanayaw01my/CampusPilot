<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use Illuminate\Http\Request;

class OpportunityController extends Controller
{
    public function index(Request $request)
    {
        $query = Opportunity::where('deadline', '>=', now());

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('provider', 'like', '%' . $request->search . '%');
            });
        }

        return response()->json($query->orderBy('deadline')->paginate(20));
    }

    public function show(string $id)
    {
        return response()->json(Opportunity::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:Scholarship,Internship,Competition,Grant,Exchange',
            'provider' => 'required|string',
            'deadline' => 'required|date|after:today',
            'description' => 'required|string',
        ]);

        $opp = Opportunity::create([
            ...$request->only(['title', 'type', 'provider', 'deadline', 'description', 'location', 'stipend', 'requirements', 'link']),
            'created_by' => $request->user()->id,
        ]);

        return response()->json($opp, 201);
    }

    public function bookmark(Request $request, string $id)
    {
        $opp = Opportunity::findOrFail($id);
        $user = $request->user();
        $saved = $user->saved_opportunities ?? [];

        if (in_array($id, $saved)) {
            $saved = array_values(array_filter($saved, fn($s) => $s !== $id));
            $message = 'Opportunity removed from saved';
        } else {
            $saved[] = $id;
            $message = 'Opportunity saved';
        }

        $user->update(['saved_opportunities' => $saved]);

        return response()->json(['message' => $message]);
    }
}
