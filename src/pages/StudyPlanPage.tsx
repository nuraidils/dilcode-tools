import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Download } from "lucide-react";

// tipe data untuk jadwal yang akan digenerate
type Schedule = {
    [key: string]: string[];
};

const DAYS_OF_WEEK = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function StudyPlanPage() {
    // state management
    const [subjectsInput, setSubjectsInput] = useState<string>("");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [hoursPerDay, setHoursPerDay] = useState<number>(1);
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [error, setError] = useState<string>("");

    // logic

    // logika untuk memuat jadwal saat komponen pertama kali render
    useEffect(() => {
        try {
            const savedPlan = localStorage.getItem('studyPlan');
            if (savedPlan) {
                setSchedule(JSON.parse(savedPlan));
            }
        } catch (error) {
            console.error("Gagal memuat jadwal dari localStorage:", error);
            // jika data rusah, hapus aja
            localStorage.removeItem('studyPlan');
        }
    }, []) // array dependensi kosong agar hanya berjalan sekali saat mount

    // Fungsi untuk menangani perubahan pada checkbox hari
    const handleDayChange = (day: string) => {
        setSelectedDays(prevDays => 
        prevDays.includes(day)
            ? prevDays.filter(d => d !== day) // Hapus hari jika sudah ada
            : [...prevDays, day] // Tambah hari jika belum ada
        );
    };

    // Fungsi utama yang dijalankan saat form di-submit
    const handleGeneratePlan = (e: FormEvent) => {
        e.preventDefault(); // Mencegah halaman refresh saat form submit
        setSchedule(null);
        // 1. Validasi Input
        const subjects = subjectsInput.split(',').map(s => s.trim()).filter(s => s !== "");
        if (subjects.length === 0) {
            setError("Mohon masukkan setidaknya satu mata pelajaran.");
            return;
        }
        if (selectedDays.length === 0) {
            setError("Mohon pilih setidaknya satu hari belajar.");
            return;
        }
        if (hoursPerDay <= 0) {
            setError("Jam belajar per hari harus lebih dari 0.");
            return;
        }

        // 2. Algoritma Generator (Round-Robin)
        setError(""); // Bersihkan error jika validasi berhasil
        const newSchedule: Schedule = {};
        let subjectIndex = 0;

        // Urutkan hari agar jadwal teratur
        const sortedSelectedDays = DAYS_OF_WEEK.filter(day => selectedDays.includes(day));

        sortedSelectedDays.forEach(day => {
            newSchedule[day] = [];
            for (let i = 0; i < hoursPerDay; i++) {
                newSchedule[day].push(subjects[subjectIndex % subjects.length]);
                subjectIndex++;
            }
        });

        // logika untuk simpan jadwal ke localStorage
        try {
            localStorage.setItem('studyPlan', JSON.stringify(newSchedule));
            setSchedule(newSchedule);
        } catch (error) {
            console.error("Gagal menyimpan jadwal ke localStorage:", error);
            setError("Gagal menyimpan jadwal, mungkin penyimpanan browser penuh.");
        }
    };

    // --- FUNGSI BARU: untuk menghapus jadwal ---
    const handleClearSchedule = () => {
        try {
            localStorage.removeItem('studyPlan');
            setSchedule(null);
            alert("Jadwal tersimpan berhasil dihapus!");
        } catch (error) {
            console.error("Gagal menghapus jadwal dari localStorage:", error);
        }
    };

    // fungsi untuk eksport ke file .txt
    const handleExportToText = () => {
        if (!schedule) return;
        let scheduleText = "Jadwal Belajarku - Dibuat oleh idil\n\n";
        for (const [day, subjects] of Object.entries(schedule)) {
            scheduleText += `--- ${day} ---\n`;
            subjects.forEach((subject, index) => {
                scheduleText += `${index + 1}. ${subject}\n`;
            });
            scheduleText += "\n";
        }
        const blob = new Blob([scheduleText], { type: 'text/plain;charsetutf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'jadwal-belajar.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-accent text-center">Study Plan Generator</h1>
            
            {/* FORM INPUT */}
            <form onSubmit={handleGeneratePlan} className="w-full max-w-2xl bg-card p-6 md:p-8 rounded-lg shadow-lg">
                {/* Input Mata Pelajaran */}
                <div className="mb-6">
                    <label htmlFor="subjects" className="block text-base text-white md:text-lg font-medium mb-2">Mata Pelajaran (pisahkan dengan koma)</label>
                    <input
                        type="text"
                        id="subjects"
                        value={subjectsInput}
                        onChange={(e) => setSubjectsInput(e.target.value)}
                        placeholder="Contoh: Matematika, Fisika, Biologi"
                        className="w-full p-3 bg-background rounded-md text-white border-2 border-transparent focus:border-accent focus:ring-0 focus:outline-none transition-colors duration-300"
                    />
                </div>
                
                {/* Pilihan Hari */}
                <div className="mb-6">
                    <label className="block text-base text-white md:text-lg font-medium mb-2">Hari Belajar</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                        {DAYS_OF_WEEK.map(day => (
                            <label key={day} className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer transition-colors duration-300 text-white text-sm md:text-base ${selectedDays.includes(day) ? 'bg-accent' : 'bg-background hover:bg-opacity-70'}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    onChange={() => handleDayChange(day)}
                                    className="h-4 w-4 md:h-5 md:w-5 rounded text-accent bg-transparent border-gray-600 focus:ring-accent"
                                />
                                <span>{day}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Input Jam Belajar */}
                <div className="mb-8">
                    <label htmlFor="hours" className="block text-base md:text-lg text-white font-medium mb-2">Jam Belajar per Hari</label>
                    <input
                        type="number"
                        id="hours"
                        value={hoursPerDay}
                        onChange={(e) => setHoursPerDay(Number(e.target.value))}
                        min="1"
                        className="w-full p-3 bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0 focus:outline-none transition-colors duration-300"
                    />
                </div>

                {/* Tombol Generate */}
                <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 md:py-4 rounded-lg text-lg md:text-xl uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Buat Jadwal Belajar
                </button>
            </form>
            
            {/* TAMPILAN HASIL */}
            {error && <p className="text-error mt-6 text-lg animate-pulse">{error}</p>}
            
            <div className="w-full max-w-4xl mt-12">
                {/* Tampilan Hasil */}
                {schedule ? (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl md:text-3xl text-white font-bold text-center">Jadwal Belajarmu!</h2>
                            <div className="flex space-x-2">
                                <button onClick={handleExportToText} title="Eksport ke Teks" className="bg-card hover:bg-accent text-white font-semibold p-2 rounded-lg transition-all duration-300">
                                    <Download size={20} />
                                </button>
                                <button onClick={handleClearSchedule} className="bg-error hover:opacity-80 text-white font-semibold py-2 px-3 md:px-4 rounded-lg transition-all duration-300 text-sm">
                                    Hapus
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(schedule).map(([day, subjectsForDay]) => (
                                <div key={day} className="bg-card rounded-lg shadow-lg p-6 flex flex-col">
                                    <h3 className="text-2xl text-white font-semibold mb-4 border-b-2 border-accent pb-2">{day}</h3>
                                    <ul className="space-y-3 flex-grow">
                                        {subjectsForDay.map((subject, index) => (
                                            <li key={index} className="bg-background text-white p-3 rounded-md flex items-center">
                                                <span className="bg-accent text-white rounded-full h-8 w-8 text-center leading-8 mr-4 font-bold flex-shrink-0">{index + 1}</span>
                                                <span>{subject}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center p-8 bg-card rounded-lg animate-fade-in">
                        <h2 className="text-2xl text-white font-bold mb-2">Mulai Rencanakan Belajarmu</h2>
                        <p className="opacity-70">Isi form di atas dan klik "Buat Jadwal" untuk melihat rencanamu di sini. Jadwal terakhirmu akan otomatis dimuat jika ada.</p>
                    </div>
                )}
            </div>
        </div>
    );
}