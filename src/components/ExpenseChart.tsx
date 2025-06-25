import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Transaction } from '../pages/UangJajanTrackerPage';
import { formatRupiah } from '../utils/formatters';

interface ExpenseChartProps {
    transactions: Transaction[];
}

// Daftar warna yang akan kita gunakan untuk chart
const COLORS = ['#b366ff', '#8a2be2', '#9370db', '#6a5acd', '#483d8b'];

// --- KOMPONEN BARU UNTUK TOOLTIP KUSTOM ---
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-background p-3 rounded-lg shadow-xl border border-card">
                <p className="font-bold">{data.name}</p>
                <p className="text-accent">{formatRupiah(data.value)}</p>
            </div>
        );
    }
    return null;
};

export default function ExpenseChart({ transactions }: ExpenseChartProps) {
    // --- Logika untuk memproses data ---
    const expenseData = transactions
        .filter(t => t.tipe === 'pengeluaran')
        .reduce((acc, t) => {
            // Gunakan 'kategori' sekarang, atau 'Lainnya' jika tidak ada
            const category = t.kategori || 'Lainnya'; 
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += t.jumlah;
            return acc;
        }, {} as Record<string, number>);

    const chartData = Object.entries(expenseData).map(([name, value], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        fill: COLORS[index % COLORS.length], // Tambahkan properti fill
    }));

    if (chartData.length === 0) {
        return (
        <div className="w-full max-w-4xl bg-card p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-2">Diagram Pengeluaran</h3>
            <p className="opacity-70">Belum ada data pengeluaran untuk ditampilkan.</p>
        </div>
        );
    }

    return (
        <div className="w-full max-w-4xl h-80 bg-card p-4 md:p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">Diagram Pengeluaran</h3>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    {/* Beritahu PieChart untuk menggunakan tooltip kustom kita */}
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        // Hapus label default agar tidak tumpang tindih dengan tooltip
                        label={false} 
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}