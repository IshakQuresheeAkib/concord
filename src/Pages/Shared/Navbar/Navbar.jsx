import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../../hook/useAuth'
import { enqueueSnackbar } from 'notistack';
import PrimaryBtn from '../../../Components/Button/PrimaryBtn'
import concord from '../../../assets/concord.png'
import { LogoutOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import Loader from '../../../Components/Loader/Loader'
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, logOut, loading } = useAuth()
    const navigate = useNavigate();   
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
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
                className={`pointer-events-auto flex items-center justify-between w-full max-w-screen  transition-all duration-500 ease-out ${
                    scrolled ? "bg-white/30 backdrop-blur-lg shadow-xl shadow-teal/10 py-1 px-6" : "bg-transparent py-2 px-2 lg:px-5"
                }`}
            >
                {/* Logo */}
                <button 
                    onClick={() => navigate('/')}
                    aria-label="Go to Homepage"
                    className="flex items-center hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-lg"
                >
                    <img loading="lazy" src={concord} alt="Concord Logo" className="w-36 lg:w-44 cursor-pointer" />
                </button>

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

                {/* Right Actions */}
                <div className="hidden lg:flex items-center space-x-4">
                    {loading ? (
                        <div className="w-16 h-16 flex items-center justify-center"><Loader width='28' height='true' /></div>
                    ) : user ? (
                        <UserDropdown photoURL={user?.photoURL} displayName={user?.displayName} handleLogin={handleLogin} />
                    ) : (
                        <button 
                            onClick={handleLogin} 
                            className="hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
                            aria-label="Log In"
                        >
                            <PrimaryBtn data='Log In' icon={<LogoutOutlined />} />
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center">
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={mobileMenuOpen}
                        className="p-2 ml-4 rounded-xl bg-gray/50 text-primary hover:bg-light-teal/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        {mobileMenuOpen ? <CloseOutlined className="text-xl" /> : <MenuOutlined className="text-xl" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-[80px] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-6 pointer-events-auto flex flex-col gap-4 origin-top z-40"
                    >
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
                                    className={({ isActive }) => `block px-4 py-3 rounded-xl font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                        isActive ? "bg-primary text-white shadow-lg shadow-teal/30" : "bg-gray/50 text-black hover:bg-light-teal/10 hover:text-primary"
                                    }`}
                                >
                                    {item.title}
                                </NavLink>
                            </motion.div>
                        ))}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray flex justify-center"
                        >
                            {loading ? (
                                <Loader width='28' height='true' />
                            ) : user ? (
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <UserDropdown photoURL={user?.photoURL} displayName={user?.displayName} handleLogin={handleLogin} />
                                    <button 
                                        onClick={handleLogin} 
                                        className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                                        aria-label="Log Out"
                                    >
                                        <PrimaryBtn data='Log Out' icon={<LogoutOutlined />} className="w-full flex justify-center" />
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" 
                                    onClick={handleLogin}
                                    aria-label="Log In"
                                >
                                    <PrimaryBtn data='Log In' className="w-full flex justify-center" icon={<LogoutOutlined />} />
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;