import PaketFormModal from '@/components/paket-pemotretan/PaketFormModal';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Paket Pemotretan',
        href: '/paket',
    },
];

interface Paket {
    id: number;
    nama: string;
    deskripsi: string;
    durasi: number;
    harga: number;
}

interface Props {
    paket: Paket[];
}

export default function PaketIndex({ paket }: Props) {
    const { delete: destroy, processing } = useForm();
    const [editItem, setEditItem] = useState<Paket | null>(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleDelete = (id: number) => {
        destroy(`/paket/${id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Paket Pemotretan" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Paket Pemotretan</h1>
                        <p className="text-muted-foreground">Kelola daftar paket yang ditawarkan studio.</p>
                    </div>
                    <PaketFormModal triggerText="+ Tambah Paket" onClose={() => setOpenCreateModal(false)} />
                </div>

                <div className="bg-background space-y-2 divide-y rounded-md border">
                    {paket.length === 0 ? (
                        <div className="text-muted-foreground py-8 text-center">Belum ada data paket.</div>
                    ) : (
                        paket.map((item) => (
                            <div
                                key={item.id}
                                className="hover:bg-muted/50 flex flex-col justify-between gap-4 px-4 py-5 transition md:flex-row md:items-center"
                            >
                                {/* Info Paket */}
                                <div className="flex-1 space-y-1">
                                    <div className="text-base font-medium">{item.nama}</div>
                                    <div className="text-muted-foreground text-sm">{item.deskripsi}</div>
                                    <div className="text-muted-foreground text-xs">
                                        Durasi: <strong>{item.durasi} menit</strong> — Harga: <strong>Rp{item.harga.toLocaleString('id-ID')}</strong>
                                    </div>
                                </div>

                                {/* Aksi */}
                                <div className="flex flex-wrap gap-2 md:justify-end">
                                    <PaketFormModal triggerText="Edit" paket={item} onClose={() => setEditItem(null)} />

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="sm" variant="destructive">
                                                Hapus
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus Paket?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Paket <strong>{item.nama}</strong> akan dihapus permanen.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(item.id)} disabled={processing}>
                                                    Ya, Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
