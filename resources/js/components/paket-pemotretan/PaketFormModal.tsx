import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner'; // ✅ pastikan sudah install 'sonner'

interface Paket {
    id?: number;
    nama: string;
    deskripsi?: string;
    durasi: number;
    harga: number;
}

interface Props {
    triggerText: string;
    paket?: Paket;
    onClose?: () => void;
}

export default function PaketFormModal({ triggerText, paket, onClose }: Props) {
    const [open, setOpen] = useState(false);

    const isEdit = !!paket;

    const { data, setData, post, put, reset, processing, errors, wasSuccessful } = useForm<Paket>({
        nama: paket?.nama ?? '',
        deskripsi: paket?.deskripsi ?? '',
        durasi: paket?.durasi ?? 60,
        harga: paket?.harga ?? 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const action = isEdit
            ? put(`/paket/${paket?.id}`, {
                  preserveScroll: true,
                  onSuccess: () => {
                      toast.success('Paket berhasil diperbarui');
                      reset();
                      setOpen(false);
                      onClose?.();
                  },
              })
            : post('/paket', {
                  preserveScroll: true,
                  preserveState: false, // <— tambahan
                  onSuccess: () => {
                      toast.success('Paket berhasil ditambahkan');
                      setOpen(false);
                      onClose?.();
                  },
              });
    };

    // Auto close modal if external success is triggered
    // Reset form ketika modal ditutup
    useEffect(() => {
        if (!open && !isEdit) {
            reset();
        }
    }, [open]);

    // Reset setelah submit sukses
    useEffect(() => {
        if (wasSuccessful) {
            setOpen(false);
            onClose?.();
        }
    }, [wasSuccessful]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="w-full md:w-auto">
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit Paket' : 'Tambah Paket'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="nama">Nama Paket</Label>
                        <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} disabled={processing} />
                        {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
                    </div>

                    <div>
                        <Label htmlFor="deskripsi">Deskripsi</Label>
                        <Textarea
                            id="deskripsi"
                            value={data.deskripsi}
                            onChange={(e) => setData('deskripsi', e.target.value)}
                            disabled={processing}
                        />
                        {errors.deskripsi && <p className="text-sm text-red-500">{errors.deskripsi}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="durasi">Durasi (menit)</Label>
                            <Input
                                id="durasi"
                                type="number"
                                value={data.durasi}
                                onChange={(e) => setData('durasi', parseInt(e.target.value))}
                                disabled={processing}
                            />
                            {errors.durasi && <p className="text-sm text-red-500">{errors.durasi}</p>}
                        </div>

                        <div>
                            <Label htmlFor="harga">Harga (Rp)</Label>
                            <Input
                                id="harga"
                                type="number"
                                value={data.harga}
                                onChange={(e) => setData('harga', parseInt(e.target.value))}
                                disabled={processing}
                            />
                            {errors.harga && <p className="text-sm text-red-500">{errors.harga}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
