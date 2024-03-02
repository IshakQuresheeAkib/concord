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
        <div className="my-36 2xl:mx-auto md:mx-8 relative">
             <Heading>Featured Biodata</Heading>
             <img loading="lazy" src="https://i.ibb.co/CzbNRYg/Untitled-designaaa-1.png" alt="" className="absolute xl:-right-20 -right-16 2xl:-top-20 -top-36 md:w-64 w-44 opacity-30"/>
             <p className="text-center mt-3 mb-20">Explore the beauty of relationships as you navigate through a space!</p>
             <div className="flex flex-wrap justify-center gap-11">
                {
                    biodatas?.map(biodata=><BiodataCard biodata={biodata} key={biodata?._id}></BiodataCard>)
                }
             </div>
        </div>
    )}
export default FeaturedCards;