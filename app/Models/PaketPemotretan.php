<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaketPemotretan extends Model
{

    protected $table = 'paket_pemotretan';
    protected $fillable = ['nama', 'deskripsi', 'durasi', 'harga', 'parent_id'];

    public function parent()
    {
        return $this->belongsTo(PaketPemotretan::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(PaketPemotretan::class, 'parent_id');
    }
}
