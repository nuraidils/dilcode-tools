import { useState, useMemo, useEffect } from 'react';
import AddTransactionForm from '../components/AddTransactionForm'; // <-- Import komponen
import Summary from '../components/Summary';
import TransactionList from '../components/TransactionList';
import ExpenseChart from '../components/ExpenseChart';
import { useNotificationStore } from '../hooks/useNotificationStore';

// Ekspor tipe agar bisa digunakan oleh komponen lain
export interface Transaction {
    id: number;
    deskripsi: string;
    jumlah: number;
    tipe: 'pemasukan' | 'pengeluaran';
    tanggal: number; // Menggunakan timestamp
    kategori?: 'Makanan' | 'Transport' | 'Hiburan' | 'Lainnya'; // <-- Kategori baru
}

const initialTransactions: Transaction[] = []; // Kita mulai dari data kosong

export default function UangJajanTrackerPage() {
    const showNotification = useNotificationStore(state => state.showNotification);

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        try {
            const savedTransactions = localStorage.getItem('transactions');
            return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
        } catch (error) {
            console.error("Gagal memuat transaksi:", error);
            return initialTransactions;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('transactions', JSON.stringify(transactions));
        } catch (error) {
            console.error("Gagal menyimpan transaksi:", error);
        }
    }, [transactions]);

    // --- LOGIKA KALKULASI ---
    // useMemo digunakan agar kalkulasi tidak diulang setiap render, kecuali jika 'transactions' berubah
    const summary = useMemo(() => {
        const totalPemasukan = transactions
            .filter(t => t.tipe === 'pemasukan')
            .reduce((acc, t) => acc + t.jumlah, 0);
        
        const totalPengeluaran = transactions
            .filter(t => t.tipe === 'pengeluaran')
            .reduce((acc, t) => acc + t.jumlah, 0);

        const sisaUang = totalPemasukan - totalPengeluaran;
        return { totalPemasukan, totalPengeluaran, sisaUang };
    }, [transactions]);

    // --- LOGIKA UTAMA: untuk menambah transaksi baru ---
    const addTransaction = (transaction: Omit<Transaction, 'id' | 'tanggal'>) => {
    const newTransaction: Transaction = {
            id: Date.now(),
            tanggal: new Date().getTime(),
            ...transaction,
        };
        setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
        showNotification("Transaksi berhasil ditambahkan!", 'success');
    };

    // --- LOGIKA DELETE DIHIDUPKAN ---
    const deleteTransaction = (id: number) => {
        if (confirm("Apakah kamu yakin ingin menghapus transaksi ini?")) {
            setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
            showNotification("Transaksi berhasil dihapus.", 'error');
        }
    };

    return (
        <div className="flex flex-col items-center w-full space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-accent text-center">Uang Jajan Tracker</h1>
            
            {/* Gunakan komponen Summary dan oper datanya */}
            <Summary 
                totalPemasukan={summary.totalPemasukan}
                totalPengeluaran={summary.totalPengeluaran}
                sisaUang={summary.sisaUang}
            />

            {/* --- CHART DITAMBAHKAN DI SINI --- */}
            <ExpenseChart transactions={transactions} />

            {/* Gunakan komponen AddTransactionForm */}
            <AddTransactionForm addTransaction={addTransaction} />

            {/* Gunakan komponen TransactionList */}
            <TransactionList 
                transactions={transactions} 
                deleteTransaction={deleteTransaction} 
            />
        </div>
    );
}