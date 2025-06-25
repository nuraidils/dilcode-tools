import { useState } from "react";
import type { FormEvent } from "react";
import { useNotificationStore } from "../hooks/useNotificationStore";
import { Download, Youtube, Instagram, MessageSquare } from "lucide-react";

// Tipe data untuk hasil dari API kita
interface VideoInfo {
    platform: 'youtube' | 'tiktok' | 'instagram' | 'unknown';
    title: string;
    thumbnail: string;
    formats: any[];
}

// Komponen kecil untuk menampilkan ikon platform
const PlatformIcon = ({ platform }: { platform: VideoInfo['platform'] }) => {
    if (platform === 'youtube') return <Youtube className="inline-block mr-2" />;
    if (platform === 'instagram') return <Instagram className="inline-block mr-2" />;
    if (platform === 'tiktok') return <svg className="inline-block mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.01-1.58-.01-3.16 0-4.75-.01 2.58-.01 5.17 0 7.75 0 1.58.01 3.16 0 4.74a4.42 4.42 0 01-1.79 3.42c-1.12.9-2.43 1.25-3.8 1.15-1.29-.09-2.58-.4-3.8-1.03v-4.03c.83.37 1.7.64 2.6.79 1.44.24 2.88.24 4.32 0 1.13-.19 2.15-.69 2.99-1.58a3.3 3.3 0 001.2-2.52c.01-2.58.01-5.17 0-7.75v-1.1c-1.18.36-2.39.59-3.62.69-1.43.12-2.86.1-4.29-.01-1.14-.09-2.28-.4-3.36-1.01-1.06-.6-1.95-1.42-2.6-2.45-.64-1.02-1-2.2-1.01-3.42.01-2.58.01-5.17 0-7.75.01-1.93.8-3.8 2.2-5.11 1.39-1.3 3.33-2.02 5.42-2.02z"></path></svg>;
    return <MessageSquare className="inline-block mr-2" />;
};

export default function SocialDownloaderPage() {
    const [url, setUrl] = useState('');
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const showNotification = useNotificationStore(state => state.showNotification);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setVideoInfo(null);

        try {
            const response = await fetch('http://localhost:4000/api/video-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoURL: url }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            setVideoInfo(data);
            showNotification("Informasi video berhasil didapatkan!", "success");

        } catch (error: any) {
            showNotification(error.message || "Terjadi kesalahan", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-accent text-center">Social Media Downloader</h1>
            <p className="opacity-80 mb-8 text-center">Tempelkan link video di bawah untuk memulai. (Mendukung YouTube, TikTok, Instagram)</p>
            
            <form onSubmit={handleSubmit} className="w-full bg-card p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://www.sosmed.com/..."
                    className="flex-grow p-3 bg-background rounded-md border-2 border-transparent focus:border-accent focus:ring-0"
                    required
                />
                <button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {isLoading ? 'Memproses...' : <> Dapatkan Info</>}
                </button>
            </form>

            {videoInfo && (
                <div className="w-full mt-8 bg-card p-6 rounded-lg shadow-lg animate-fadeIn">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full sm:w-1/3 rounded-lg object-cover bg-background"/>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold break-all"><PlatformIcon platform={videoInfo.platform} /> {videoInfo.title}</h2>
                            <h3 className="text-lg font-semibold mt-4 mb-2 text-accent">Pilih Format untuk Diunduh:</h3>

                            {/* daftar format download */}
                            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-background">
                                {videoInfo.formats.length > 0 ? (
                                    videoInfo.formats.map((format, index) => (
                                        <li key={format.format_id || index} className="bg-background p-3 rounded-md flex justify-between items-center">
                                            <div>
                                                <span className="font-semibold">{format.qualityLabel}</span>
                                                <span className="text-sm opacity-70 ml-2">({format.container})</span>
                                            </div>
                                            <a 
                                                href={`http://localhost:4000/api/download?url=encodeURIComponent(format.url)&title={encodeURIComponent(videoInfo.title)}&amp;container=${format.container}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="bg-accent hover:bg-accent-hover text-white font-bold py-1 px-3 rounded-md text-sm flex items-center gap-1 transition-colors"
                                            >
                                                <Download size={16}/> Unduh
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-center opacity-70 p-4">
                                        Tidak ada format yang bisa diunduh untuk video ini.
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}