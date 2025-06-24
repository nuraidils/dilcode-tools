import { useState, useEffect, useCallback } from "react";

// tipe ini untuk mode timer
type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

// durasi dalam detik
const POMODORO_SECONDS = 25 * 60;
const SHORT_BREAK_SECONDS = 5 * 60;
const LONG_BREAK_SECONDS = 15 * 60;
const SESSIONS_FOR_LONG_BREAK = 4;

export default function PomodoroPage() {
    const [mode, setMode] = useState<Mode>('pomodoro');
    const [timeLeft, setTimeLeft] = useState(POMODORO_SECONDS);
    const [isActive, setIsActive] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);

    // logika inti

    // dibuat dengan usecallback agar tidak dibuat ulang setiap render, kecuali dependensinya berubah
    const switchMode = useCallback((newMode: Mode) => {
        setIsActive(false); // selalu jeda timer saat ganti mode
        setMode(newMode);
        if (newMode === 'pomodoro') {
            setTimeLeft(POMODORO_SECONDS);
        } else if (newMode === 'shortBreak') {
            setTimeLeft(SHORT_BREAK_SECONDS);
        } else if (newMode === 'longBreak') {
            setTimeLeft(LONG_BREAK_SECONDS);
            setSessionCount(0); // reset hitungan sesi setelah long break
        }
    }, []);

    // useeffect pertama untuk menjalankan interval timer
    useEffect(() => {
        let interval: number | undefined = undefined;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        // selalu bersihkan interval saat useeffevct dieksekusi ulang atau komponen unmount
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        };
    }, [isActive, timeLeft]);

    // useeffect kedua untuk menangani saat waktu habis
    useEffect(() => {
        const newTitle = `${formatTime(timeLeft)} - Pomodoro`
        if (timeLeft === 0) {
            // menggunakan document.title untuk notifikasi visual di tab browser
            document.title = "Waktu Habis!";
            // kondisi untuk sesi
            if (mode === 'pomodoro') {
                const newSessionCount = sessionCount + 1;
                setSessionCount(newSessionCount);
                if (newSessionCount % SESSIONS_FOR_LONG_BREAK === 0) {
                    switchMode('longBreak');
                } else {
                    switchMode('shortBreak');
                }
            } else { // jika selesai istirahat
                switchMode('pomodoro')
            }
        } else {
            document.title = newTitle;
        }
    }, [timeLeft, mode, switchMode, sessionCount]);

    // fungsi bantuan

    const toggleTimer = () => {
        // tidak bisa start jika waktu sudah 0
        if (timeLeft <= 0) return;
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        // Reset waktu sesuai mode yang sedang aktif
        switchMode(mode);
    };

    // format waktu dari detik menjadi MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // tampilan

    return (
        <div className="flex flex-col items-center justify-center text-center">
            {/* Tombol pindah mode */}
            <div className="flex space-x-2 md:space-x-4 mb-8 p-2 bg-card rounded-lg">
                <button onClick={() => switchMode('pomodoro')} className={`px-3 md:px-4 py-2 rounded-md transition-colors duration-300 ${mode === 'pomodoro' ? 'bg-accent' : 'hover:bg-background'}`}>Pomodoro</button>
                <button onClick={() => switchMode('shortBreak')} className={`px-3 md:px-4 py-2 rounded-md transition-colors duration-300 ${mode === 'shortBreak' ? 'bg-accent' : 'hover:bg-background'}`}>Short Break</button>
                <button onClick={() => switchMode('longBreak')} className={`px-3 md:px-4 py-2 rounded-md transition-colors duration-300 ${mode === 'longBreak' ? 'bg-accent' : 'hover:bg-background'}`}>Long Break</button>
            </div>

            {/* display waktu */}
            <div className="bg-card rounded-full w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-center mb-8 shadow-2xl">
                <h1 className="text-6xl md:text-8xl font-bold font-mono select-none text-text-highlight" style={{textShadow: '0 0 10px rgba(179, 102, 255, 0.5)'}}>
                    {formatTime(timeLeft)}
                </h1>
                <p className="text-text opacity-70 mt-2 tracking-widest">Sesi ke: {sessionCount + 1}</p>
            </div>

            {/* Tombol Kontrol */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                    onClick={toggleTimer} 
                    className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-10 md:py-4 md:px-12 rounded-lg text-xl md:text-2xl uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button 
                    onClick={resetTimer}
                    className="bg-card hover:bg-accent text-text font-bold py-3 px-10 md:py-4 md:px-12 rounded-lg text-xl md:text-2xl uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}