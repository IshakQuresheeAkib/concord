import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserBiodata = () => {

    const {user} =useAuth();
    const axiosSecure = useAxiosSecure();

    const {data = [],refetch} = useQuery({
        queryKey:['email',user],
        queryFn:()=>axiosSecure.get(`/biodatas/${user?.email}`)
    })

    const userBiodata = data?.data

    return [userBiodata,refetch]
}
export default useUserBiodata;