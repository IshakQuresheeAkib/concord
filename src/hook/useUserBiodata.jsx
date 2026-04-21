import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import Loader from "../Components/Loader/Loader";

const useUserBiodata = () => {

    const {user} =useAuth();
    const axiosSecure = useAxiosSecure();

    const {data = [],refetch,isLoading} = useQuery({
        queryKey:['email',user],
        queryFn:()=>axiosSecure.get(`/biodatas/${user?.email}`)
    })

    const userBiodata = data?.data
    if (isLoading) {
        <Loader width='52'></Loader>
    }

    return [userBiodata,refetch,isLoading]
}
export default useUserBiodata;