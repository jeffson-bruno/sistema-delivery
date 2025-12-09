<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Listar todos os usuários
    public function index()
    {
        return User::select('id', 'name', 'email', 'phone', 'role', 'created_at')
                    ->orderBy('name')
                    ->get();
    }

    // Criar novo usuário
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'phone'    => ['nullable', 'string'],
            'role'     => ['required', 'in:admin,cashier'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $data['password'] = Hash::make($data['password']);

        return User::create($data);
    }

    // Detalhar um usuário específico
    public function show($id)
    {
        return User::select('id', 'name', 'email', 'phone', 'role', 'created_at')
                    ->findOrFail($id);
    }

    // Atualizar usuário
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name'  => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email,' . $user->id],
            'phone' => ['nullable', 'string'],
            'role'  => ['required', 'in:admin,cashier'],
        ]);

        $user->update($data);

        return $user;
    }

    // Resetar senha (Admin define uma nova senha ou pode gerar automaticamente)
    public function resetPassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user->password = Hash::make($data['password']);
        $user->save();

        return response()->json([
            'message' => 'Senha redefinida com sucesso.',
        ]);
    }

    // Deletar usuário
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json([
            'message' => 'Usuário excluído.',
        ]);
    }
}
