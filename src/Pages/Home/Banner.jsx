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
                    <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url('https://i.ibb.co.com/d4Kf0mPw/hero-mb-banner.webp')] lg:bg-[url('https://i.ibb.co.com/1twfsxDf/hero-banner.webp')]"></div>
                    <div className="absolute top-0 left-0 w-full h-[50vh] pointer-events-none"></div>
                        <div className="relative ">
                            {/* bottom design */}
                            <svg className="absolute inset-x-0 bottom-0 text-white"
                            viewBox="-60 0 1200 155">
                                <path fill="currentColor"
                                d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"/>
                            </svg>
                            <div className="relative xl:bottom-14 2xl:bottom-0 mx-auto overflow-hidden sm:max-w-2xl md:max-w-full 2xl:w-screen md:px-[75px] px-6 xl:pt-44 py-28 2xl:py-36 h-screen">
                                <div className="w-full 2xl:pt-6 xl:w-full flex flex-col items-start">
                                    <h2 className="mb-3 text-6xl font-bold sm:text-7xl 2xl:text-8xl text-black">
                                        <span className="text-coral leading-tight lg:leading-none">Ready to </span> 
                                        <br/>
                                        <span className="text-teal-600 leading-tight lg:leading-none">Meet Your Match?</span>
                                    </h2>
                                    <p className="max-w-xl mb-6 text-base text-black/80 sm:text-lg lg:text-xl">
                                    Finding someone special is easy here. We focus on real connections and shared values. Start your next chapter simply.</p>
                                    <div className="w-fit rounded-full" onClick={()=>navigate('/biodatas')}>
                                    <PrimaryBtn data={'Explore your partner'} icon={<SendOutlined />}></PrimaryBtn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
            </div>
           </div>
    )}
export default Banner;