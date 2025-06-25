import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { id } from 'date-fns/locale';
import HabitRow from './HabitRow';

// Impor tipe 'Habit'
interface Habit {
    id: number;
    name: string;
    completions: Record<string, boolean>;
}

interface HabitGridProps {
    habits: Habit[];
    toggleHabitCompletion: (habitId: number, date: string) => void;
    deleteHabit: (habitId: number) => void;
}

export default function HabitGrid({ habits, toggleHabitCompletion, deleteHabit }: HabitGridProps) {
    // Logika untuk mendapatkan semua hari di bulan ini
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const daysInMonth = eachDayOfInterval({ start, end });
    const monthName = format(today, 'MMMM yyyy', { locale: id }); // Format nama bulan

    return (
        <div className="w-full bg-card p-4 md:p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-left mb-4 capitalize">{monthName}</h3>
            {/* Kontainer overflow kita bungkus lagi untuk masking */}
            <div className="overflow-x-auto rounded-lg scrollbar-thin scrollbar-thumb-accent scrollbar-track-background scrollbar-thumb-rounded-full">
                <div className="inline-block min-w-full align-middle">
                    <div className="grid auto-cols-max grid-flow-col gap-x-1">
                        {/* Header Nama Habit */}
                        <div className="w-40 md:w-48 text-left font-bold text-accent sticky left-0 bg-card z-10 p-2">KEBIASAAN</div>

                        {/* Header Tanggal */}
                        {daysInMonth.map(day => (
                            <div key={day.toString()} className="w-10 text-center font-bold text-sm text-accent/80 flex flex-col items-center p-2">
                                <span className="text-xs">{format(day, 'E', { locale: id })}</span>
                                <span>{format(day, 'd')}</span>
                            </div>
                        ))}
                    </div>

                    <hr className="my-2 border-background" />

                    {/* Baris untuk setiap Habit */}
                    <div className="space-y-2">
                        {habits.map(habit => (
                            <HabitRow
                                key={habit.id}
                                habit={habit}
                                daysInMonth={daysInMonth}
                                toggleHabitCompletion={toggleHabitCompletion}
                                deleteHabit={deleteHabit}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}