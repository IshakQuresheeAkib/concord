import { NavLink, useNavigate } from "react-router-dom";
import useAuth from '../../../hooks/useAuth'
import useAdmin from '../../../hooks/useAdmin'
import { enqueueSnackbar } from 'notistack';
import Logo from '../../../Components/Logo/Logo';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserDropdown from "./UserDropdown";
import { navItems } from '../../../utils/constants';
import { MenuToggleIcon, SharedMobileMenu } from './MobileMenu';
import { LogoutOutlined, AppstoreOutlined, LoginOutlined } from "@ant-design/icons";
import PrimaryBtn from "../../../Components/Button/PrimaryBtn";
import DesktopNav from "./DesktopNav";
import useScrolled from "../../../hooks/useScrolled";

const Navbar = () => {
    const { user, logOut, loading } = useAuth()
    const [isAdmin] = useAdmin()
    const navigate = useNavigate();
    const {scrolled} = useScrolled();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const dashboardLink = `/dashboard/${!isAdmin ? 'edit' : 'admin/admin-dashboard'}`;

    const handleLogin = () => {
        console.log('handleLogin called, user: ', user);
        if (!user) {
            setIsMobileMenuOpen(false);
            return navigate('/login');
        }
        logOut().then(() => {
            setIsMobileMenuOpen(false);
            return enqueueSnackbar('Logged Out Successfully!', { variant: 'success' })
        })
    }

    // Prevent body scroll when mobile menu is open
        useEffect(() => {
            if (isMobileMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, [isMobileMenuOpen]);

    return (
        <header className="fixed top-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-300">
            <motion.nav 
                layout
                layoutRoot
                className={`pointer-events-auto flex items-center justify-between w-full max-w-screen transition-all duration-500 ease-out ${
                    scrolled ? "bg-white/30 backdrop-blur-lg shadow-xl shadow-teal/10 py-1 px-6" : "bg-transparent py-2 px-2 lg:px-5"
                }`}
            >
                {/* Logo */}
                <Logo/>

                {/* Desktop Navigation */}
                <DesktopNav />

                <UserDropdown user={user} loading={loading} 
                    handleLogin={handleLogin} 
                    dashboardLink={dashboardLink} 
                />

                <div className="lg:hidden">
                    <MenuToggleIcon isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <SharedMobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}>
                <div className="flex flex-col items-center space-y-3 group shrink-0 relative z-10 px-6">
                    {user && !loading ? (
                        <>
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-light-teal to-teal rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                                <img 
                                    src={user.photoURL} 
                                    alt="Avatar user"
                                    className="relative w-20 h-20 rounded-full object-cover ring-2 ring-teal/50 ring-offset-4 ring-offset-white transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="text-center relative">
                                <h2 className="font-semibold text-base text-black/80 drop-shadow-sm line-clamp-1">{user.displayName}</h2>
                                <p className="text-xs text-black/50 line-clamp-1">{user.email}</p>
                            </div>                           
                        </>
                    ) : null}
                </div>

                <div className={`flex flex-col space-y-2 px-2 relative z-10 overflow-y-auto custom-scrollbar flex-1 pb-24`}>
                    {navItems.map((item) => (
                        <NavLink key={item.id}
                                to={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `relative group flex items-center gap-3 py-3 px-4 font-bold text-sm md:text-base rounded-xl transition-all duration-300 overflow-hidden shrink-0 ${isActive ? 'text-dark-blue bg-teal/10 border border-teal/30' : 'text-black/60 hover:text-teal hover:bg-gray/80'}`}
                            >
                                <div className="absolute inset-0 w-0 bg-gradient-to-r from-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full -z-10"></div>
                                <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-light-teal opacity-0 transform -translate-x-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 rounded-r-md"></div>
                                <p className="tracking-wide group-hover:translate-x-1 transition-transform duration-300">{item.title}</p>
                            </NavLink>
                    ))}
                    <div className="flex flex-col space-y-3">               
                    
                    {
                    user && (
                            
                    <div>
                        <PrimaryBtn onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate(dashboardLink);
                    }} data={'Dashboard'} icon={<AppstoreOutlined />}></PrimaryBtn> 

                    </div>
                    )
                    }
                    <div onClick={handleLogin}>
                        <PrimaryBtn data={`${user ? 'Logout' : 'Login'}`} icon={user ? <LogoutOutlined /> : <LoginOutlined />}></PrimaryBtn>
                    </div>
                </div>
                </div>
            </SharedMobileMenu>
        </header>
    );
};

export default Navbar;