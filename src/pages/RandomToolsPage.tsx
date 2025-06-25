import GabutGenerator from '../components/GabutGenerator';

export default function RandomToolsPage() {
    return (
        <div className="flex flex-col items-center w-full space-y-12">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-accent">Random Tools</h1>
                <p className="mt-2 text-lg opacity-80">Kumpulan alat bantu acak untuk hiburan dan inspirasi.</p>
            </div>
            
            <GabutGenerator />

            {/* Nanti kita bisa tambahkan tool random lainnya di sini */}
        </div>
    );
}