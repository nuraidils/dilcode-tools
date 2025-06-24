import { Link } from "react-router-dom";
import { Timer, NotebookText } from "lucide-react";

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
            <div className="w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-8 text-left text-white">Kategori Tools</h2>
                <div className="bg-card rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
                    {/* deskripsi kategori */}
                    <div className="text-left flex-1">
                        <h3 className="text-2xl font-bold text-accent mb-3">Productivity</h3>
                        <p className="text-text opacity-90 mb-6">
                            Raih potensial maksimalmu dengan alat bantu fokus dan perencanaan. Atur waktumu dengan presisi menggunakan Pomodoro Timer dan buat jadwal belajar yang sistematis untuk menaklukkan semua target akademismu.
                        </p>
                    </div>
                    {/* daftar tools */}
                    <div className="flex flex-col space-y-4 w-full md:w-auto">
                        <Link to="/pomodoro" className="flex items-center justify-center text-center p-4 bg-background rounded-lg hover:bg-accent hover:text-white transition-all duration-300 group w-full">
                            <Timer className="mr-3 h-6 w-6 text-accent group-hover:text-white" />
                            <span className="font-semibold text-lg text-white">Pomodoro Timer</span>
                        </Link>
                        <Link to="/study-plan" className="flex items-center justify-center text-center p-4 bg-background rounded-lg hover:bg-accent hover:text-white transition-all duration-300 group w-full">
                            <NotebookText className="mr-3 h-6 w-6 text-accent group-hover:text-white" />
                            <span className="font-semibold text-lg text-white">Study Plan Generator</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}