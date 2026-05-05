import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Dashboard.css';
import '../../Shared/Navbar/navbar.css';
import DashboardMenu from "./DashboardMenu";
import concord from '../../../assets/concord.png';

const Dashboard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close menu when route changes on mobile
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close menu when pressing escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMobileMenuOpen]);

    return (
        <div className="font-Nunito antialiased bg-gray/30 h-[100dvh] w-full overflow-hidden flex flex-col lg:flex-row relative">
            
            {/* Mobile Header - Unified with Site Header */}
            <header className="lg:hidden w-full h-[70px] bg-white/50 backdrop-blur-2xl border-b border-teal/10 z-[100] relative flex items-center justify-between px-4 sm:px-6 shadow-xl shadow-teal/5 transition-all duration-500 ease-out">
                {/* Header Background Grid & Glow limited opacity for cleaner look like main site */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00808008_1px,transparent_1px),linear-gradient(to_bottom,#00808008_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal to-transparent opacity-20 shadow-[0_0_5px_rgba(0,128,128,0.2)]"></div>
                
                {/* Site Logo */}
                <div className="relative z-10 flex items-center">
                   <button 
                       onClick={() => navigate('/')}
                       aria-label="Go to Homepage"
                       className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg flex items-center"
                   >
                       <img loading="lazy" src={concord} alt="Concord Logo" className="w-[124px] sm:w-[145px] hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
                   </button>
                </div>

                {/* Animated Retro-Futuristic Hamburger Button */}
                <button 
                    onClick={toggleMenu}
                    className="relative z-10 flex items-center justify-center w-11 h-11 rounded-lg bg-teal/5 border border-teal/30 hover:bg-teal/10 hover:border-teal/50 hover:shadow-[0_0_15px_rgba(0,128,128,0.4)] transition-all duration-300 focus:outline-none group overflow-hidden"
                    aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {/* Glowing effect inside button */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Lines container */}
                    <div className="relative w-6 h-[18px] flex flex-col justify-between">
                        <span className={`block w-full h-[2px] bg-teal rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_5px_rgba(0,128,128,0.6)] ${isMobileMenuOpen ? 'rotate-[45deg] translate-y-[8px] bg-light-teal' : ''}`}></span>
                        <span className={`block w-full h-[2px] bg-teal rounded-full transition-all duration-300 ease-in-out shadow-[0_0_5px_rgba(0,128,128,0.6)] ${isMobileMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}></span>
                        <span className={`block w-full h-[2px] bg-teal rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_5px_rgba(0,128,128,0.6)] ${isMobileMenuOpen ? '-rotate-[45deg] -translate-y-[8px] bg-light-teal' : ''}`}></span>
                    </div>
                </button>
            </header>

            {/* Desktop Sidebar (hidden on mobile) */}
            <aside className="hidden lg:block w-72 lg:w-80 shrink-0 h-full border-r border-teal/20 bg-white/95 z-20 shadow-[4px_0_24px_rgba(0,128,128,0.05)]">
                <DashboardMenu />
            </aside>

            {/* Mobile Drawer Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden={!isMobileMenuOpen}
            ></div>

            {/* Mobile Drawer Navigation */}
            <aside 
                className={`fixed top-16 left-0 h-[calc(100dvh-4rem)] w-[280px] sm:w-[320px] bg-transparent z-[90] lg:hidden transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${isMobileMenuOpen ? 'translate-x-0 shadow-[10px_0_40px_rgba(0,128,128,0.25)]' : '-translate-x-full'}`}
            >
                <DashboardMenu />
            </aside>

            {/* Main scrollable content area */}
            <main className="flex-1 h-[calc(100dvh-4rem)] lg:h-[100dvh] overflow-y-auto relative scroll-smooth flex flex-col bg-gray/30 w-full z-10 transition-all duration-500">
                {/* Ambient glow in main area on mobile */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-teal/5 to-transparent -z-10 pointer-events-none lg:hidden"></div>
                <div className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-screen-2xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )}
export default Dashboard;