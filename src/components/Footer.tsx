export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-card text-text py-4 mt-12">
            <div className="container mx-auto px-6 text-center opacity-70">
                <p>&copy; {currentYear} DilCode.xyz. All Right Reserved.</p>
            </div>
        </footer>
    );
}