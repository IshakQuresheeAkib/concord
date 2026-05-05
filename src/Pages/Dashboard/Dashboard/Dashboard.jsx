import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import './Dashboard.css';
import '../../Shared/Navbar/navbar.css';
import DashboardMenu from "./DashboardMenu";
import Logo from "../../../Components/Logo/Logo";
import { MenuToggleIcon, SharedMobileMenu } from '../../Shared/Navbar/MobileMenu';
import useScrolled from "../../../hooks/useScrolled";


const Dashboard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const {scrolled, ref} = useScrolled();

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
            <header className="lg:hidden fixed top-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-300">
                <motion.nav 
                    layout
                    layoutRoot
                    className={`pointer-events-auto flex items-center justify-between w-full max-w-screen transition-all duration-500 ease-out ${
                        scrolled ? "bg-white/30 backdrop-blur-lg shadow-xl shadow-teal/10 py-1 px-6" : "bg-transparent py-2 px-2 lg:px-5"
                    }`}
                >
                    <Logo/>
                    <div className="lg:hidden">
                        <MenuToggleIcon isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </div>
                </motion.nav>
            </header>

            <aside className="hidden lg:block w-72 lg:w-1/5 shrink-0 h-full z-20 shadow-md">
                <DashboardMenu />
            </aside>

            <SharedMobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}>
                <DashboardMenu inDrawer={true} />
            </SharedMobileMenu>

            <main ref={ref} className="flex-1 h-[calc(100dvh-4rem)] lg:h-[100dvh] overflow-y-auto relative scroll-smooth flex flex-col bg-gray/30 w-full z-10 transition-all duration-500">
                {/* Ambient glow in main area on mobile */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-teal/5 to-transparent -z-10 pointer-events-none lg:hidden"></div>
                <div className="flex-1 pt-28 md:pt-28 md:p-6 lg:pt-6 lg:p-8 w-full max-w-screen-2xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )}
export default Dashboard;