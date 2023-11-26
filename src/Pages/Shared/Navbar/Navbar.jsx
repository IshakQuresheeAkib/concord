import { NavLink, useNavigate } from "react-router-dom";
import { stack as Menu } from 'react-burger-menu'
import './navbar.css'
import 'aos/dist/aos.css'; 
import useAuth from '../../../hook/useAuth'
import { enqueueSnackbar } from 'notistack';
import PrimaryBtn from '../../../Components/Button/PrimaryBtn'
import { RiLoginCircleFill } from 'react-icons/ri';
import concord from '../../../assets/concord.png'
import { LogoutOutlined } from "@ant-design/icons";


const Navbar = () => {

    const {user,logOut} = useAuth()
    const navigate = useNavigate();

    // AOS.init({
    //     duration: 1200, 
    // });
    // AOS.refresh();
    // data-aos='slide-down'

    
    const navbarItems1 = [
        { id: 1, title: 'Home', link: '/' },
        { id: 2, title: 'Biodatas', link: '/Biodatas'},
        { id: 3, title: 'Contact Us', link: '/contact-us'},
        { id: 4, title: 'FAQ', link: '/faq'},
        { id: 5, title: 'About Us', link: '/about-us'},
      ];
    const navbarItems2 = [
        { id: 6, title: 'Dashboard', link: `/dashboard`},
      ];

 
    const handleLogin = () => {
        if (!user) {
            return navigate('/login');
        }
        logOut()
        .then(()=>{
            enqueueSnackbar('Logged Out Successfully!',{variant:'success'})
        })
    }
   
    return (
        <div className="relative">
            <nav className="w-full flex justify-between items-center px-10 my-1.5">
                <div className="flex items-center">
                    <img src={concord} alt="" className="w-44 md:w-56"/>
                </div>
                <div className="space-x-10 md:flex hidden navitem" >
                    {
                        navbarItems1.map(navbarItem=><NavLink key={navbarItem.id} className='text-lg hover:text-light-teal transition duration-200' to={navbarItem.link}>{navbarItem.title}</NavLink>)
                    }
                    {
                        user && navbarItems2.map(navbarItem=><NavLink className='text-lg hover:text-light-teal transition duration-200' key={navbarItem.id} to={navbarItem.link}>{navbarItem.title}</NavLink>)
                    }                    
                </div>
                
                <div className="flex items-center gap-5 md:mr-10">               

                   <div onClick={handleLogin}>
                        <PrimaryBtn data={user? 'Log Out' : 'Log In'} icon={<LogoutOutlined />}>                 
                        </PrimaryBtn>
                   </div>
                </div>
            </nav>
            <div className="md:hidden w-full z-50 top-0 menu">                
                <Menu className="">          
                    {
                        navbarItems1.map(navbarItem=><NavLink className='mt-10' key={navbarItem.id} to={navbarItem.link}>{navbarItem.title}</NavLink>)
                    }
                    {
                        user && navbarItems2.map(navbarItem=><NavLink className='mt-10' key={navbarItem.id} to={navbarItem.link}>{navbarItem.title}</NavLink>)
                    }  
                    <div className="relative mt-10 w-36 text-black" onClick={handleLogin}>
                        <PrimaryBtn  data={user? 'Log Out' : 'Log In'}>                 
                        </PrimaryBtn>
                        <RiLoginCircleFill className="absolute right-6 bottom-3.5 text-xl" ></RiLoginCircleFill>
                   </div>
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;