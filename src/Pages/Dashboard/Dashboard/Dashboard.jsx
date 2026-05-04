import { EditOutlined, FolderViewOutlined, HomeOutlined, InteractionOutlined, PullRequestOutlined, SafetyOutlined, TeamOutlined, } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import './Dashboard.css'
import useAdmin from "../../../hook/useAdmin";
import useUserBiodata from "../../../hook/useUserBiodata";
import { RiShieldStarLine } from "react-icons/ri";
import useAuth from "../../../hook/useAuth";
import { enqueueSnackbar } from "notistack";
import { stack as Menu } from 'react-burger-menu'
import '../../Shared/Navbar/navbar.css'
import DashboardMenu from "./DashboardMenu";

const Dashboard = () => {

    const {logOut,user} = useAuth()
    const [isAdmin] = useAdmin();
    const [userBiodata] = useUserBiodata() || [];

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
        <div className="font-poppins antialiased bg-gray-50/50">
            <div className="h-full flex flex-row">                
                <div className="lg:block hidden min-h-screen w-72 lg:w-80 shrink-0 z-10 sticky top-0 h-screen">
                    <DashboardMenu 
                        isAdmin={isAdmin}
                        navbarItems1={navbarItems1}
                        navbarItems2={navbarItems2}
                        user={user}
                        handleLogin={handleLogin}
                    />
                </div>
                <div className="flex-1 2xl:mx-0 md:mx-6 my-6"><Outlet></Outlet></div>
            </div>
            <div className="lg:hidden z-[100] top-0 menu fixed">
                <Menu className="min-h-screen border-r border-teal-500/20" width={320}>
                    <div className="h-full bg-white/95">
                        <DashboardMenu 
                            isAdmin={isAdmin}
                            navbarItems1={navbarItems1}
                            navbarItems2={navbarItems2}
                            user={user}
                            handleLogin={handleLogin}
                        />
                    </div>
                </Menu>
            </div>
        </div>
    )}
export default Dashboard;