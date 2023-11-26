import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLoginCircleFill } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';
import Heading from '../../Components/Heading/Heading'
import PrimaryBtn from '../../Components/Button/PrimaryBtn'
import useAuth from "../../hook/useAuth";
import { enqueueSnackbar } from "notistack";
import useAxiosPublic from "../../hook/useAxiosPublic";

const Login = () => {

    const {logIn,googleLogIn} = useAuth(); 
    const {state} = useLocation()
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        logIn(email,password)
        .then(async()=> {
            enqueueSnackbar('Logged in successfully!',{variant:'success'})
            navigate(state ? state : '/' )
            form.reset();
        })
        .catch(err=>{
            enqueueSnackbar(`${err}`,{variant:'error'})
        })
    }

    const handleGoogle = () => {
        googleLogIn()
        .then(result=> {           
            const email = result.user?.email
            const name = result.user?.displayName
            axiosPublic.post('/users',{name,email})
            .then(result=>{
                navigate(state ? state : '/' )
                if (result.data.insertedId) {                       
                    return enqueueSnackbar('Account created successfully!',{variant:'success'})
                }
                return enqueueSnackbar('Logged in successfully!',{variant:'success'})
            })
        })
        .catch(err=>{
            enqueueSnackbar(`${err}`,{variant:'error'})
        })
        
    }

    return (
        <div className="min-h-screen my-20 px-5">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm md:max-w-6xl border border-black/5">
                    <div className="hidden lg:block lg:w-3/4 bg-cover bg-[url('https://i.ibb.co/NjYrf02/priscilla-du-preez-OEdk-Pax-YMXU-unsplash.jpg')]"></div>
                    <div className="w-full p-8 lg:w-1/2">
                    <Heading>Welcome Back!</Heading>
                    <p className="text-sm text-center mt-2">Log in to your account to access your personalized dashboard, view your saved cars, and continue your car-buying journey.</p>
                        <button className="flex w-72 mx-auto items-center justify-center my-6 border border-gray rounded-lg shadow-md hover:bg-gray-100 active:scale-95 duration-500"  onClick={handleGoogle}>
                            <FcGoogle className='text-2xl'></FcGoogle>
                            <p className="px-4 py-3 w-5/6 text-center text-gray-600 font-medium">Sign in with Google</p>
                        </button>
                        <div className="my-5 flex items-center justify-between">
                            <span className="border-b border-black/10 w-1/5 md:w-1/3"></span>
                            <Link to="" className="text-xs text-center text-gray-500 ">or login with email</Link>
                            <span className="border-b border-black/10 w-1/5 md:w-1/3"></span>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="relative">
                            <input className="w-full bg-gray text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="email" placeholder="Email" name='email' required/>
                        <MdOutlineAlternateEmail className="absolute right-3 bottom-4"></MdOutlineAlternateEmail>
                            </div>
                            <div className="relative my-10">
                            <input className="w-full bg-gray text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline "
                        type="text" name='password' placeholder="Password" required/>
                        <AiOutlineEye className="absolute right-3 bottom-3 text-xl"></AiOutlineEye>
                            </div>
                            <button className="relative" type="submit">
                            <PrimaryBtn data='Log in'>
                            </PrimaryBtn>
                            <RiLoginCircleFill className="absolute w-full left-7 bottom-3.5" ></RiLoginCircleFill>
                            </button>
                        </form>
                        <p className="mt-5 text-sm font-light">{`Don't have Account? Please `}<Link to='/signup' className="underline underline-offset-4 text-teal">Sign up!</Link></p>
                    </div>
            </div>
        </div>
    )}
export default Login;

// RiLoginCircleFill