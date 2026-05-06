import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { navItems } from "../../../utils/constants";

const DesktopNav = () => {
    const location = useLocation();
    const [hoveredPath, setHoveredPath] = useState(null);

    return (
        <div className="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-3xl mix-blend-multiply p-1.5 rounded-xl shadow-lg shadow-black/10 border border-black/5 overflow-hidden">
            <LayoutGroup>
                <AnimatePresence>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.link; 
                        
                        return (
                            <NavLink 
                                key={item.id} 
                                to={item.link}
                                onMouseEnter={() => setHoveredPath(item.link)}
                                onMouseLeave={() => setHoveredPath(null)}
                                className={`relative px-5 py-2.5 rounded-lg font-bold tracking-widest text-sm transition-colors duration-300 ${
                                    isActive ? "text-white" : "text-black/80 hover:text-teal"
                                }`}
                            >
                                {hoveredPath === item.link && !isActive && (
                                    <motion.div
                                        layoutId="navHover"
                                        className="absolute inset-0 bg-gradient-to-br from-teal/10 to-teal/5 border border-teal/20 backdrop-blur-sm rounded-lg"
                                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                                        transition={{ type: "spring"}}
                                    />
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-teal to-light-teal shadow-[0_4px_15px_rgba(0,128,128,0.4)] border border-teal rounded-lg overflow-hidden"
                                        transition={{ type: "spring", bounce: 0.1, duration: 0.1 }}
                                    >
                                        <div className="absolute -inset-2 bg-white/20 blur-md rounded-full animate-pulse opacity-50"></div>
                                    </motion.div>
                                )}
                                <span className="relative z-10">{item.title}</span>
                            </NavLink>
                        )
                    })}
                </AnimatePresence>
            </LayoutGroup>
        </div>
    );
};

export default DesktopNav;
