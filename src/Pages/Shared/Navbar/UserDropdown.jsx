import { NavLink, useNavigate } from "react-router-dom";
import { LogoutOutlined, AppstoreOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import Loader from '../../../Components/Loader/Loader';
import { motion, AnimatePresence } from "framer-motion";

const UserDropdown = ({ user, loading, handleLogin, dashboardLink }) => {
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="hidden lg:flex items-center relative z-50">
            {loading ? (
                <div className="w-12 h-12 flex items-center justify-center"><Loader width='24' height='true' /></div>
            ) : (
                <div className="relative">
                    <button 
                        onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                        className={`relative flex items-center gap-2.5 p-1 pb-1 pl-1 pr-3 bg-white/40 backdrop-blur-xl border hover:bg-white/60 shadow-[0_4px_15px_rgba(0,128,128,0.08)] hover:shadow-[0_5px_20px_rgba(0,128,128,0.2)] rounded-full transition-all duration-300 group focus:outline-none ${desktopMenuOpen ? 'border-teal/40 ring-2 ring-teal/30 ring-offset-2' : 'border-white/60'}`}
                        aria-label="Open User Menu"
                    >

                        {user ? (
                            <div className="relative">
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-light-teal to-teal rounded-full blur-md opacity-20 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
                                <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full object-cover relative z-10 border-[2px] border-white shadow-md group-hover:scale-105 transition-transform duration-300" />
                            </div>
                        ) : (
                            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-teal/10 to-teal/30 flex items-center justify-center border-[2px] border-white/80 text-teal group-hover:scale-105 transition-transform duration-300">
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-light-teal to-teal rounded-full blur-md opacity-20 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
                                <UserOutlined className="text-xl relative z-10" />
                            </div>
                        )}

                        {/* Distinct Caret indicating Dropdown */}
                        <DownOutlined 
                            className={`text-[11px] font-bold text-teal transition-transform duration-300 ease-in-out ${desktopMenuOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} 
                            style={{ strokeWidth: '50' }}
                        />
                    </button>

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
                                    className="absolute top-[calc(100%+16px)] right-0 w-64 bg-white/85 backdrop-blur-3xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,128,128,0.3)] rounded-2xl p-2 z-50 overflow-hidden"
                                >
                                    {/* Design Accent inside menu */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 blur-3xl -z-10 rounded-full"></div>
                                    
                                    {user ? (
                                        <div className="flex flex-col">
                                            <div className="px-4 py-3 mb-2 border-b border-gray/80">
                                                <p className="text-sm font-bold text-black/80 truncate">{user.displayName}</p>
                                                <p className="text-xs text-black/50 truncate font-semibold mt-0.5">{user.email}</p>
                                            </div>
                                            
                                            <NavLink
                                                to="/profile"
                                                onClick={() => setDesktopMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 mx-1 rounded-xl text-sm font-bold text-black/70 hover:bg-teal/10 hover:text-teal transition-all duration-200 group"
                                            >
                                                <UserOutlined className="text-lg group-hover:scale-110 transition-transform" />
                                                <span>My Profile</span>
                                            </NavLink>
                                            
                                            <NavLink
                                                to={dashboardLink}
                                                onClick={() => setDesktopMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 mx-1 rounded-xl text-sm font-bold text-black/70 hover:bg-teal/10 hover:text-teal transition-all duration-200 group"
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
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-1 p-1 z-10 relative">
                                            <button
                                                onClick={() => {
                                                    navigate('/login');
                                                    setDesktopMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-black/80 hover:bg-teal/10 hover:text-teal transition-all duration-200"
                                            >
                                                Log In
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/signup');
                                                    setDesktopMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-black/80 hover:bg-teal/10 hover:text-teal transition-all duration-200"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;