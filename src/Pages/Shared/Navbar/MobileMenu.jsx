import { motion, AnimatePresence } from "framer-motion";

export const MenuToggleIcon = ({ isOpen, onClick, className = "" }) => (
    <button 
        onClick={onClick}
        className={`relative z-[100] flex items-center justify-center w-11 h-11 transition-all duration-300 focus:outline-none group overflow-hidden ${className}`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
    >

        <div className="relative scale-125 w-6 h-[18px] flex flex-col justify-between">
            <span className={`block w-full h-[2px] bg-primary/80 rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'rotate-[45deg] translate-y-[8px] bg-light-teal' : ''}`}></span>
            <span className={`block w-full h-[2px] bg-primary/80 rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}></span>
            <span className={`block w-full h-[2px] bg-primary/80 rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? '-rotate-[45deg] -translate-y-[8px] bg-light-teal' : ''}`}></span>
        </div>
    </button>
);

export const SharedMobileMenu = ({ isOpen, setIsOpen, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] xl:hidden cursor-pointer pointer-events-auto"
                    />
                    
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-screen w-[280px] sm:w-[340px] bg-white/95 backdrop-blur-md z-[90] shadow-[-10px_0_40px_rgba(0,128,128,0.25)] border-l border-teal/20 flex flex-col font-Nunito overflow-x-hidden overflow-y-auto pointer-events-auto"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00808015_1px,transparent_1px),linear-gradient(to_bottom,#00808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40"></div>
                                                

                        {/* Injected Content (Navbar Links or Dashboard Actions) */}
                        <div className="relative z-10 flex flex-col h-full pt-8">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};