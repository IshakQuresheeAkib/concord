import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data:isAdmin = false,isPending} = useQuery({
        queryKey:[user?.email],
        queryFn:async()=> {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data?.admin;
        }
    }) 

    return [isAdmin,isPending]
}
export default useAdmin;