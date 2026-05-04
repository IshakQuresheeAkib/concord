import { NavLink } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const DashboardMenu = ({ isAdmin, navbarItems1, navbarItems2, user, handleLogin }) => {
    const { displayName, email, photoURL } = user || {};

    return (
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-white/90 backdrop-blur-md border-r border-teal/20 shadow-[4px_0_24px_rgba(0,128,128,0.15)] transition-all duration-500 font-Nunito">
            {/* Retro-futuristic Grid Background mapped to 'teal' */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00808015_1px,transparent_1px),linear-gradient(to_bottom,#00808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>
            
            {/* Top Glowing Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-light-teal to-transparent opacity-70 shadow-[0_0_10px_rgba(0,196,196,0.8)]"></div>

            <div className="space-y-8 mt-12 relative z-10 px-6">
                {/* Profile Section */}
                <div id="profile" className="flex flex-col items-center space-y-4 group">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-light-teal to-teal rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                        <img 
                            src={photoURL} 
                            alt="Avatar user"
                            className="relative w-20 h-20 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-teal/50 ring-offset-4 ring-offset-white transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="text-center relative">
                        <div className="inline-block px-3 py-1 mb-2 text-[10px] tracking-widest text-teal bg-teal/10 border border-teal/30 rounded-full uppercase">
                            {isAdmin ? 'System Admin' : 'Authorized User'}
                        </div>
                        <h2 className="font-semibold text-sm md:text-base text-black/80 drop-shadow-sm">
                            {displayName}
                        </h2>
                        <p className="text-xs text-black/50">{email}</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-3 mt-4">
                    {(isAdmin ? navbarItems2 : navbarItems1)?.map(navItem => (
                        <NavLink 
                            key={navItem.id} 
                            to={navItem.link} 
                            className={({ isActive }) => `
                                relative group flex items-center gap-3 py-3 px-4 font-bold text-sm md:text-base rounded-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-light-teal focus:ring-offset-2
                                ${isActive 
                                    ? 'text-dark-blue bg-teal/10 shadow-[0_0_15px_rgba(0,128,128,0.2)] border border-teal/30' 
                                    : 'text-black/60 hover:text-teal hover:bg-gray/50 p-3'}
                            `}
                        >
                            {/* Animated Hover Background */}
                            <div className="absolute inset-0 w-0 bg-gradient-to-r from-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full -z-10"></div>
                            
                            {/* Left Accent Line */}
                            <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-light-teal opacity-0 transform -translate-x-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 rounded-r-md"></div>

                            <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-sm">
                                {navItem.icon}
                            </span>
                            <p className="tracking-wide">{navItem.title}</p>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Logout Section */}
            <div className="relative z-10 p-6 mt-10">
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent -z-10 pointer-events-none"></div>
                <div className="group cursor-pointer block">
                    <button 
                        onClick={handleLogin} 
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal to-light-teal hover:opacity-90 shadow-md hover:shadow-[0_0_20px_rgba(0,128,128,0.4)] transition-all duration-300 transform group-hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
                        aria-label="Log Out"
                    >
                        <LogoutOutlined className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
                        <span className="tracking-widest uppercase text-sm">Terminate Session</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardMenu;