import { useForm, ValidationError } from '@formspree/react';
import { Send } from 'lucide-react';

export default function FeedbackForm() {
    // Ganti 'xxxxxxxx' dengan kode unik dari Formspree-mu
    const [state, handleSubmit] = useForm("mjkrpren"); 

    if (state.succeeded) {
        return (
            <div className="text-center">
                <h3 className="text-2xl font-bold text-accent">Makasih Yaa!</h3>
                <p className="opacity-80">Gua bakal pertimbangin itu. See You👋</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-2">Punya Masukan?</h2>
            <p className="text-center opacity-80 mb-6">Isi Form dibawah ini kalo lu ada kendala atau punya masukan der!</p>

            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-lg space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-white">Nama</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="w-full p-3 bg-background rounded-md border-2 border-transparent focus:border-accent"
                        required
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-error text-sm mt-1" />
                </div>
                <div>
                    <label htmlFor="message" className="block mb-1 font-medium text-white">Pesan</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full p-3 bg-background rounded-md border-2 border-transparent focus:border-accent"
                        required
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-error text-sm mt-1" />
                </div>
                <button type="submit" disabled={state.submitting} className="w-full bg-accent hover:bg-accent-hover font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50">
                    <Send size={18} />
                    Kirim Feedback
                </button>
            </form>
        </div>
    );
}