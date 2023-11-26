import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import useAuth from "../hook/useAuth";
import Home from "../Pages/Home/Home/Home";
import Loader from '../Components/Loader/Loader'

const Main = () => {

    const {pathname} = useLocation();
    const {loading} = useAuth();

    return (
        <div className="overflow-hidden font-ubuntu min-h-screen">
             <div>
                    {pathname === '/' ? <Home></Home> : <Navbar></Navbar>}
                </div> 
             <div className="">{loading ? <Loader></Loader>: <Outlet/>}</div>
             <div className=""><Footer></Footer></div>
        </div>
    )}
export default Main;