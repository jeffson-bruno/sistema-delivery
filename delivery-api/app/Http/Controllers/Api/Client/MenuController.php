<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\SystemSetting;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Cardápio público para o cliente.
     *
     * - Lista produtos ativos (com tipo)
     * - Retorna taxa de entrega e horário de funcionamento
     * - Flag is_open (por enquanto simples, depois podemos sofisticar)
     */
    public function index(Request $request)
    {
        // Produtos ativos
        $products = Product::with('type')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        // Configurações
        $deliveryFee   = (float) (SystemSetting::getValue('delivery_fee', 0) ?? 0);
        $openingHours  = SystemSetting::getValue('opening_hours');
        $isOpen        = true; // podemos evoluir depois com lógica baseada em horário

        return response()->json([
            'is_open'        => $isOpen,
            'delivery_fee'   => $deliveryFee,
            'opening_hours'  => $openingHours,
            'products'       => $products,
        ]);
    }
}
