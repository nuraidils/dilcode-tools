import { format } from 'date-fns';
import DayCell from './DayCell';
import { Trash2 } from 'lucide-react';

// Impor tipe 'Habit' dari halaman utama jika perlu
interface Habit {
    id: number;
    name: string;
    completions: Record<string, boolean>;
}

interface HabitRowProps {
    habit: Habit;
    daysInMonth: Date[];
    toggleHabitCompletion: (habitId: number, date: string) => void;
    deleteHabit: (habitId: number) => void;
}

export default function HabitRow({ habit, daysInMonth, toggleHabitCompletion, deleteHabit }: HabitRowProps) {
    return (
        <div className="grid grid-flow-col auto-cols-max gap-1 items-center">
            {/* Kolom Nama Habit */}
            <div className="w-40 md:w-48 flex items-center sticky left-0 bg-card pr-2 z-10">
                <button onClick={() => deleteHabit(habit.id)} title="Hapus Habit" className="p-2 text-text/50 hover:text-error rounded-md transition-colors">
                    <Trash2 size={20} />
                </button>
                <span className="font-semibold truncate ml-2">{habit.name}</span>
            </div>

            {/* Kolom Sel Hari */}
            {daysInMonth.map(date => {
                const dateKey = format(date, 'yyyy-MM-dd');
                const isCompleted = habit.completions[dateKey];
                return (
                    <div key={dateKey} className="w-10 flex justify-center">
                        <DayCell
                            isCompleted={isCompleted}
                            onClick={() => toggleHabitCompletion(habit.id, dateKey)}
                        />
                    </div>
                );
            })}
        </div>
    );
}