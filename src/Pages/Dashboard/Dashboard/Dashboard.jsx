import { Outlet } from "react-router-dom";
import './Dashboard.css'
import { stack as Menu } from 'react-burger-menu'
import '../../Shared/Navbar/navbar.css'
import DashboardMenu from "./DashboardMenu";

const Dashboard = () => {

    return (
        <div className="font-Nunito antialiased bg-gray/30 h-[100dvh] w-full overflow-hidden flex flex-row">
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 lg:w-80 shrink-0 h-full border-r border-teal/20 bg-white/95 z-10 shadow-[4px_0_24px_rgba(0,128,128,0.05)]">
                <DashboardMenu />
            </aside>

            {/* Main scrollable content area */}
            <main className="flex-1 h-full overflow-y-auto relative scroll-smooth flex flex-col">
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Sidebar */}
            <div className="lg:hidden z-[100] top-0 menu fixed">
                <Menu className="h-[100dvh] border-r border-teal/20" width={320}>
                    <div className="h-full bg-white/95">
                        <DashboardMenu />
                    </div>
                </Menu>
            </div>
        </div>
    )}
export default Dashboard;