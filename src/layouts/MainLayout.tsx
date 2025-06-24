import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-background text-text flex flex-col font-montserrat">
            <Header />
            <main className="container mx-auto px-6 py-8 flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}