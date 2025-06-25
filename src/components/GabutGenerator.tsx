import { useState } from 'react';
import { Dices } from 'lucide-react';

const GABUT_IDEAS = [
    "Coba resep Indomie aneh dari TikTok",
    "Nonton film dari negara yang belum pernah kamu tonton",
    "Rapikan 100 foto di galeri HP-mu",
    "Belajar 10 kata baru dalam bahasa asing",
    "Jalan kaki keliling komplek sambil dengar podcast",
    "Tulis cerita pendek dengan 3 kata acak: ayam, bulan, teknologi",
    "Buat playlist Spotify berdasarkan mood 'Senin Pagi'",
    "Gambar ulang logo brand terkenal versi jelek",
    "Cari video ASMR paling aneh di YouTube",
    "Coba meditasi 5 menit dengan aplikasi gratis",
    "Tonton video 'restorasi barang rongsokan' sampai puas",
    "Ubah tata letak ikon di homescreen HP-mu"
];

export default function GabutGenerator() {
    const [activity, setActivity] = useState<string>('Klik tombol di bawah untuk memulai!');
    const [isGenerating, setIsGenerating] = useState(false);

    const generateActivity = () => {
        setIsGenerating(true);
        // Tampilkan animasi loading singkat
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * GABUT_IDEAS.length);
            setActivity(GABUT_IDEAS[randomIndex]);
            setIsGenerating(false);
        }, 500); // Durasi animasi
    };

    return (
        <div className="w-full max-w-2xl bg-card p-8 rounded-lg shadow-lg text-center flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
                <Dices size={32} className="text-accent" />
                <h2 className="text-2xl text-white font-bold">Gabut Generator</h2>
            </div>
            <p className="opacity-80 mb-8">Tidak tahu mau melakukan apa? Biarkan takdir yang memutuskan.</p>

            {/* Area Tampilan Aktivitas */}
            <div className="w-full min-h-[100px] bg-background p-6 rounded-lg flex justify-center items-center mb-8 text-center">
                <p className={`text-2xl font-semibold text-text-highlight transition-opacity duration-300 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}>
                    {activity}
                </p>
            </div>

            {/* Tombol */}
            <button
                onClick={generateActivity}
                disabled={isGenerating}
                className="bg-accent hover:bg-accent-hover text-white font-bold py-4 px-10 rounded-lg text-xl uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGenerating ? 'Mencari Ide...' : 'Kasih Ide Dong!'}
            </button>
        </div>
    );
}