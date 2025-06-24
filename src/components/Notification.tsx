interface NotificationProps {
    message: string;
    show: boolean;
}

export default function Notification({ message, show }: NotificationProps) {
    return (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            <div className="bg-accent text-white font-semibold px-6 py-3 rounded-lg shadow-lg">
                {message}
            </div>
        </div>
    );
}