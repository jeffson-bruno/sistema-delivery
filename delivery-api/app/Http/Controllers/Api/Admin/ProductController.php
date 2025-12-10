<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Lista produtos (pode ter filtros depois)
    public function index(Request $request)
    {
        $query = Product::with('type')
            ->orderBy('name');

        if ($request->has('only_active')) {
            $query->where('is_active', true);
        }

        if ($request->has('product_type_id')) {
            $query->where('product_type_id', $request->product_type_id);
        }

        return $query->get();
    }

    // Cria novo produto
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_type_id'            => ['required', 'exists:product_types,id'],
            'name'                       => ['required', 'string', 'max:255', 'unique:products,name'],
            'description'                => ['nullable', 'string'],
            'price'                      => ['required', 'numeric', 'min:0'],
            'is_promotional'             => ['boolean'],
            'promotion_price'            => ['nullable', 'numeric', 'min:0'],
            'promotion_units_available'  => ['nullable', 'integer', 'min:1'],
            'preparation_time'           => ['nullable', 'integer', 'min:0'],
            'is_active'                  => ['boolean'],
            // upload de imagem faremos depois; por enquanto só string
            'image_path'                 => ['nullable', 'string'],
        ]);

        // Regra: se marcar promocional, precisa de promotion_price
        if (!empty($data['is_promotional']) && empty($data['promotion_price'])) {
            return response()->json([
                'message' => 'Preço promocional é obrigatório quando o produto está em promoção.',
            ], 422);
        }

        $product = Product::create($data);

        return $product->load('type');
    }

    // Detalhar produto
    public function show($id)
    {
        return Product::with('type')->findOrFail($id);
    }

    // Atualizar produto
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'product_type_id'            => ['required', 'exists:product_types,id'],
            'name'                       => ['required', 'string', 'max:255', 'unique:products,name,' . $product->id],
            'description'                => ['nullable', 'string'],
            'price'                      => ['required', 'numeric', 'min:0'],
            'is_promotional'             => ['boolean'],
            'promotion_price'            => ['nullable', 'numeric', 'min:0'],
            'promotion_units_available'  => ['nullable', 'integer', 'min:1'],
            'preparation_time'           => ['nullable', 'integer', 'min:0'],
            'is_active'                  => ['boolean'],
            'image_path'                 => ['nullable', 'string'],
        ]);

        if (!empty($data['is_promotional']) && empty($data['promotion_price'])) {
            return response()->json([
                'message' => 'Preço promocional é obrigatório quando o produto está em promoção.',
            ], 422);
        }

        $product->update($data);

        return $product->load('type');
    }

    // Deletar / inativar produto
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Se quiser só desativar em vez de deletar:
        // $product->is_active = false;
        // $product->save();

        $product->delete();

        return response()->json([
            'message' => 'Produto excluído com sucesso.',
        ]);
    }
}
