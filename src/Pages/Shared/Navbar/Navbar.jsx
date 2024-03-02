import { NavLink, useNavigate } from "react-router-dom";
import { stack as Menu } from 'react-burger-menu'
import './navbar.css'
import useAuth from '../../../hook/useAuth'
import { enqueueSnackbar } from 'notistack';
import PrimaryBtn from '../../../Components/Button/PrimaryBtn'
import concord from '../../../assets/concord.png'
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import Headroom from "react-headroom";
import Loader from '../../../Components/Loader/Loader'

const Navbar = () => {

    const {user,logOut,loading} = useAuth()
    const navigate = useNavigate();   
    const [scrolled, setScrolled] = useState(false);
    
    const navbarItems1 = [
        { id: 1, title: 'Home', link: '/'},
        { id: 2, title: 'Biodatas', link: '/biodatas'},
        { id: 4, title: 'FAQ', link: '/faq'},
        { id: 5, title: 'About Us', link: '/about-us'},
      ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > 100) {
            setScrolled(true);
            } else {
            setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
  }, []);


    const handleLogin = () => {
        if (!user) {
            return navigate('/login');
        }
        logOut()
        .then(()=>{
            return enqueueSnackbar('Logged Out Successfully!',{variant:'success'})
        })
    }
    
     
    return (
        <div className='fixed z-10' data-aos='fade-down'>
            <Headroom>
                <nav className={`w-screen flex justify-between items-center pr-2 2xl:px-10  ${scrolled ? "bg-white shadow-lg" : "bg-none "} `}>
                    <div className="flex items-center">
                        <img loading="lazy" src={concord} alt="" className="w-44 lg:w-48 ml-10 lg:ml-0"/>
                    </div>
                    <div className="2xl:space-x-10 space-x-6 lg:flex hidden navitem" >
                        {
                            navbarItems1.map(navbarItem=><NavLink key={navbarItem.id} className='px-4 py-2.5 shadow bg-white/10 rounded cursor-pointer font-semibold tracking-widest ' to={navbarItem.link}>{navbarItem.title}</NavLink>)
                        }
                    </div>
                    <div className="mr-5">
                        {
                            loading ? <Loader width='28' height='true'></Loader> : user ? <UserDropdown photoURL={user?.photoURL}  displayName={user?.displayName} handleLogin={handleLogin} ></UserDropdown>
                            :
                            <div onClick={handleLogin}>
                                <PrimaryBtn data='Log In' icon={<LogoutOutlined />} />
                            </div>
                        }
    </ div>
                </nav>
            </Headroom>
            <div className="lg:hidden z-50 relative -top-[83px] menu ">
                <Menu className="min-h-screen" >
                    {
                        navbarItems1.map(navbarItem=><NavLink className='mt-8 w-32 pl-4 py-2.5 rounded duration-500 cursor-pointer bg-black/10' key={navbarItem.id} to={navbarItem.link}>{navbarItem.title}</NavLink>)
                    } 
                    <div className="relative mt-10 w-36 text-black" onClick={handleLogin}>
                        <PrimaryBtn data={user? 'Log Out' : 'Log In'} icon={<LogoutOutlined />} />
                    </div>
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;