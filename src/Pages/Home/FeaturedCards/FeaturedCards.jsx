import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Heading from "../../../Components/Heading/Heading";
import BiodataCard from "../../Shared/BiodataCard/BiodataCard";

const FeaturedCards = () => {

    const axiosSecure = useAxiosSecure()

    const {data = []} = useQuery({
        queryKey:['premiumBiodatas'],
        queryFn:()=> axiosSecure.get('/biodatas-premium')
    })

    const biodatas = data?.data || []

    return (
        <div className="my-36 max-w-7xl mx-auto">
             <Heading>Featured Biodata</Heading>
             <p className="text-center mt-3">Explore the beauty of relationships as you navigate through a space!</p>
             <div className="flex flex-wrap justify-center gap-10">
                {
                    biodatas?.map(biodata=><BiodataCard biodata={biodata} key={biodata?._id}></BiodataCard>)
                }
             </div>
        </div>
    )}
export default FeaturedCards;