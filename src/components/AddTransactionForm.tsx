import { useState } from 'react';
import type { FormEvent } from 'react';

// Definisikan tipe untuk data yang akan kita kirim ke parent
// Omit<...> berarti kita akan menggunakan semua properti dari 'Transaction' KECUALI 'id' dan 'tanggal'
// karena itu akan di-generate oleh parent
import type { Transaction } from '../pages/UangJajanTrackerPage'; // Kita akan ekspor tipe ini nanti
interface AddTransactionFormProps {
    addTransaction: (transaction: Omit<Transaction, 'id' | 'tanggal'>) => void;
}

export default function AddTransactionForm({ addTransaction }: AddTransactionFormProps) {
    // State lokal untuk setiap input di form
    const [deskripsi, setDeskripsi] = useState('');
    const [jumlah, setJumlah] = useState<number | ''>('');
    const [tipe, setTipe] = useState<'pemasukan' | 'pengeluaran'>('pengeluaran');
    const [kategori, setKategori] = useState<'Makanan' | 'Transport' | 'Hiburan' | 'Lainnya'>('Makanan');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!deskripsi || !jumlah || jumlah <= 0) {
            // Kita bisa gunakan notifikasi global kita di sini nanti
            alert("Harap isi semua field dengan benar.");
            return;
        }

        // Panggil fungsi dari parent dengan data baru
        addTransaction({ deskripsi, jumlah, tipe, kategori });

        // Reset form setelah submit
        setDeskripsi('');
        setJumlah('');
        setTipe('pengeluaran');
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Tambah Transaksi Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Input Deskripsi */}
                <div className="md:col-span-2">
                    <label htmlFor="deskripsi" className="sr-only">Deskripsi</label>
                    <input
                        type="text"
                        id="deskripsi"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Deskripsi (e.g., Beli makan siang)"
                        className="w-full p-3 bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0"
                    />
                </div>
                
                {/* Input Jumlah */}
                <div>
                    <label htmlFor="jumlah" className="sr-only">Jumlah</label>
                    <input
                        type="number"
                        id="jumlah"
                        value={jumlah}
                        onChange={(e) => setJumlah(Number(e.target.value))}
                        placeholder="Jumlah (e.g., 20000)"
                        className="w-full p-3 bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0"
                    />
                </div>
            </div>

            {/* --- BAGIAN BARU UNTUK KATEGORI --- */}
            {tipe === 'pengeluaran' && (
                <div className="mt-4">
                    <label htmlFor="kategori" className="block mb-1 font-medium text-sm">Kategori Pengeluaran</label>
                    <select
                        id="kategori"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value as any)}
                        className="w-full p-3 bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0"
                    >
                        <option>Makanan</option>
                        <option>Transport</option>
                        <option>Hiburan</option>
                        <option>Lainnya</option>
                    </select>
                </div>
            )}
            
            {/* Pilihan Tipe & Tombol Submit */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 md:gap-4">
                <div className="flex items-center gap-4">
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" name="tipe" value="pemasukan" checked={tipe === 'pemasukan'} onChange={() => setTipe('pemasukan')} className="h-5 w-5 text-success focus:ring-success" />
                        <span className="ml-2 text-green-400">Pemasukan</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" name="tipe" value="pengeluaran" checked={tipe === 'pengeluaran'} onChange={() => setTipe('pengeluaran')} className="h-5 w-5 text-error focus:ring-error" />
                        <span className="ml-2 text-red-400">Pengeluaran</span>
                    </label>
                </div>
                <button type="submit" className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 mt-2 md:mt-0 rounded-lg transition-all duration-300">
                    Tambah
                </button>
            </div>
        </form>
    );
}