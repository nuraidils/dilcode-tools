import { formatRupiah } from "../utils/formatters";
import type { Transaction } from "../pages/UangJajanTrackerPage"; // Impor tipe
import { Trash2 } from "lucide-react";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface TransactionListProps {
    transactions: Transaction[];
    deleteTransaction: (id: number) => void;
}

export default function TransactionList({ transactions, deleteTransaction }: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <div className="w-full max-w-4xl p-8 bg-card rounded-lg text-center">
                <h3 className="text-xl font-bold">Belum Ada Transaksi</h3>
                <p className="opacity-70 mt-2">Ayo catat transaksi pertamamu menggunakan form di atas!</p>
            </div>
        )
    }

    return (
        <div className="w-full max-w-4xl bg-card p-4 md:p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Riwayat Transaksi</h3>
            <ul className="space-y-3">
                {transactions.map(t => (
                    <li key={t.id} className="bg-background p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                            {/* Bagian Kiri: Deskripsi & Tanggal */}
                            <div className="flex items-start gap-3">
                                <div className={`w-1.5 h-full min-h-[40px] rounded-full ${t.tipe === 'pemasukan' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                <div>
                                    <p className="font-semibold break-words">{t.deskripsi}</p>
                                    <p className="text-xs opacity-70 mt-1">{format(t.tanggal, 'd MMM yyyy, HH:mm', { locale: id })}</p>
                                </div>
                            </div>
                            
                            {/* Bagian Kanan: Jumlah & Tombol Hapus */}
                            <div className="flex flex-col items-end ml-2">
                                <span className={`font-bold text-base whitespace-nowrap ${t.tipe === 'pemasukan' ? 'text-green-400' : 'text-red-400'}`}>
                                    {t.tipe === 'pemasukan' ? '+' : '-'} {formatRupiah(t.jumlah)}
                                </span>
                                <button onClick={() => deleteTransaction(t.id)} className="text-text/50 hover:text-error transition-colors mt-1">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}