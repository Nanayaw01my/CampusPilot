<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::query();

        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('author', 'like', '%' . $request->search . '%');
            });
        }

        $books = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($books);
    }

    public function show(string $id)
    {
        $book = Book::findOrFail($id);
        $book->increment('views');
        return response()->json($book);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
            'file' => 'required|file|mimes:pdf|max:102400',
        ]);

        // TODO: Upload to Cloudinary
        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'category' => $request->category,
            'description' => $request->description,
            'uploaded_by' => $request->user()->id,
        ]);

        return response()->json($book, 201);
    }

    public function bookmark(Request $request, string $id)
    {
        $book = Book::findOrFail($id);
        $user = $request->user();

        $bookmarks = $user->bookmarks ?? [];

        if (in_array($id, $bookmarks)) {
            $bookmarks = array_filter($bookmarks, fn($b) => $b !== $id);
            $message = 'Bookmark removed';
        } else {
            $bookmarks[] = $id;
            $message = 'Book bookmarked';
        }

        $user->update(['bookmarks' => array_values($bookmarks)]);

        return response()->json(['message' => $message, 'bookmarked' => in_array($id, $user->bookmarks ?? [])]);
    }

    public function updateProgress(Request $request, string $id)
    {
        $request->validate(['page' => 'required|integer|min:0']);

        $user = $request->user();
        $progress = $user->reading_progress ?? [];
        $progress[$id] = $request->page;
        $user->update(['reading_progress' => $progress]);

        return response()->json(['message' => 'Progress updated', 'page' => $request->page]);
    }
}
