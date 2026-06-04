<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audio_books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('category');
            $table->text('description')->nullable();
            $table->string('audio_url')->nullable();
            $table->string('cover_url')->nullable();
            $table->string('duration')->nullable();
            $table->unsignedInteger('plays')->default(0);
            $table->unsignedInteger('likes')->default(0);
            $table->string('uploaded_by')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audio_books');
    }
};
