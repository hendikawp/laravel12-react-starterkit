<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaketPemotretanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('paket_pemotretan')->insert([
            [
                'nama' => 'Reguler',
                'deskripsi' => 'Paket reguler 1 jam dengan 10 file edit.',
                'durasi' => 60,
                'harga' => 500000,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nama' => 'Premium',
                'deskripsi' => 'Paket premium 2 jam dengan 20 file edit dan cetak 10R.',
                'durasi' => 120,
                'harga' => 1000000,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
