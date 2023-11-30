import axios from "axios";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { enqueueSnackbar } from "notistack";

const axiosSecure = axios.create({
    baseURL:'https://assignment-12-server-delta-ruddy.vercel.app',
    withCredentials:true
})

const useAxiosSecure = () => {
    // const {logOut} = useAuth();
    // const navigate = useNavigate();

    // useEffect(()=>{
    //     axiosSecure.interceptors.response.use(res=>res,error=>{
    //         if (error.response.status === 403 || error.response.status === 401) {
    //             logOut()
    //             .then(()=>{
    //                 enqueueSnackbar('Your session is time out,Please log in again!',{variant:'error'})
    //                 return navigate('/login')
    //             })
    //             .catch(err=>console.log(err))
    //         }
    //     })
    // },[logOut,navigate])

    return axiosSecure;
}
export default useAxiosSecure;