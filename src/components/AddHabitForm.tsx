// src/components/AddHabitForm.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Plus } from 'lucide-react';

// Mendefinisikan 'props' yang akan diterima komponen ini
interface AddHabitFormProps {
    // Ia harus menerima sebuah fungsi bernama 'addHabit'
    // yang menerima satu argumen 'name' (string) dan tidak mengembalikan apa-apa (void)
    addHabit: (name: string) => void;
}

export default function AddHabitForm({ addHabit }: AddHabitFormProps) {
    // State lokal hanya untuk mengelola input field
    const [habitName, setHabitName] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!habitName.trim()) {
            alert("Nama habit tidak boleh kosong!");
            return;
        }
        // Panggil fungsi yang dioper dari komponen induk
        addHabit(habitName);
        // Kosongkan kembali input field
        setHabitName('');
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-card p-6 rounded-lg shadow-lg flex items-center gap-4">
            <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Mau mulai kebiasaan apa hari ini?"
                className="flex-grow p-3 bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0 focus:outline-none transition-colors duration-300"
            />
            <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-white font-bold p-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center"
                aria-label="Tambah Habit"
            >
                <Plus size={24} />
            </button>
        </form>
    );
}