import { useNotificationStore } from "../hooks/useNotificationStore";

export default function Notification() {
    // Komponen ini sekarang "mendengarkan" perubahan dari store global
    const { show, message, type } = useNotificationStore();

    const typeClasses = {
        success: 'bg-success',
        error: 'bg-error',
        info: 'bg-accent',
    };

    return (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-500 text-center transition-all duration-300 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
            <div className={`${typeClasses[type]} text-white font-semibold px-6 py-3 rounded-lg shadow-lg`}>
                {message}
            </div>
        </div>
    );
}