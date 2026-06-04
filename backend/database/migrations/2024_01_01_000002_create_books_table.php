<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('category');
            $table->text('description')->nullable();
            $table->string('file_url')->nullable();
            $table->string('cover_url')->nullable();
            $table->integer('pages')->default(0);
            $table->string('size')->nullable();
            $table->integer('downloads')->default(0);
            $table->integer('views')->default(0);
            $table->float('rating')->default(0);
            $table->foreignId('uploaded_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('books'); }
};
