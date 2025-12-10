<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\SystemSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Endpoint de checkout do cliente (pedido online).
     *
     * Exemplo de payload:
     * {
     *   "customer": {
     *     "name": "Fulano",
     *     "nickname": "Fulano da Silva",
     *     "phone": "86999999999",
     *     "address_street": "Rua X",
     *     "address_number": "123",
     *     "reference_point": "Perto da praça"
     *   },
     *   "items": [
     *     { "product_id": 1, "quantity": 2 },
     *     { "product_id": 3, "quantity": 1 }
     *   ],
     *   "payment_method": "pix",
     *   "delivery_fee": 5.0
     * }
     */
    public function checkout(Request $request)
    {
        $data = $request->validate([
            'customer' => ['required', 'array'],
            'customer.name' => ['required', 'string', 'max:255'],
            'customer.nickname' => ['nullable', 'string', 'max:255'],
            'customer.phone' => ['nullable', 'string', 'max:50'],
            'customer.address_street' => ['required', 'string', 'max:255'],
            'customer.address_number' => ['required', 'string', 'max:50'],
            'customer.reference_point' => ['nullable', 'string', 'max:255'],

            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],

            'payment_method' => ['required', 'in:pix,card,cash'],
            'delivery_fee'   => ['nullable', 'numeric', 'min:0'],
        ]);

        return DB::transaction(function () use ($data) {

            // 1) Criar ou atualizar cliente
            $customerData = $data['customer'];

            if (!empty($customerData['phone'])) {
                // Se tiver telefone, tentamos localizar por telefone
                $customer = Customer::updateOrCreate(
                    ['phone' => $customerData['phone']],
                    [
                        'name'            => $customerData['name'],
                        'nickname'        => $customerData['nickname'] ?? null,
                        'address_street'  => $customerData['address_street'],
                        'address_number'  => $customerData['address_number'],
                        'reference_point' => $customerData['reference_point'] ?? null,
                    ]
                );
            } else {
                // Sem telefone, apenas cria novo registro
                $customer = Customer::create([
                    'name'            => $customerData['name'],
                    'nickname'        => $customerData['nickname'] ?? null,
                    'phone'           => $customerData['phone'] ?? null,
                    'address_street'  => $customerData['address_street'],
                    'address_number'  => $customerData['address_number'],
                    'reference_point' => $customerData['reference_point'] ?? null,
                ]);
            }

            // 2) Calcular subtotal com base nos produtos
            $itemsData = $data['items'];
            $subtotal  = 0;

            $orderItemsToCreate = [];

            foreach ($itemsData as $item) {
                $product = Product::findOrFail($item['product_id']);

                // Por enquanto, usamos o preço normal (promo vamos evoluir depois)
                $unitPrice = $product->price;

                $lineTotal = $unitPrice * $item['quantity'];
                $subtotal += $lineTotal;

                $orderItemsToCreate[] = [
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'unit_price' => $unitPrice,
                ];
            }

            // 3) Determinar taxa de entrega
            $deliveryFee = $data['delivery_fee'] ?? null;
            if ($deliveryFee === null) {
                $deliveryFee = (float) (SystemSetting::getValue('delivery_fee', 0) ?? 0);
            }

            $total = $subtotal + $deliveryFee;

            // 4) Criar pedido (Order)
            $order = Order::create([
                'user_id'        => null, // pedido online, ainda não associado a um operador
                'customer_id'    => $customer->id,
                'order_type'     => 'online',
                'payment_method' => $data['payment_method'],
                'payment_status' => 'pending',
                'status'         => 'accepted', // status inicial no painel
                'subtotal'       => $subtotal,
                'delivery_fee'   => $deliveryFee,
                'total'          => $total,
            ]);

            // 5) Criar itens do pedido
            foreach ($orderItemsToCreate as $itemData) {
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $itemData['product_id'],
                    'quantity'   => $itemData['quantity'],
                    'unit_price' => $itemData['unit_price'],
                ]);
            }

            // 6) Carregar relações para resposta
            $order->load(['customer', 'items.product']);

            return response()->json([
                'message' => 'Pedido criado com sucesso.',
                'order'   => $order,
            ], 201);
        });
    }
}
