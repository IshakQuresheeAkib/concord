import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import Home from "../Pages/Home/Home/Home";
import Biodatas from "../Pages/Biodatas/Biodatas";
import useAuth from "../hook/useAuth";
import Loader from "../Components/Loader/Loader";
import { useEffect, useState } from "react";
import concord from '../../public/ConcordLogo.png'

const Main = () => {

    const [initialloading,setInitialLoading] = useState(false)
    const {pathname} = useLocation();
    const {loading} = useAuth();
    
    
    useEffect(()=>{
        setInitialLoading(true)
        setTimeout(()=>{
            setInitialLoading(false)
        },2500)
    },[])

    return (
        <div>
           {
            initialloading ?  <div className="h-screen flex justify-center items-center">
                <img src={concord} className=" w-52 animate-bounce"/>
            </div> : <div className="overflow-hidden font-Nunito min-h-screen">
            <div>
                   {pathname === '/' ? <Home></Home> : pathname === '/biodatas' ? <Biodatas></Biodatas> :  <Navbar></Navbar>}
               </div> 
            <div className="mt-24"> {loading ? <Loader width='52'/> : <Outlet/>}</div>
            <div className=""><Footer></Footer></div>
       </div>
           }
        </div>
    )}
export default Main;

// 