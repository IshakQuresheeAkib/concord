import { NavLink } from 'react-router-dom';
import useUserBiodata from '../../../hooks/useUserBiodata';
import { LogoutOutlined } from "@ant-design/icons";
import useAdmin from '../../../hooks/useAdmin';
import useAuth from '../../../hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import { getDashboardUserItems, dashboardAdminItems } from '../../../utils/constants';
import PrimaryBtn from '../../../Components/Button/PrimaryBtn';

const DashboardMenu = () => {
    const { logOut, user } = useAuth();
    const { displayName, email, photoURL } = user || {};

    const [userBiodata] = useUserBiodata() || [];
    const [isAdmin] = useAdmin();

    const handleLogin = () => {
        logOut().then(() => {
            enqueueSnackbar('Logged Out Successfully!', { variant: 'success' })
        })
    }

    const { BiodataId } = userBiodata || {};

    return (
        <nav className="relative w-full h-full flex flex-col justify-between overflow-y-auto custom-scrollbar bg-white/90 backdrop-blur-md transition-all duration-500 font-Nunito">
            
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#00808015_1px,transparent_1px),linear-gradient(to_bottom,#00808015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30"></div>

            <div className="space-y-3 2xl:space-y-6 mt-6 md:mt-8 relative z-10 px-1 xl:px-2 2xl:px-4">
                
                {/* Profile Section */}
                <div id="profile" className="flex flex-col items-center space-y-2 xl:space-y-3 group shrink-0">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-light-teal to-teal rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                        <img 
                            src={photoURL} 
                            alt="Avatar user"
                            className="relative w-14 h-14 md:w-16 md:h-16 xl:w-24 xl:h-24 rounded-full object-cover ring-2 ring-teal/50 ring-offset-4 ring-offset-white transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="text-center relative">
                        <div className="inline-block px-2 py-0.5 xl:px-3 xl:py-1 mb-1 xl:mb-1.5 text-[8px] xl:text-[10px] tracking-widest text-teal bg-teal/10 border border-teal/30 rounded-full uppercase">
                            {isAdmin ? 'System Admin' : 'Authorized User'}
                        </div>
                        <h2 className="font-semibold text-xs md:text-sm xl:text-base text-black/80 drop-shadow-sm line-clamp-1">
                            {displayName}
                        </h2>
                        <p className="text-[10px] xl:text-xs text-black/50 line-clamp-1">{email}</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-1.5 xl:space-y-2 pb-6">
                {(isAdmin ? dashboardAdminItems : getDashboardUserItems(BiodataId))?.map(navItem => (
                    <NavLink 
                        key={navItem.id} 
                        to={navItem.link} 
                        className={({ isActive }) => `
                            relative group flex items-center gap-2 xl:gap-3 py-2 px-3 xl:py-3 xl:px-4 font-bold text-xs md:text-sm xl:text-base rounded-xl transition-all duration-300 overflow-hidden shrink-0
                            ${isActive 
                                ? 'text-dark-blue bg-teal/10 border border-teal/30' 
                                : 'text-black/60 hover:text-teal hover:bg-teal/5'}
                        `}
                    >
                        {/* Animated Hover Background */}
                        <div className="absolute inset-0 w-0 bg-gradient-to-r from-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full -z-10"></div>
                        
                        {/* Left Accent Line */}
                        <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-light-teal opacity-0 transform -translate-x-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 rounded-r-md"></div>

                        <span className="text-base xl:text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-sm">
                            {navItem.icon}
                        </span>
                        <p className="tracking-wide">{navItem.title}</p>
                    </NavLink>
                ))}
                <div className="pt-2 transform scale-90 xl:scale-100 origin-left">
                    <PrimaryBtn onClick={handleLogin} data={'Logout'} icon={<LogoutOutlined className="text-base xl:text-lg transition-transform duration-300" />}></PrimaryBtn>
                </div>
                </div>
                
            </div>

            
        </nav>
    );
};

export default DashboardMenu;