    interface DayCellProps {
    isCompleted: boolean | undefined;
    onClick: () => void;
}

export default function DayCell({ isCompleted, onClick }: DayCellProps) {
    const cellColor = isCompleted ? 'bg-accent' : 'bg-background hover:border-accent';

    return (
        <div
            onClick={onClick}
            // Ukuran disamakan dan dibuat responsif
            className={`w-8 h-8 rounded-md cursor-pointer border-2 border-transparent transition-all duration-200 ${cellColor}`}
            aria-label={`Mark habit as ${isCompleted ? 'incomplete' : 'complete'}`}
        />
    );
}