import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { X, Menu, ChevronDown } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductivityOpen, setIsProductivityOpen] = useState(false);

    // untuk menutup semua menu saat link di klik
    const closeAllMenus = () => {
        setIsMenuOpen(false);
        setIsProductivityOpen(false);
    };

    return (
        <header className="bg-card text-white shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* logo */}
                <NavLink to="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
                    DilCode<span className="text-accent">.</span>Tools
                </NavLink>

                {/* nav dekstop */}
                <ul className="hidden md:flex items center space-x-8 text-lg">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => 
                                `pb-1 transition-colors duration-300 ${isActive ? 'text-accent border-b-2 border-accent' : 'hover:text-accent'}`
                            }
                        > 
                            Home
                        </NavLink>
                    </li>
                    {/* dropdown dekstop */}
                    <li className="group relative">
                        <button className="flex items-center space-x-1 pb-1 hover:text-accent transition-colors duration-300">
                            <span>Productivity</span>
                            <svg className="w-4 h-4 fill-current transform transition-transform duration-300 group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                            <Link to="/pomodoro" className="block px-4 py-3 hover:bg-background hover:text-accent rounded-t-lg transition-all duration-300">Pomodoro Timer</Link>
                            <Link to="/study-plan" className="block px-4 py-3 hover:bg-background hover:text-accent rounded-b-lg transition-all duration-300">Study Plan Generator</Link>
                        </div>
                    </li>
                </ul>

                {/* tombol humberger buat hp */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* menu mobile */}
            <div className={`md:hidden absolute w-full left-0 bg-card rounded-b-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <ul className="flex flex-col px-6 py-2">
                    <li className="border-b border-background">
                        <NavLink to="/" onClick={closeAllMenus} className="block py-4 text-lg hover:text-accent">Home</NavLink>
                    </li>
                    
                    <li className="border-b border-background">
                        <button onClick={() => setIsProductivityOpen(!isProductivityOpen)} className="w-full flex justify-between items-center py-4 text-lg hover:text-accent">
                            <span>Productivity</span>
                            <ChevronDown className={`transition-transform duration-300 ${isProductivityOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {/* Dropdown Mobile */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isProductivityOpen ? 'max-h-48' : 'max-h-0'}`}>
                            <ul className="pl-4 pt-2 pb-2 space-y-2">
                                <li><NavLink to="/pomodoro" onClick={closeAllMenus} className="block py-2 text-base opacity-80 hover:opacity-100 hover:text-accent">Pomodoro Timer</NavLink></li>
                                <li><NavLink to="/study-plan" onClick={closeAllMenus} className="block py-2 text-base opacity-80 hover:opacity-100 hover:text-accent">Study Plan Generator</NavLink></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
}