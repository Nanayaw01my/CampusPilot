<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type');
            $table->string('provider');
            $table->date('deadline');
            $table->string('location')->nullable();
            $table->string('stipend')->nullable();
            $table->text('description');
            $table->text('requirements')->nullable();
            $table->string('link')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('opportunities'); }
};
