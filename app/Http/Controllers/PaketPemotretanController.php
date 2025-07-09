<?php

namespace App\Http\Controllers;

use App\Models\PaketPemotretan;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PaketPemotretanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PaketPemotretan/Index', [
            'paket' => PaketPemotretan::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255|unique:paket_pemotretan,nama',
            'deskripsi' => 'nullable|string',
            'durasi' => 'required|integer|min:1',
            'harga' => 'required|numeric|min:1',
        ]);

        $paket = PaketPemotretan::create($data);

        return response()->json($paket);
    }

    public function update(Request $request, PaketPemotretan $paket)
    {
        $data = $request->validate([
            'nama' => [
                'required',
                'string',
                'max:255',
                Rule::unique('paket_pemotretan', 'nama')->ignore($paket->id),
            ],
            'deskripsi' => 'nullable|string',
            'durasi' => 'required|integer|min:1',
            'harga' => 'required|numeric|min:1',
        ]);

        $paket->update($data);

        return response()->json($paket);
    }


    public function destroy(PaketPemotretan $paket)
    {
        $paket->delete();

        return back()->with('success', 'Paket berhasil dihapus.');
    }
}
