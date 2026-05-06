import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
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
             <img loading="lazy" src="https://i.ibb.co/CzbNRYg/Untitled-designaaa-1.png" alt="" className="absolute -left-6 md:-left-14 2xl:-left-6 2xl:-top-10 md:-top-20 -top-28 md:w-64 w-32 opacity-20"/>
             <p className="text-center mt-3 mb-14">Explore the beauty of relationships as you navigate through a space!</p>
             <div className="flex flex-wrap justify-center gap-11">
                {
                    biodatas?.map(biodata=><BiodataCard biodata={biodata} key={biodata?._id}></BiodataCard>)
                }
             </div>
        </div>
    )}
export default FeaturedCards;