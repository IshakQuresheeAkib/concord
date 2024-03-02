import { EditOutlined, FolderViewOutlined, HomeOutlined, InteractionOutlined, PullRequestOutlined, SafetyOutlined, TeamOutlined, } from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import './Dashboard.css'
import useAdmin from "../../../hook/useAdmin";
import useUserBiodata from "../../../hook/useUserBiodata";
import { RiShieldStarLine } from "react-icons/ri";
import PrimaryBtn from "../../../Components/Button/PrimaryBtn";
import useAuth from "../../../hook/useAuth";
import { enqueueSnackbar } from "notistack";
import { stack as Menu } from 'react-burger-menu'
import '../../Shared/Navbar/navbar.css'

const Dashboard = () => {

    const {logOut,user} = useAuth()
    const [isAdmin] = useAdmin();
    const [userBiodata,isLoading] = useUserBiodata() || [];
    console.log(isLoading);

    const {displayName,email,photoURL} = user || {}
    const {BiodataId} = userBiodata || {};

    const navbarItems1 = [
        { id: 1, title: 'Edit', link: '/dashboard/edit',icon:<EditOutlined/> },
        { id: 2, title: 'View Biodata', link: `/dashboard/view-biodata/${BiodataId}`,icon:<FolderViewOutlined/> },
        { id: 3, title: 'My Contact Request', link: '/dashboard/contact-request',icon:<PullRequestOutlined/> },
        { id: 4, title: 'Favourite Biodata', link: '/dashboard/favourite-biodata',icon:<SafetyOutlined/> },
        { id: 5, title: 'Home', link: '/',icon:<HomeOutlined/> },
      ];
    const navbarItems2 = [
        { id: 5, title: 'Admin Dashboard', link: '/dashboard/admin/admin-dashboard',icon:<InteractionOutlined />},
        { id: 6, title: 'Manage Users', link: '/dashboard/admin/manage-users',icon:<TeamOutlined />},
        { id: 7, title: 'Approved Premium', link: '/dashboard/admin/approved-premium',icon:<RiShieldStarLine /> },
        { id: 8, title: 'Approved Contact Request', link: '/dashboard/admin/approved-contact-request',icon:<SafetyOutlined/>},
        { id: 9, title: 'Home', link: '/',icon:<HomeOutlined/>},
      ];

      const handleLogin = () => {
        logOut()
        .then(()=>{
            enqueueSnackbar('Logged Out Successfully!',{variant:'success'})
        })
    }

    return (
        <div className="font-poppins antialiased">
            <div className="h-full flex flex-row">                
                <div className="bg-white lg:block hidden min-h-screen max-w-screen-2xl shadow-xl px-3 w-72 overflow-x-hidden transition-transform duration-300 ease-in-out">
                    <div className="space-y-10 mt-10">
                        {<div id="profile" className="space-y-3">
                            <img src={photoURL} alt="Avatar user"
                            className="w-10 md:w-28 md:h-28 rounded-full mx-auto object-cover"
                            />
                            <div>
                            <h2
                                className="font-medium text-xs md:text-sm text-center text-teal-500"
                            >
                                {displayName}
                            </h2>
                            <p className="text-xs text-gray-500 text-center">{email}</p>
                            </div>
                        </div>}
                        <div className="flex flex-col space-y-2 dashboard">
                            
                            {
                                isAdmin ? 
                                navbarItems2?.map(navItem=>(
                                    <NavLink key={navItem.id} to={navItem.link} className="font-medium text-lg flex items-center gap-2 py-2 px-2 hover:bg-teal hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                                    {navItem.icon}
                                    <p>{navItem.title}</p>
                                    </NavLink>
                                ))
                                : 
                                navbarItems1?.map(navItem=>(
                                <NavLink key={navItem.id} to={navItem.link} className="font-medium text-lg flex items-center gap-2 py-2 px-2 hover:bg-teal hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                                {navItem.icon}
                                <p>{navItem.title}</p>
                                </NavLink>
                                ))
                            }
                            <div onClick={handleLogin} className="pt-6">
                                    <PrimaryBtn data='Log Out' icon={<LogoutOutlined />}>                 
                                    </PrimaryBtn>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 2xl:mx-0 md:mx-5"><Outlet></Outlet></div>
            </div>
            <div className="lg:hidden z-50 top-10 menu ">
                <Menu className="min-h-screen" >
                    <div className="flex flex-col space-y-2 mt-5 dashboard">                        
                        {
                            isAdmin ? 
                            navbarItems2?.map(navItem=>(
                                <NavLink key={navItem.id} to={navItem.link} className="font-medium text-lg  flex items-center gap-2 py-2 px-2 hover:bg-teal hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                                {navItem.icon}
                                <p>{navItem.title}</p>
                                </NavLink>
                            ))
                            : 
                            navbarItems1?.map(navItem=>(
                            <NavLink key={navItem.id} to={navItem.link} className="font-medium text-lg flex items-center gap-2 py-2 px-2 hover:bg-teal hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                            {navItem.icon}
                            <p>{navItem.title}</p>
                            </NavLink>
                            ))
                        }
                        <div onClick={handleLogin} className="pt-6">
                                <PrimaryBtn data='Log Out' icon={<LogoutOutlined />}>                 
                                </PrimaryBtn>
                        </div>
                    </div>
                </Menu>
            </div>
        </div>
    )}
export default Dashboard;