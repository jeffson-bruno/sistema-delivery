<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'setting_key',
        'setting_value',
    ];

    /**
     * Helper para pegar valor de uma configuração.
     */
    public static function getValue(string $key, $default = null)
    {
        $record = static::where('setting_key', $key)->first();

        return $record ? $record->setting_value : $default;
    }

    /**
     * Helper para definir ou atualizar um setting.
     */
    public static function setValue(string $key, $value): void
    {
        static::updateOrCreate(
            ['setting_key' => $key],
            ['setting_value' => $value]
        );
    }
}

