import { Link } from "react-router-dom";
import { Timer, NotebookText, Target, Dices, Landmark, Share2 } from "lucide-react";
import FeedbackForm from "../components/FeedbackForm";

export default function HomePage() {
    return (
        <div className="text-center flex flex-col items-center justify-center pt-8 md:pt-16">
            {/* welcome section */}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white leading-tight">
                Bukan Sekadar Tools, <br /> Ini <span className="text-accent">Senjata Digitalmu</span>.
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-text opacity-80 mb-12">
                Sederhanakan hidup digitalmu, tingkatkan kreativitas, dan pacu produktivitas. Semua alat yang kamu butuhkan, ada di sini.
            </p>

            {/* Tools Category Section */}
            <div className="w-full max-w-4xl space-y-10">
                <h2 className="text-3xl font-bold text-left text-white">Kategori Tools</h2>

                {/* kartu productivity */}
                <div className="bg-card rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
                    {/* deskripsi kategori */}
                    <div className="text-left flex-1">
                        <h3 className="text-2xl font-bold text-accent mb-3">Productivity</h3>
                        <p className="text-text opacity-90 mb-6">
                            Raih potensial maksimalmu dengan alat bantu fokus, perencanaan, dan pembentukan kebiasaan. Atur waktumu, buat jadwal belajar yang sistematis, dan bangun rutinitas positif dengan Habit Tracker.
                        </p>
                    </div>
                    {/* daftar tools */}
                    <div className="flex flex-col space-y-4 w-full md:w-auto md:min-w-[280px]">
                        <Link to="/pomodoro" className="flex items-center justify-start p-4 bg-background rounded-lg hover:bg-accent hover:text-white transition-all duration-300 group">
                            <Timer className="mr-3 h-6 w-6 text-accent group-hover:text-white transition-colors" />
                            <span className="font-semibold text-lg text-white">Pomodoro Timer</span>
                        </Link>
                        <Link to="/study-plan" className="flex items-center justify-start p-4 bg-background rounded-lg hover:bg-accent hover:text-white transition-all duration-300 group">
                            <NotebookText className="mr-3 h-6 w-6 text-accent group-hover:text-white transition-colors" />
                            <span className="font-semibold text-lg text-white">Study Plan Generator</span>
                        </Link>
                        <Link to="/habit-tracker" className="flex items-center justify-start p-4 bg-background rounded-lg hover:bg-accent hover:text-white transition-all duration-300 group">
                            <Target className="mr-3 h-6 w-6 text-accent group-hover:text-white transition-colors" />
                            <span className="font-semibold text-lg text-white">Habit Tracker</span>
                        </Link>
                    </div>
                </div>

                {/* --- KARTU FINANCIAL YANG DIPERBARUI --- */}
                <div className="bg-card rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="text-left flex-1">
                        <h3 className="text-2xl font-bold text-accent mb-3">Financial</h3>
                        <p className="text-text opacity-90 mb-6">
                            Ambil alih kendali keuangan pribadimu. Lacak setiap pemasukan dan pengeluaran, serta rencanakan masa depan finansialmu dengan alat bantu yang mudah digunakan.
                        </p>
                        {/* --- HANYA SATU TOMBOL --- */}
                        <Link to="/financial" className="inline-block bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                            Jelajahi Financial Tools
                        </Link>
                    </div>
                    {/* Gambar atau Ikon Ilustratif */}
                    <div className="hidden md:block">
                        <Landmark size={80} className="text-accent opacity-30" />
                    </div>
                </div>

                {/* Kartu Random Tools */}
                <div className="bg-card rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="text-left flex-1">
                        <h3 className="text-2xl font-bold text-accent mb-3">Random</h3>
                        <p className="text-text opacity-90 mb-6">
                            Butuh pemecah kebosanan atau sedikit inspirasi acak? Kumpulan tools ini siap membantumu menemukan ide-ide tak terduga.
                        </p>
                        <Link to="/random" className="inline-block bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                            Jelajahi Random Tools
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <Dices size={80} className="text-accent opacity-30" />
                    </div>
                </div>

                {/* --- KARTU BARU UNTUK SOCIAL MEDIA TOOLS --- */}
                <div className="bg-card rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="text-left flex-1">
                        <h3 className="text-2xl font-bold text-accent mb-3">Social Media</h3>
                        <p className="text-text opacity-90 mb-6">
                            Simpan konten favoritmu dari berbagai platform media sosial. Unduh video untuk ditonton nanti atau untuk keperluan kreatifmu dengan mudah.
                        </p>
                        <Link to="/social-tools" className="inline-block bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                            Buka Social Tools
                        </Link>
                    </div>
                    {/* Gambar atau Ikon Ilustratif */}
                    <div className="hidden md:block">
                        <Share2 size={80} className="text-accent opacity-30" />
                    </div>
                </div>
                {/* --- AKHIR KARTU BARU --- */}
            </div>
            {/* --- BAGIAN BARU UNTUK FEEDBACK --- */}
            <hr className="w-1/2 border-background my-16" />
            <FeedbackForm />
        </div>
    );
}