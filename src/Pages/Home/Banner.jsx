import { SendOutlined } from "@ant-design/icons";
import PrimaryBtn from "../../Components/Button/PrimaryBtn";
import Navbar from "../Shared/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';


const Banner = () => {

    const navigate = useNavigate();

    return (
           <div className="">
             <Navbar></Navbar>
            <div className="relative" >
                 <img loading="lazy" src="https://i.ibb.co.com/TqFhkPYG/ring.webp"
                    className="absolute inset-0 object-cover w-full h-full"/>
                    <div className="bg-gradient-to-b absolute from-white/60 via-white/5 to-white/0 w-full h-screen bg-fixed"></div>
                        <div className="relative ">
                            {/* bottom design */}
                            <svg className="absolute inset-x-0 bottom-0 text-white"
                            viewBox="-60 0 1200 155">
                            <path fill="currentColor"
                                d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"/>
                            </svg>
                            <div className="relative xl:bottom-14 2xl:bottom-0 mx-auto overflow-hidden sm:max-w-xl md:max-w-full 2xl:w-screen lg:px-24 px-8 xl:pt-44 py-28 2xl:py-36 h-screen">
                            <div className="flex flex-col items-center justify-between xl:flex-row" data-aos='fade-bottom'>
                                <div className="w-full 2xl:max-w-2xl max-w-3xl 2xl:pt-10 xl:pr-6 xl:w-7/12">
                                <h2 className="mb-3 text-4xl font-bold sm:text-5xl text-black">
                                Find Love, Build Dreams!<br/>
                                Your Journey Begins With Concord !
                                </h2>
                                <p className="max-w-xl mb-6 text-xs text-black/80 sm:text-lg">
                                Embark on a wonderful journey at Concord, where you can explore the beauty of relationships as you navigate through a space that celebrates the simplicity and warmth of genuine connections.</p>
                                <div className="w-fit rounded-full" onClick={()=>navigate('/about-us')}>
                                <PrimaryBtn data={'Learn More'} icon={<SendOutlined />}></PrimaryBtn>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    
            </div>
           </div>
    )}
export default Banner;