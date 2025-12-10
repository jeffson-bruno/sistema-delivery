<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SystemSetting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /**
     * Retorna as configurações principais do sistema.
     */
    public function show()
    {
        return response()->json([
            'pix_key_type'     => SystemSetting::getValue('pix_key_type'),
            'pix_key_value'    => SystemSetting::getValue('pix_key_value'),
            'pix_holder_name'  => SystemSetting::getValue('pix_holder_name'),
            'delivery_fee'     => (float) (SystemSetting::getValue('delivery_fee', 0) ?? 0),
            'opening_hours'    => SystemSetting::getValue('opening_hours'), // pode ser texto ou JSON
        ]);
    }

    /**
     * Atualiza as configurações do sistema.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'pix_key_type'    => ['nullable', 'in:cpf,cnpj,email,phone,random'],
            'pix_key_value'   => ['nullable', 'string', 'max:255'],
            'pix_holder_name' => ['nullable', 'string', 'max:255'],
            'delivery_fee'    => ['nullable', 'numeric', 'min:0'],
            'opening_hours'   => ['nullable'], // pode ser string ou JSON
        ]);

        if (array_key_exists('pix_key_type', $data)) {
            SystemSetting::setValue('pix_key_type', $data['pix_key_type']);
        }

        if (array_key_exists('pix_key_value', $data)) {
            SystemSetting::setValue('pix_key_value', $data['pix_key_value']);
        }

        if (array_key_exists('pix_holder_name', $data)) {
            SystemSetting::setValue('pix_holder_name', $data['pix_holder_name']);
        }

        if (array_key_exists('delivery_fee', $data)) {
            SystemSetting::setValue('delivery_fee', $data['delivery_fee']);
        }

        if (array_key_exists('opening_hours', $data)) {
            // Pode ser string com texto ou JSON stringify vindo do front
            SystemSetting::setValue('opening_hours', $data['opening_hours']);
        }

        return $this->show();
    }
}
