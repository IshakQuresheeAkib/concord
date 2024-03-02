import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaCloudUploadAlt  } from "react-icons/fa";
import { AiOutlineEye,AiOutlineEyeInvisible  } from 'react-icons/ai';
import Heading from '../../Components/Heading/Heading'
import { enqueueSnackbar } from "notistack";
import useAuth from '../../hook/useAuth'
import { FcGoogle } from 'react-icons/fc';
import useAxiosPublic from "../../hook/useAxiosPublic";
import { Button } from "antd";
import UseImagebb from "../../hook/useImagebb";
import { useState } from "react";
import { MdOutlineLink } from "react-icons/md";


const Signup = () => {

    const [isLoading,setIsLoading] = useState(false)
    const [imageName,setImageName] = useState('')
    const [isVisible,setIsVisible] = useState(false)
    const {createUser,setProfile,googleLogIn} = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const handleRegister = async (e) =>  {
        e.preventDefault();
        
        const form = e.target;
        const name = form.name.value;
        const profileImage = form.imageURL.files;
        const email = form.email.value;
        const password = form.password.value;
        console.log(profileImage);

       

        if (!/(?=.*[!#$%&?^*@~() "])/.test(password)) {
            return enqueueSnackbar('Password should have a special character!',{variant:'error'})
        }else if (!/[A-Z]/.test(password)) {
            return enqueueSnackbar('Password should have a capital letter !',{variant:'error'})
        }else if(!/(?=.{8,})/.test(password)){
            return enqueueSnackbar('Password should have minimum six character !',{variant:'error'})
        }
        setIsLoading(true)
        const imageUrl = await UseImagebb(profileImage[0])
        console.log(imageUrl);
        createUser(email,password)
        .then(()=>{
            setProfile(name,imageUrl)
            .then(()=>{
                navigate('/' )
                axiosPublic.post('/users',{name,email})
                .then(result=>{
                    console.log(result.data);
                    form.reset();
                    if (result.data.insertedId) {               
                       return enqueueSnackbar('Account created successfully!',{variant:'success'})
                    }
                    setIsLoading(false)
                    return enqueueSnackbar('User already exist!',{variant:'error'})
                })
            })
            .catch(()=>{
                 setIsLoading(false)
                 enqueueSnackbar('User email already exist!',{variant:'error'})
            })
        })
        .catch(()=>{
             setIsLoading(false)
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
        <div className="min-h-screen flex justify-center items-center mx-3" data-aos='fade-bottom'>
            <div className="w-full xl:p-10 p-5 rounded-lg shadow-lg overflow-hidden border my-5 border-black/5 max-w-sm md:max-w-lg">
            <Heading>Get started today!</Heading>
            <p className="text-sm text-center mt-5">Log in to your account to access your personalized dashboard, view your saved cars, and continue your car-buying journey.</p>
            <button className="flex w-72 mx-auto items-center justify-center my-6 border border-gray rounded-lg shadow-md hover:bg-gray-100 active:scale-95 duration-500"  onClick={handleGoogle}>
                    <FcGoogle className='text-2xl'></FcGoogle>
                    <p className="px-4 py-3 w-5/6 text-center text-gray-600 font-medium">Sign up with Google</p>
            </button>
            <div className="my-5 flex items-center justify-between">
                <span className="border-b border-black/10 w-1/5 md:w-1/3"></span>
                <Link to="" className="text-xs text-center text-black/50 ">or register with email</Link>
                <span className="border-b border-black/10 w-1/5 md:w-1/3"></span>
            </div>
            <form onSubmit={handleRegister}>
                <div className="relative my-5">
                    <input name='name' required className="w-full bg-gray p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Name" />
                    <CgProfile className="absolute right-3 bottom-4 text-lg"></CgProfile>
                </div>
                <div className="relative">
                    <input name='email' required className="w-full bg-gray p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Email" />
                    <MdOutlineAlternateEmail className="absolute right-3 bottom-4 text-lg"></MdOutlineAlternateEmail>
                </div>
                <div className="relative my-5">
                        <input name='password'  required className="w-full bg-gray p-3 rounded-lg focus:outline-none focus:shadow-outline "
                        type={isVisible ? 'text' :'password' } placeholder="Password"  />
                        <div  className="absolute right-3 bottom-4 text-lg w-fit cursor-pointer" onClick={()=>setIsVisible(!isVisible)}>
                            {
                                isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible/>
                            }
                        </div>
                </div>
                <label className='w-40 text-center'>
                    <div className='w-40 text-center bg-gray rounded-lg gap-2 p-3 cursor-pointer focus:outline-none focus:shadow-outline'>
                        <FaCloudUploadAlt className='text-xl text-black/80 mx-auto'/> 
                        <span className='text-sm text-black/30 normal-case font-normal'>Upload An Image *</span>
                    </div>
                    <input type="file" required name='imageURL' onChange={(e)=>setImageName(e.target.files[0].name)}  className={`w-0 h-0 file:hidden `} placeholder="Image URL" />
                    
                </label>
                {
                        imageName && <div className="flex items-center text-teal gap-1 h-0.5 mb-2">
                        <MdOutlineLink className="text-xl"></MdOutlineLink>
                        <span className="text-sm">{imageName.length > 35 ? `${imageName.slice(0,35)}.jpg` :imageName }</span>
                    </div>
                }
                <Button htmlType="submit" type="dark" loading={isLoading} className="bg-light-teal text-xl font-normal border-none mt-5 w-full h-11 cursor-pointer">Sign Up</Button>
            </form>
                
                <p className="mt-5 text-sm font-light">Already have an Account? Please <Link to='/login' className="underline underline-offset-4 text-teal">Log in!</Link></p>
            </div>
        </div>
    )
}
export default Signup;