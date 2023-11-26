import { SendOutlined } from "@ant-design/icons";
import PrimaryBtn from "../../Components/Button/PrimaryBtn";
import Navbar from "../Shared/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';


const Banner = () => {

    const navigate = useNavigate();

    return (
           <div>
             <Navbar></Navbar>
        <div className="relative ">
            <img src="https://i.ibb.co/8mTbXNp/liquid-artiste-SUw-Po4-Er-QCc-unsplash-1-1.jpg"
                className="absolute inset-0 object-cover w-full h-full "/>
                <div className="bg-gradient-to-r absolute from-black/70 via-black/30 to-black/30 w-full h-screen bg-fixed"></div>
                    <div className="relative ">
                        {/* bottom design */}
                        <svg
                        className="absolute inset-x-0 bottom-0 text-white"
                        viewBox="-50 0 1300 160"
                        >
                        <path
                            fill="currentColor"
                            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                        />
                        </svg>
                        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:w-screen md:px-24 lg:px-8 lg:py-36 h-screen">
                        <div className="flex flex-col items-center justify-between xl:flex-row">
                            <div className="w-full max-w-2xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                            <h2 className="mb-6 text-3xl font-bold sm:text-5xl text-white">
                            Find love, build dreams!<br/>
                            your journey begins with Concord.
                            </h2>
                            <p className="max-w-xl mb-4 text-xs text-white/80 sm:text-lg">
                            Embark on a wonderful journey at Concord, where you can explore the beauty of relationships as you navigate through a space that celebrates the simplicity and warmth of genuine connections.</p>
                            <div className="relative" onClick={()=>navigate('/biodatas')}>
                            <PrimaryBtn data={'Learn More'} icon={<SendOutlined />}></PrimaryBtn>
                            </div>
                            </div>
                            <div>
                                {/* Inner content             
                        <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                            <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                Sign up for updates
                                </h3>
                                <form>
                                <div className="mb-1 sm:mb-2">
                                    <label
                                    htmlFor="firstName"
                                    className="inline-block mb-1 font-medium"
                                    >
                                    First name
                                    </label>
                                    <input
                                    placeholder="John"
                                    required
                                    type="text"
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    name="firstName"
                                    />
                                </div>
                                <div className="mb-1 sm:mb-2">
                                    <label
                                    htmlFor="lastName"
                                    className="inline-block mb-1 font-medium"
                                    >
                                    Last name
                                    </label>
                                    <input
                                    placeholder="Doe"
                                    required
                                    type="text"
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    name="lastName"
                                    />
                                </div>
                                <div className="mb-1 sm:mb-2">
                                    <label
                                    htmlFor="email"
                                    className="inline-block mb-1 font-medium"
                                    >
                                    E-mail
                                    </label>
                                    <input
                                    placeholder="john.doe@example.org"
                                    required
                                    type="text"
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    />
                                </div>
                                <div className="mt-4 mb-2 sm:mb-4">
                                    <button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                    >
                                    Subscribe
                                    </button>
                                </div>
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                                </form>
                            </div>
                            </div>            */}
                            </div>
                        </div>
                        </div>
                    </div>
                
        </div>
           </div>
    )}
export default Banner;