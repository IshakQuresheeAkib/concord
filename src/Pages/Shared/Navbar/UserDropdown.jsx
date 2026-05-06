import { Link, NavLink } from "react-router-dom";
import { LogoutOutlined, AppstoreOutlined, LoginOutlined } from "@ant-design/icons";
import { useState } from "react";
import Loader from '../../../Components/Loader/Loader';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import bottomArrowUrl from '../../../assets/bottom-arrow.lottie?url';
import { motion, AnimatePresence } from "framer-motion";
import PrimaryBtn from "../../../Components/Button/PrimaryBtn";

const UserDropdown = ({ user, loading, handleLogin, dashboardLink }) => {
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

    if (loading) {
        return <div className="w-12 h-12 flex items-center justify-center"><Loader width='24' height='true' /></div>;
    }

    return (            
        <div className="hidden lg:flex items-center relative z-50">
            {user ? (
                <button 
                    onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                    className={`relative pl-1 py-1 pr-9 mix-blend-multiply bg-white/10 backdrop-blur-3xl shadow-black/10 border border-black/5 shadow-inner rounded-full group focus:outline-none`}
                    aria-label="Open User Menu"
                >
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-coral-500 to-coral rounded-full blur-md opacity-50 group-hover:opacity-30 transition duration-1000 animate-pulse"></div>
                        <img src={user.photoURL} alt="Avatar" className="w-[55px] h-[55px] rounded-full object-cover relative z-10 shadow-md group-hover:scale-105 transition-transform duration-300" 
                        />
                    </div>
                    <div className={`w-[100px] absolute bottom-1/2 translate-y-1/2 left-6 transition-transform duration-300 ease-in-out ${desktopMenuOpen ? 'rotate-180' : 'g                                                                                                  roup-hover:translate-y-0.5'}`}>
                    <DotLottieReact 
                        src={bottomArrowUrl} 
                        loop 
                        autoplay
                    />
                    </div>
                </button>
            ) : (
                <Link to="/login">
                    <PrimaryBtn 
                onClick={() => {
                    handleLogin();
                    setDesktopMenuOpen(false);
                }} data={'Login'} icon={<LoginOutlined />}></PrimaryBtn>
                </Link>
            )}                        
            {/* Dropdown Menu */}
            <AnimatePresence>
                {desktopMenuOpen && (
                    <>
                        {/* Invisible overlay to catch clicks outside */}
                        <div 
                            className="fixed inset-0 z-40 cursor-default" 
                            onClick={() => setDesktopMenuOpen(false)}
                        ></div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                            className="absolute top-[calc(100%+5px)] right-0 w-64 bg-white/100 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(224,120,86,0.3)] rounded-2xl mix-blend-multiply p-2 z-50 overflow-hidden"
                        >
                            {/* Design Accent inside menu */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 blur-3xl -z-10 rounded-full"></div>
                            <div className="flex flex-col">
                                    <div className="px-4 py-3 mb-2 border-b border-gray/80">
                                        <p className="text-sm font-bold text-black/80 truncate">{user.displayName}</p>
                                        <p className="text-xs text-black/50 truncate font-semibold mt-0.5">{user.email}</p>
                                    </div>
                                    
                                    <NavLink
                                        to={dashboardLink}
                                        onClick={() => setDesktopMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 mx-1 rounded-xl text-sm font-bold text-black/70 hover:bg-coral-50 hover:text-coral-600 transition-all duration-200 group"
                                    >
                                        <AppstoreOutlined className="text-lg group-hover:scale-110 transition-transform" />
                                        <span>Dashboard</span>
                                    </NavLink>
                                    <div className="h-[1px] w-full bg-gray/80 my-1"></div>
                                    
                                    <button
                                        onClick={() => {
                                            handleLogin();
                                            setDesktopMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 mx-1 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all duration-200 group w-full text-left"
                                    >
                                        <LogoutOutlined className="text-lg group-hover:-translate-x-1 transition-transform" />
                                        <span>Log Out</span>
                                    </button>
                                </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserDropdown;