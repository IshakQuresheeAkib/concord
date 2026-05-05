import { 
    EditOutlined, 
    FolderViewOutlined, 
    HomeOutlined, 
    InteractionOutlined, 
    PullRequestOutlined, 
    SafetyOutlined, 
    TeamOutlined 
} from "@ant-design/icons";
import { RiShieldStarLine } from 'react-icons/ri';

// Main Navbar Items
export const navItems = [
    { id: 1, title: 'Home', link: '/'},
    { id: 2, title: 'Biodatas', link: '/biodatas'},
    { id: 4, title: 'FAQ', link: '/faq'},
    { id: 5, title: 'About Us', link: '/about-us'},
];

// Dashboard Items for regular users (requires BiodataId injected dynamically)
export const getDashboardUserItems = (BiodataId) => [
    { id: 1, title: 'Edit', link: '/dashboard/edit', icon: <EditOutlined /> },
    { id: 2, title: 'View Biodata', link: `/dashboard/view-biodata/${BiodataId}`, icon: <FolderViewOutlined /> },
    { id: 3, title: 'My Contact Request', link: '/dashboard/contact-request', icon: <PullRequestOutlined /> },
    { id: 4, title: 'Favourite Biodata', link: '/dashboard/favourite-biodata', icon: <SafetyOutlined /> },
    { id: 5, title: 'Home', link: '/', icon: <HomeOutlined /> },
];

// Dashboard Items for admin
export const dashboardAdminItems = [
    { id: 5, title: 'Admin Dashboard', link: '/dashboard/admin/admin-dashboard', icon: <InteractionOutlined /> },
    { id: 6, title: 'Manage Users', link: '/dashboard/admin/manage-users', icon: <TeamOutlined /> },
    { id: 7, title: 'Approved Premium', link: '/dashboard/admin/approved-premium', icon: <RiShieldStarLine /> },
    { id: 8, title: 'Approved Contact Request', link: '/dashboard/admin/approved-contact-request', icon: <SafetyOutlined /> },
    { id: 9, title: 'Home', link: '/', icon: <HomeOutlined /> },
];
