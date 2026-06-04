<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('past_questions', function (Blueprint $table) {
            $table->id();
            $table->string('course');
            $table->string('department');
            $table->string('year');
            $table->string('level');
            $table->string('semester');
            $table->string('file_url')->nullable();
            $table->integer('downloads')->default(0);
            $table->foreignId('uploaded_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('past_questions'); }
};
