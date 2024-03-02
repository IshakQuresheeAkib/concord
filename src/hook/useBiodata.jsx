import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBiodata = () => {

    const {user} = useAuth();
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();

    const {data = [],refetch,isLoading} = useQuery({
        queryKey:['biodata',id,user],
        queryFn: () => axiosSecure.get(`/biodata-details/${id}`)
    })
    const biodata = data?.data
    console.log();
    return [biodata,refetch,isLoading]
}
export default useBiodata;