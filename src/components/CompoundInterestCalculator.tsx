import { useState } from 'react';
import type { FormEvent } from 'react';
import { formatRupiah } from '../utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Tipe data untuk hasil chart
interface ChartData {
    tahun: number;
    totalInvestasi: number;
    totalSetoran: number;
}

export default function CompoundInterestCalculator() {
    // State untuk input form
    const [modalAwal, setModalAwal] = useState<number | ''>(1000000);
    const [setoranBulanan, setSetoranBulanan] = useState<number | ''>(500000);
    const [imbalHasil, setImbalHasil] = useState<number | ''>(8);
    const [durasi, setDurasi] = useState<number | ''>(10);

    // State untuk menyimpan hasil kalkulasi
    const [hasil, setHasil] = useState<ChartData[]>([]);

    // Fungsi untuk melakukan kalkulasi
    const hitungInvestasi = (e: FormEvent) => {
        e.preventDefault();
        const principal = Number(modalAwal);
        const monthlyContribution = Number(setoranBulanan);
        const annualRate = Number(imbalHasil) / 100;
        const years = Number(durasi);

        if (principal <= 0 || annualRate <= 0 || years <= 0) {
            alert("Harap isi semua field dengan angka positif.");
            return;
        }

        let futureValue = principal;
        let totalContributions = principal;
        const data: ChartData[] = [{ tahun: 0, totalInvestasi: principal, totalSetoran: principal }];

        for (let i = 1; i <= years; i++) {
            // Kalkulasi bunga tahunan
            futureValue *= (1 + annualRate);
            
            // Tambahkan setoran bulanan untuk satu tahun
            let yearlyContribution = monthlyContribution * 12;
            futureValue += yearlyContribution;
            totalContributions += yearlyContribution;

            data.push({
                tahun: i,
                totalInvestasi: Math.round(futureValue),
                totalSetoran: totalContributions
            });
        }
        setHasil(data);
    };

    const finalResult = hasil[hasil.length - 1];

    return (
        <div className="w-full max-w-4xl bg-card p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
                <TrendingUp size={32} className="text-accent" />
                <h2 className="text-2xl font-bold">Kalkulator Investasi</h2>
            </div>
            <p className="opacity-80 mb-6">Lihat bagaimana uangmu bisa bertumbuh seiring waktu dengan kekuatan bunga majemuk (*compound interest*).</p>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Form Input */}
                <form onSubmit={hitungInvestasi} className="w-full lg:w-1/3 space-y-4">
                    <div>
                        <label htmlFor="modalAwal" className="block mb-1 font-medium text-sm">Modal Awal (Rp)</label>
                        <input type="number" id="modalAwal" value={modalAwal} onChange={e => setModalAwal(Number(e.target.value))} className="w-full p-3 bg-background rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="setoranBulanan" className="block mb-1 font-medium text-sm">Setoran per Bulan (Rp)</label>
                        <input type="number" id="setoranBulanan" value={setoranBulanan} onChange={e => setSetoranBulanan(Number(e.target.value))} className="w-full p-3 bg-background rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="imbalHasil" className="block mb-1 font-medium text-sm">Imbal Hasil Tahunan (%)</label>
                        <input type="number" id="imbalHasil" value={imbalHasil} onChange={e => setImbalHasil(Number(e.target.value))} className="w-full p-3 bg-background rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="durasi" className="block mb-1 font-medium text-sm">Durasi (Tahun)</label>
                        <input type="number" id="durasi" value={durasi} onChange={e => setDurasi(Number(e.target.value))} className="w-full p-3 bg-background rounded-md" />
                    </div>
                    <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition-all">Hitung Proyeksi</button>
                </form>

                {/* Hasil & Grafik */}
                <div className="w-full lg:w-2/3 bg-background p-4 rounded-lg">
                    {hasil.length > 0 ? (
                        <div className="animate-fadeIn">
                            <div className="text-center mb-4">
                                <p className="opacity-80">Dalam {durasi} tahun, estimasi investasimu menjadi:</p>
                                <p className="text-4xl font-bold text-accent my-1">{formatRupiah(finalResult.totalInvestasi)}</p>
                                <p className="text-sm opacity-70">Total uang yang kamu setorkan: {formatRupiah(finalResult.totalSetoran)}</p>
                            </div>
                            <div className="w-full h-64">
                                <ResponsiveContainer>
                                    <LineChart data={hasil}>
                                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                        <XAxis dataKey="tahun" tickFormatter={(tick) => `Thn ${tick}`} />
                                        <YAxis tickFormatter={(tick) => `${(tick / 1000000).toFixed(0)}Jt`} />
                                        <Tooltip contentStyle={{ backgroundColor: '#2a004f', border: 'none', borderRadius: '0.5rem' }} labelStyle={{ fontWeight: 'bold',  }} formatter={(value: number) => formatRupiah(value)} />
                                        <Legend />
                                        <Line type="monotone" dataKey="totalInvestasi" name="Total Investasi" stroke="#b366ff" strokeWidth={2} />
                                        <Line type="monotone" dataKey="totalSetoran" name="Total Setoran" stroke="#e0e0e0" strokeOpacity={0.5} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex justify-center items-center text-center opacity-60">
                            <p>Masukkan data di samping kiri dan klik "Hitung Proyeksi" untuk melihat hasilnya di sini.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}