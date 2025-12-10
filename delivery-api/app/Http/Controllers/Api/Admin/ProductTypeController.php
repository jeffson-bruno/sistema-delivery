<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    // Lista todos os tipos de produto
    public function index()
    {
        return ProductType::orderBy('name')->get();
    }

    // Cria um novo tipo de produto
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:product_types,name'],
        ]);

        return ProductType::create($data);
    }

    // Mostra um tipo específico
    public function show($id)
    {
        return ProductType::findOrFail($id);
    }

    // Atualiza um tipo de produto
    public function update(Request $request, $id)
    {
        $type = ProductType::findOrFail($id);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:product_types,name,' . $type->id],
        ]);

        $type->update($data);

        return $type;
    }

    // Remove um tipo de produto
    public function destroy($id)
    {
        $type = ProductType::findOrFail($id);

        $type->delete();

        return response()->json([
            'message' => 'Tipo de produto excluído com sucesso.',
        ]);
    }
}
