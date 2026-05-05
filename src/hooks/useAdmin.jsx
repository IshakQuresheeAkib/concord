import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {

    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    let isTrue = false;
    if (!loading && user) {
        isTrue = true
    }

    const {data:isAdmin = false,isPending} = useQuery({
        queryKey:[user?.email,isTrue,'isAdmin',user],
        enabled: isTrue ,
        queryFn:async()=> {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data?.admin;
        },
    }) 

    return [isAdmin,isPending]
}
export default useAdmin;