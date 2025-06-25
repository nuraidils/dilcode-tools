import { useState, useEffect } from "react";
import AddHabitForm from "../components/AddHabitForm";
import HabitGrid from "../components/HabitGrid";

// definisikan tipe data
interface Habit {
    id: number;
    name: string;
    completions: Record<string, boolean>; //objek dengan key string dan value boolean
}

// data awal untuk contoh
const initialHabits: Habit[] = [
    { id: 1, name: 'Baca Buku 15 Menit', completions: {} },
    { id: 2, name: 'Olahraga Pagi', completions: {} },
];

export default function HabitTrackerPage() {
    // STATE BARU: Inisialisasi state dengan fungsi agar tidak sering akses localStorage
    const [habits, setHabits] = useState<Habit[]>(() => {
        try {
            const savedHabits = localStorage.getItem('habits');
            return savedHabits ? JSON.parse(savedHabits) : initialHabits;
        } catch (error) {
            console.error("Gagal memuat data habits:", error);
            return initialHabits;
        }
    });

    // EFEK BARU: Untuk menyimpan data setiap kali 'habits' berubah
    useEffect(() => {
        try {
            localStorage.setItem('habits', JSON.stringify(habits));
        } catch (error) {
            console.error("Gagal menyimpan data habits:", error);
        }
    }, [habits]); // <-- Dependensi ini memastikan efek berjalan saat 'habits' diubah

    const addHabit = (name: string) => {
        const newHabit: Habit = {
            id: Date.now(), // Gunakan timestamp sebagai ID unik
            name: name,
            completions: {},
        };
        setHabits(prevHabits => [...prevHabits, newHabit]);
    };

    const deleteHabit = (habitId: number) => {
        if (confirm("Apakah kamu yakin ingin menghapus kebiasaan ini?")) {
            setHabits(prevHabits => prevHabits.filter(h => h.id !== habitId));
        }
    };

    // --- LOGIKA UTAMA UNTUK INTERAKSI GRID ---
    const toggleHabitCompletion = (habitId: number, dateKey: string) => {
        setHabits(prevHabits =>
            prevHabits.map(habit => {
                if (habit.id === habitId) {
                    // Buat salinan dari habit dan objek completions-nya agar tidak mengubah state asli (immutability)
                    const newCompletions = { ...habit.completions };
                    // Toggle status untuk tanggal yang di-klik
                    newCompletions[dateKey] = !newCompletions[dateKey];
                    return { ...habit, completions: newCompletions };
                }
                return habit;
            })
        );
    };

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-accent text-center">Habit Tracker</h1>

            {/* Nanti di sini kita akan meletakkan komponen <AddHabitForm /> */}
            <div className="w-full max-w-4xl mb-8"> 
                <AddHabitForm addHabit={addHabit} />
            </div>

            {/* Ganti placeholder dengan komponen HabitGrid */}
            {habits.length > 0 ? (
                <HabitGrid 
                    habits={habits} 
                    toggleHabitCompletion={toggleHabitCompletion}
                    deleteHabit={deleteHabit}
                />
            ) : (
                <div className="w-full max-w-4xl p-8 bg-card rounded-lg text-center">
                    <h3 className="text-xl font-bold">Belum Ada Kebiasaan</h3>
                    <p className="opacity-70 mt-2">Ayo mulai bangun kebiasaan baikmu dengan menambahkannya di atas!</p>
                </div>
            )}
        </div>
    );
}