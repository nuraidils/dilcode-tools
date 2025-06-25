import { useState, useEffect, useCallback, useRef } from "react";
import type { FormEvent } from "react";
import { useNotificationStore } from "../hooks/useNotificationStore";
import { formatTime } from "../utils/formatters";

// tipe ini untuk mode timer
type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

export default function PomodoroPage() {
    // state utama
    const [mode, setMode] = useState<Mode>('pomodoro');
    const [isActive, setIsActive] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);

    // state untuk menyimpan durasi dalam menit
    const [times, setTimes] = useState({
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    });

    //untuk menyimpan jumlah sesi kustom
    const [sessionsForLongBreak, setSessionsForLongBreak] = useState(4);

    // state untuk menyimpan waktu saat ini dalam detik
    const [timeLeft, setTimeLeft] = useState(times.pomodoro * 60);

    // state untuk input form pengaturan
    const [settingsInput, setSettingsInput] = useState({ ...times, sessions: sessionsForLongBreak });

    // Panggil fungsi notifikasi dari store global
    const showNotification = useNotificationStore(state => state.showNotification);

    // --- REF BARU UNTUK ELEMEN AUDIO ---
    const audioRef = useRef<HTMLAudioElement>(null);

    // logika dan fungsi bantuan

    // dibuat dengan usecallback agar tidak dibuat ulang setiap render, kecuali dependensinya berubah
    const switchMode = useCallback((newMode: Mode) => {
        setIsActive(false); // selalu jeda timer saat ganti mode
        setMode(newMode);
        if (newMode === 'pomodoro') {
            setTimeLeft(times.pomodoro * 60);
        } else if (newMode === 'shortBreak') {
            setTimeLeft(times.shortBreak * 60);
        } else if (newMode === 'longBreak') {
            setTimeLeft(times.longBreak * 60);
            setSessionCount(0); // reset hitungan sesi setelah long break
        }
    }, [times]); // times menjadi dependensi

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
        if (timeLeft === 0 && isActive) {
            let nextMode: Mode = 'pomodoro';
            let notificationMessage = '';
            audioRef.current?.play();
            // kondisi untuk sesi
            if (mode === 'pomodoro') {
                const newSessionCount = sessionCount + 1;
                setSessionCount(newSessionCount);
                if (newSessionCount % sessionsForLongBreak === 0) {
                    nextMode = 'longBreak';
                    notificationMessage = "Waktunya istirahat panjang!";
                } else {
                    nextMode = 'shortBreak';
                    notificationMessage = "Waktunya istirahat singkat!";
                }
            } else { // jika selesai istirahat
                nextMode = 'pomodoro';
                notificationMessage = "Kembali fokus!";
            }
            showNotification(notificationMessage, 'info');
            switchMode(nextMode);
            setIsActive(true);
        }
    }, [timeLeft, mode, switchMode, sessionCount, isActive, sessionsForLongBreak]);

    const toggleTimer = () => { if (timeLeft > 0) setIsActive(!isActive); };
    const resetTimer = () => switchMode(mode);

    // fungsi untuk menerapkan pengaturan
    const handleSettingsSubmit = (e: FormEvent) => {
        e.preventDefault();
        setTimes({
            pomodoro: settingsInput.pomodoro,
            shortBreak: settingsInput.shortBreak,
            longBreak: settingsInput.longBreak,
        });
        setSessionsForLongBreak(settingsInput.sessions);
        setIsActive(false);
        // langsung update timer ke durasi pomodoro baru
        setTimeLeft(settingsInput.pomodoro * 60);
        showNotification("Pengaturan berhasil disimpan!", 'success');
    };

    // tampilan

    return (
        <div className="flex flex-col items-center justify-center text-center w-full">
            {/* --- TAMBAHKAN ELEMEN AUDIO DI SINI (tidak terlihat oleh pengguna) --- */}
            <audio ref={audioRef} src="/audio/notification.mp3" preload="auto"></audio>
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

            {/* form pengaturan */}
            <form onSubmit={handleSettingsSubmit} className="mt-10 w-full max-w-lg bg-card p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-accent">Pengaturan Waktu (Menit)</h3>
                {/* Kontainer dibuat responsif */}
                <div className="flex flex-col md:flex-row md:justify-around md:items-center space-y-4 md:space-y-0 md:space-x-2">
                    {/* pengaturan waktu */}
                    <div className="flex flex-col items-center">
                        <label htmlFor="pomodoro" className="mb-1 text-white text-sm">Fokus (Menit)</label>
                        <input type="number" id="pomodoro" min="1" value={settingsInput.pomodoro} onChange={(e) => setSettingsInput({...settingsInput, pomodoro: Number(e.target.value)})} className="w-full md:w-24 p-2 text-center bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0" />
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="shortBreak" className="mb-1 text-white text-sm">Istirahat Pendek</label>
                        <input type="number" id="shortBreak" min="1" value={settingsInput.shortBreak} onChange={(e) => setSettingsInput({...settingsInput, shortBreak: Number(e.target.value)})} className="w-full md:w-24 p-2 text-center bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0" />
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="longBreak" className="mb-1 text-white text-sm">Istirahat Panjang</label>
                        <input type="number" id="longBreak" min="1" value={settingsInput.longBreak} onChange={(e) => setSettingsInput({...settingsInput, longBreak: Number(e.target.value)})} className="w-full md:w-24 p-2 text-center bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0" />
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="sessions" className="mb-1 text-white text-sm">Sesi per Siklus</label>
                        <input type="number" id="sessions" min="1" value={settingsInput.sessions} onChange={(e) => setSettingsInput({...settingsInput, sessions: Number(e.target.value)})} className="w-full md:w-24 p-2 text-center bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0" />
                    </div>
                </div>
                <button type="submit" className="w-full mt-6 bg-accent hover:bg-accent-hover text-white font-semibold py-2 rounded-lg transition-all duration-300">
                    Terapkan
                </button>
            </form>
        </div>
    )
}