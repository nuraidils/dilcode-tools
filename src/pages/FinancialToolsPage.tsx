import { Link } from 'react-router-dom';
import EmergencyFundCalculator from '../components/EmergencyFundCalculator'; 
import CompoundInterestCalculator from '../components/CompoundInterestCalculator';
import { Wallet } from 'lucide-react';

export default function FinancialToolsPage() {
    return (
        <div className="flex flex-col items-center w-full space-y-12">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-accent">Financial Tools</h1>
                <p className="mt-2 text-lg opacity-80">Alat bantu untuk membantumu merencanakan masa depan keuangan.</p>
            </div>

            {/* Link ke Uang Jajan Tracker */}
            <div className="w-full max-w-4xl">
                <Link to="/uang-jajan-tracker" className="block w-full bg-card p-6 rounded-lg shadow-lg hover:bg-black/20 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <Wallet size={40} className="text-accent" />
                        <div>
                            <h2 className="text-2xl font-bold">Uang Jajan Tracker</h2>
                            <p className="opacity-80">Lacak pemasukan dan pengeluaranmu secara detail.</p>
                        </div>
                    </div>
                </Link>
            </div>
            
            {/* Tempat untuk Kalkulator Dana Darurat */}
            <EmergencyFundCalculator />

            {/* --- TAMBAHKAN KALKULATOR BARU DI SINI --- */}
            <CompoundInterestCalculator />

        </div>
    );
}