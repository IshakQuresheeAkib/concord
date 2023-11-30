import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const usePremium = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();

    const {data:isPremium = false,isPending} = useQuery({
        queryKey:[user?.email,user],
        queryFn:async()=> {
            const res = await axiosPublic.get(`/users/premium/${user?.email}`)
            return res.data?.premium;
        }
    }) 

    return [isPremium,isPending]
}
export default usePremium;