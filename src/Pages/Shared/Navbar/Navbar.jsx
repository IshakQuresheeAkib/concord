import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../../hook/useAuth'
import useAdmin from '../../../hook/useAdmin'
import { enqueueSnackbar } from 'notistack';
import Logo from '../../../Components/Logo/Logo';
import { LogoutOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Loader from '../../../Components/Loader/Loader'
import { motion, AnimatePresence } from "framer-motion";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
    const { user, logOut, loading } = useAuth()
    const [isAdmin] = useAdmin()
    const navigate = useNavigate();   
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dashboardLink = `/dashboard/${!isAdmin ? 'edit' : 'admin/admin-dashboard'}`;

    
    const navbarItems1 = [
        { id: 1, title: 'Home', link: '/'},
        { id: 2, title: 'Biodatas', link: '/biodatas'},
        { id: 4, title: 'FAQ', link: '/faq'},
        { id: 5, title: 'About Us', link: '/about-us'},
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setScrolled(currentScrollPos > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogin = () => {
        if (!user) {
            setMobileMenuOpen(false);
            return navigate('/login');
        }
        logOut().then(() => {
            setMobileMenuOpen(false);
            return enqueueSnackbar('Logged Out Successfully!', { variant: 'success' })
        })
    }

    return (
        <header className="fixed top-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-300">
            <motion.nav 
                layout
                className={`pointer-events-auto flex items-center justify-between w-full max-w-screen transition-all duration-500 ease-out ${
                    scrolled ? "bg-white/30 backdrop-blur-lg shadow-xl shadow-teal/10 py-1 px-6" : "bg-transparent py-2 px-2 lg:px-5"
                }`}
            >
                {/* Logo */}
                <Logo/>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-2 bg-white/10 backdrop-blur-3xl p-1.5 rounded-xl shadow-lg shadow-black/10">
                    {navbarItems1.map((item) => {
                        const isActive = location.pathname === item.link;
                        return (
                            <NavLink 
                                key={item.id} 
                                to={item.link}
                                className={`relative px-5 py-2.5 rounded-lg font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                    isActive ? "text-white bg-teal/75" : "text-black hover:text-primary"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-teal/75 backdrop-blur-3xl shadow-sm rounded-lg"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{item.title}</span>
                            </NavLink>
                        )
                    })}
                </div>

                {/* Right Actions - Sleek User Menu */}
                <UserDropdown 
                    user={user} 
                    loading={loading} 
                    handleLogin={handleLogin} 
                    dashboardLink={dashboardLink} 
                />

                {/* Mobile Menu Toggle*/}
                <div className="lg:hidden flex items-center">
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="relative z-10 flex items-center justify-center w-11 h-11 ml-2 rounded-lg bg-teal/5 border border-teal/20 hover:bg-teal/10 hover:border-teal/40 hover:shadow-[0_0_15px_rgba(0,128,128,0.3)] transition-all duration-300 focus:outline-none group overflow-hidden"
                        aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {/* Glowing effect inside button */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Lines container */}
                        <div className="relative w-6 h-[18px] flex flex-col justify-between">
                            <span className={`block w-full h-[2px] bg-primary rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_5px_rgba(0,128,128,0.5)] ${mobileMenuOpen ? 'rotate-[45deg] translate-y-[8px] bg-light-teal' : ''}`}></span>
                            <span className={`block w-full h-[2px] bg-primary rounded-full transition-all duration-300 ease-in-out shadow-[0_0_5px_rgba(0,128,128,0.5)] ${mobileMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}></span>
                            <span className={`block w-full h-[2px] bg-primary rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_5px_rgba(0,128,128,0.5)] ${mobileMenuOpen ? '-rotate-[45deg] -translate-y-[8px] bg-light-teal' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setMobileMenuOpen(false)}
                            aria-hidden="true"
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden cursor-pointer pointer-events-auto"
                        />
                        
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-screen w-[280px] sm:w-[320px] bg-white/95 backdrop-blur-md z-[90] lg:hidden shadow-[10px_0_40px_rgba(0,128,128,0.25)] border-r border-teal/20 flex flex-col font-Nunito overflow-x-hidden overflow-y-auto pointer-events-auto"
                        >
                            {/* Retro-futuristic Grid Background mapped to 'teal' */}
                            <div className="fixed inset-0 bg-[linear-gradient(to_right,#00808015_1px,transparent_1px),linear-gradient(to_bottom,#00808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>
                            
                            {/* Top Glowing Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-light-teal to-transparent opacity-70 shadow-[0_0_10px_rgba(0,196,196,0.8)] z-20"></div>

                            {/* Profile Section inside Drawer */}
                            {user && !loading && (
                                <div className="flex flex-col items-center space-y-3 group shrink-0 mt-8 relative z-10 px-6">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-light-teal to-teal rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                                        <img 
                                            src={user.photoURL} 
                                            alt="Avatar user"
                                            className="relative w-20 h-20 rounded-full object-cover ring-2 ring-teal/50 ring-offset-4 ring-offset-white transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="text-center relative">
                                        <h2 className="font-semibold text-base text-black/80 drop-shadow-sm line-clamp-1">
                                            {user.displayName}
                                        </h2>
                                        <p className="text-xs text-black/50 line-clamp-1">{user.email}</p>
                                    </div>
                                    
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="w-full pt-3 flex flex-col gap-2"
                                    >
                                        <NavLink
                                            to="/profile"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="relative overflow-hidden group flex items-center justify-center gap-3 bg-white/50 text-teal py-3 px-4 rounded-xl font-bold tracking-widest border border-teal/20 hover:bg-teal/10 transition-all duration-300"
                                        >
                                            <UserOutlined className="text-lg z-10" />
                                            <span className="relative z-10">MY PROFILE</span>
                                        </NavLink>

                                        <NavLink
                                            to={dashboardLink}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="relative overflow-hidden group flex items-center justify-center gap-3 bg-gradient-to-r from-teal to-dark-blue text-white py-3.5 px-4 rounded-xl font-bold tracking-widest shadow-[0_5px_20px_rgba(0,128,128,0.4)] border border-light-teal/30 active:scale-95 transition-all duration-300"
                                        >
                                            <div className="absolute inset-0 w-16 bg-white/20 transform skew-x-[20deg] -translate-x-full group-hover:translate-x-[600%] transition-transform duration-1000 ease-out z-0"></div>
                                            <AppstoreOutlined className="text-xl drop-shadow-lg z-10 animate-pulse" />
                                            <span className="relative z-10 glow-text">DASHBOARD</span>
                                        </NavLink>
                                        
                                        <button 
                                            onClick={handleLogin}
                                            className="w-full relative overflow-hidden group flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 px-4 rounded-xl font-bold tracking-wide border border-red-200 active:scale-95 transition-all duration-300"
                                        >
                                            <LogoutOutlined className="text-lg" />
                                            <span>SIGN OUT</span>
                                        </button>
                                    </motion.div>
                                </div>
                            )}

                            <div className={`flex flex-col space-y-2 px-6 relative z-10 ${user ? 'mt-6' : 'mt-10'}`}>
                                {navbarItems1.map((item, i) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.1 }}
                                    >
                                        <NavLink 
                                            to={item.link}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={({ isActive }) => `
                                                relative group flex items-center gap-3 py-3 px-4 font-bold text-sm md:text-base rounded-xl transition-all duration-300 overflow-hidden shrink-0
                                                ${isActive 
                                                    ? 'text-dark-blue bg-teal/10 border border-teal/30' 
                                                    : 'text-black/60 hover:text-teal hover:bg-gray/80'}
                                            `}
                                        >
                                            {/* Animated Hover Background */}
                                            <div className="absolute inset-0 w-0 bg-gradient-to-r from-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full -z-10"></div>
                                            
                                            {/* Left Accent Line */}
                                            <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-light-teal opacity-0 transform -translate-x-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 rounded-r-md"></div>

                                            <p className="tracking-wide group-hover:translate-x-1 transition-transform duration-300">{item.title}</p>
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom Actions Section */}
                            <div className="relative z-10 p-6 shrink-0 mt-auto bg-white/50 backdrop-blur-sm">
                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent -z-10 pointer-events-none"></div>
                                {loading ? (
                                    <div className="flex justify-center"><Loader width='28' height='true' /></div>
                                ) : (
                                    <button 
                                        onClick={handleLogin} 
                                        aria-label={user ? 'Log Out' : 'Log In'}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal to-light-teal hover:opacity-90 shadow-md hover:shadow-[0_0_20px_rgba(0,128,128,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
                                    >
                                        <LogoutOutlined className="text-lg transition-transform duration-300" />
                                        <span className="tracking-widest uppercase text-sm">
                                            {user ? 'Log Out' : 'Log In'}
                                        </span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;