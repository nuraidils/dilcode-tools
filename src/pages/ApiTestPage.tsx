import { useState } from 'react';
import { useNotificationStore } from '../hooks/useNotificationStore';

export default function ApiTestPage() {
    const [serverMessage, setServerMessage] = useState<string>('Belum ada pesan dari server.');
    const [isLoading, setIsLoading] = useState(false);
    const showNotification = useNotificationStore(state => state.showNotification);

    const callApi = async () => {
        setIsLoading(true);
        try {
            // Buat permintaan ke server back-end kita
            const response = await fetch('http://localhost:4000/api/video-info');

            if (!response.ok) {
                // Tangani jika server merespons dengan error (misal: 404, 500)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Ubah respons menjadi JSON
            const data = await response.json();

            // Update state dengan pesan dari server
            setServerMessage(data.message);
            showNotification("Berhasil terhubung ke server!", "success");

        } catch (error) {
            console.error("Gagal memanggil API:", error);
            setServerMessage("Gagal terhubung ke server. Pastikan server back-end sudah berjalan.");
            showNotification("Gagal terhubung ke server!", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-accent mb-4">Tes Koneksi API</h1>
            <p className="opacity-80 mb-8">Halaman ini digunakan untuk menguji koneksi antara aplikasi React (Front-end) dengan server Express (Back-end).</p>

            <div className="bg-card p-8 rounded-lg">
                <h2 className="text-lg text-white font-semibold mb-2">Respons dari Server:</h2>
                <div className="bg-background p-4 rounded-md min-h-[60px] flex items-center justify-center">
                    <p className="font-mono text-text-highlight">{serverMessage}</p>
                </div>
                <button
                    onClick={callApi}
                    disabled={isLoading}
                    className="mt-6 w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                >
                    {isLoading ? 'Menghubungi Server...' : 'Panggil API'}
                </button>
            </div>
        </div>
    );
}