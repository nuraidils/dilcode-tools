import { useState, useMemo } from 'react';
import { formatRupiah } from '../utils/formatters';
import { ShieldCheck } from 'lucide-react';

export default function EmergencyFundCalculator() {
    const [pemasukan, setPemasukan] = useState<number | ''>('');
    const [targetMultiplier, setTargetMultiplier] = useState<number>(6);

    const danaDaruratTarget = useMemo(() => {
        if (typeof pemasukan === 'number' && pemasukan > 0) {
            return pemasukan * targetMultiplier;
        }
        return 0;
    }, [pemasukan, targetMultiplier]);

    return (
        <div className="w-full max-w-4xl bg-card p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
                <ShieldCheck size={32} className="text-accent" />
                <h2 className="text-2xl font-bold">Kalkulator Dana Darurat</h2>
            </div>
            <p className="opacity-80 mb-6">Hitung berapa banyak dana yang perlu kamu siapkan untuk kondisi darurat berdasarkan **pemasukan** bulananmu.</p>
            
            {/* --- BAGIAN YANG DIPERBAIKI SECARA SIGNIFIKAN --- */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                
                {/* Bagian Input (Kolom Kiri di Desktop) */}
                <div className="flex-1 space-y-6">
                    <div>
                        <label htmlFor="pemasukan" className="block mb-2 font-medium">Total Pemasukan Bulanan</label>
                        <input
                            type="number"
                            id="pemasukan"
                            value={pemasukan}
                            onChange={(e) => setPemasukan(Number(e.target.value))}
                            placeholder="Contoh: 5000000"
                            className="w-full p-3 bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Target Dana Darurat</label>
                        {/* Tombol dibuat responsif */}
                        <div className="grid grid-cols-3 gap-2">
                            {[3, 6, 12].map(multiplier => (
                                <button
                                key={multiplier}
                                onClick={() => setTargetMultiplier(multiplier)}
                                className={`py-3 px-2 text-sm sm:text-base rounded-md font-semibold transition-colors duration-200 ${targetMultiplier === multiplier ? 'bg-accent text-white' : 'bg-background hover:bg-background/70'}`}
                                >
                                {multiplier}x Pemasukan
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Bagian Hasil (Kolom Kanan di Desktop) */}
                <div className="flex-1 bg-background p-6 rounded-lg text-center flex flex-col justify-center items-center min-h-[180px]">
                    <h4 className="text-lg font-semibold opacity-80">Target Dana Darurat Kamu</h4>
                    <p className="text-4xl sm:text-5xl font-bold text-accent my-2">
                        {formatRupiah(danaDaruratTarget)}
                    </p>
                    <p className="text-sm opacity-60">
                        Idealnya {targetMultiplier} bulan dari pemasukanmu.
                    </p>
                </div>

            </div>
        </div>
    );
}