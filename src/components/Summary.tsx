import { formatRupiah } from '../utils/formatters';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';

interface SummaryProps {
    totalPemasukan: number;
    totalPengeluaran: number;
    sisaUang: number;
}

export default function Summary({ totalPemasukan, totalPengeluaran, sisaUang }: SummaryProps) {
    return (
        <div className="w-full max-w-4xl bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Ringkasan Keuangan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {/* Sisa Uang */}
                <div className="bg-background p-4 rounded-lg">
                    <div className="flex justify-center items-center gap-2 mb-1">
                        <Wallet size={20} className="text-accent" />
                        <h4 className="text-lg font-semibold">Sisa Uang</h4>
                    </div>
                    <p className={`text-2xl font-bold ${sisaUang >= 0 ? 'text-text' : 'text-error'}`}>
                        {formatRupiah(sisaUang)}
                    </p>
                </div>

                {/* Total Pemasukan */}
                <div className="bg-background p-4 rounded-lg">
                    <div className="flex justify-center items-center gap-2 mb-1">
                        <ArrowUpCircle size={20} className="text-success" />
                        <h4 className="text-lg font-semibold">Pemasukan</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-400">
                        {formatRupiah(totalPemasukan)}
                    </p>
                </div>

                {/* Total Pengeluaran */}
                <div className="bg-background p-4 rounded-lg">
                    <div className="flex justify-center items-center gap-2 mb-1">
                        <ArrowDownCircle size={20} className="text-error" />
                        <h4 className="text-lg font-semibold">Pengeluaran</h4>
                    </div>
                    <p className="text-2xl font-bold text-red-400">
                        {formatRupiah(totalPengeluaran)}
                    </p>
                </div>
            </div>
        </div>
    );
}