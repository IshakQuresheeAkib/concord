import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";

const useBiodata = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();

    const {data = [],refetch} = useQuery({
        queryKey:['biodata',id],
        queryFn: () => axiosSecure.get(`/biodata-details/${id}`)
    })
    const biodata = data?.data

    return [biodata,refetch]
}
export default useBiodata;