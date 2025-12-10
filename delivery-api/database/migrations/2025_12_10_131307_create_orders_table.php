<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Quem registrou o pedido (no caso de PDV). Para online, fica null.
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();

            // Cliente
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();

            $table->enum('order_type', ['online', 'in_person']);
            $table->enum('payment_method', ['pix', 'card', 'cash'])->nullable();
            $table->enum('payment_status', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->enum('status', ['accepted', 'preparing', 'out_for_delivery', 'finished', 'cancelled'])
                ->default('accepted');

            $table->decimal('subtotal', 10, 2);
            $table->decimal('delivery_fee', 10, 2)->default(0);
            $table->decimal('total', 10, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }

};
