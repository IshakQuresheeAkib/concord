import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { BsImageAlt } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import Heading from '../../Components/Heading/Heading'
import { enqueueSnackbar } from "notistack";
import useAuth from '../../hook/useAuth'
import { FcGoogle } from 'react-icons/fc';
import useAxiosPublic from "../../hook/useAxiosPublic";
import { Input } from "antd";


const Signup = () => {

    const {createUser,setProfile,googleLogIn} = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleRegister = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.image.value;
        const email = form.email.value;
        const password = form.password.value;
        const newUser = {email,password};
        console.log(newUser);


        if (!/(?=.*[!#$%&?^*@~() "])/.test(password)) {
            return enqueueSnackbar('Password should have a special character!',{variant:'error'})
        }else if (!/[A-Z]/.test(password)) {
            return enqueueSnackbar('Password should have a capital letter !',{variant:'error'})
        }else if(!/(?=.{8,})/.test(password)){
            return enqueueSnackbar('Password should have minimum six character !',{variant:'error'})
        }

        createUser(email,password)
        .then(()=>{
            setProfile(name,photo)
            .then(()=>{
                navigate('/' )
                axiosPublic.post('/users',{name,email})
                .then(result=>{
                    console.log(result.data);
                    form.reset();
                    if (result.data.insertedId) {
                       return enqueueSnackbar('Account created successfully!',{variant:'success'})
                    }
                    return enqueueSnackbar('User already exist!',{variant:'error'})
                })
            })
            .catch(()=>{
                enqueueSnackbar('User email already exist!',{variant:'error'})
            })        
        })
        .catch(()=>{
            return enqueueSnackbar('User email already exist!',{variant:'error'})
        })
       
    }


    const handleGoogle = () => {
        googleLogIn()
        .then(result=> {
            const email = result?.user?.email
            const name = result?.user?.displayName
            axiosPublic.post('/users',{name,email})
                .then(result=>{
                    console.log(result.data);
                    navigate('/' )
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
                    <div className="hidden lg:block lg:w-3/4 bg-cover bg-[url('https://i.ibb.co/tCks9X4/female-hand-typing-keyboard-laptop.jpg')]"></div>
                    <div className="w-full p-8 lg:w-1/2">
                    <Heading>Get started today!</Heading>
                    <p className="text-sm text-center mt-5">Log in to your account to access your personalized dashboard, view your saved cars, and continue your car-buying journey.</p>
                    <button className="flex w-72 mx-auto items-center justify-center my-6 border border-gray rounded-lg shadow-md hover:bg-gray-100 active:scale-95 duration-500"  onClick={handleGoogle}>
                            <FcGoogle className='text-2xl'></FcGoogle>
                            <p className="px-4 py-3 w-5/6 text-center text-gray-600 font-medium">Sign in with Google</p>
                        </button>
                        <div className="my-5 flex items-center justify-between">
                            <span className="border-b border-black/10 w-1/5 md:w-1/3"></span>
                            <Link to="" className="text-xs text-center text-gray-500 ">or register with email</Link>
                            <span className="border-b border-black/10 w-1/5 md:w-1/3"></span>
                        </div>
                    <form onSubmit={handleRegister}>
                        <div className="relative mt-10">
                        <input name='name' className="w-full bg-gray text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Name" required/>
                    <CgProfile className="absolute right-3 bottom-4"></CgProfile>
                        </div>
                        <div className="relative my-5">
                        <input name='image' className="w-full bg-gray text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Image URL" required/>
                    <BsImageAlt className="absolute right-3 bottom-4"></BsImageAlt>
                        </div>
                        <div className="relative">
                        <input name='email' className="w-full bg-gray text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Email" required/>
                    <MdOutlineAlternateEmail className="absolute right-3 bottom-4"></MdOutlineAlternateEmail>
                        </div>
                        <div className="relative my-5">
                        <input name='password' className="w-full bg-gray text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline "
                    type="text" placeholder="Password" required />
                    <AiOutlineEye className="absolute right-3 bottom-3"></AiOutlineEye>
                        </div>
                        <Input type="submit" className="bg-light-teal text-xl py-3 border-none mt-5 cursor-pointer" value='Register'></Input>
                    </form>
                        
                        <p className="mt-5 text-sm font-light">Already have an Account? Please <Link to='/login' className="underline underline-offset-4 text-teal">Log in!</Link></p>
                    </div>
            </div>
        </div>
    )
}
export default Signup;