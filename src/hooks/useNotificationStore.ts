import { create } from 'zustand';

// Definisikan tipe untuk state dan action kita
interface NotificationState {
    message: string;
    type: 'success' | 'error' | 'info';
    show: boolean;
    showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    message: '',
    type: 'info',
    show: false,
    showNotification: (message, type = 'info') => {
        set({ message, type, show: true });
        // Otomatis sembunyikan setelah 3 detik
        setTimeout(() => {
            set({ show: false });
        }, 3000);
    },
}));