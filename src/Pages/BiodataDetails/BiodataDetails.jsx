import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hook/useAxiosSecure";
import BiodataCard from "../Shared/BiodataCard/BiodataCard";
import Heading from "../../Components/Heading/Heading";
import { FiHeart } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { Button } from "antd";
import usePremium from "../../hook/usePremium";
import { enqueueSnackbar } from "notistack";
import useBiodata from "../../hook/useBiodata";
import useAuth from "../../hook/useAuth";

const BiodataDetails = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isPremium] = usePremium();

    const [biodata,refetch] = useBiodata();

    const {BiodataId,Name,BiodataType,ProfileImageLink,Age,Occupation,PermanentDivision,FathersName,MothersName,PresentDivision,Height,Weight,DateOfBirth,Race,ExpectedPartnerAge,ExpectedPartnerWeight,ExpectedPartnerHeight,ContactEmail,MobileNumber} = biodata || {}


    const {data:biodatas = []} = useQuery({
        queryKey:['biodatas',biodata],
        queryFn:()=> axiosSecure.get(`/biodatas?type=${BiodataType}`)
    })

    const handleFavourite = () => {        
            axiosSecure.post('/favorites-biodata',{Name,BiodataId,PermanentDivision,Occupation,userEmail:user?.email})
            .then(result=>{
                console.log(result?.data);
                if (result?.data.insertedId) {
                    enqueueSnackbar('Added to Favourite Biodata Successfully!',{variant:'success'})
                    refetch()
                }
                if (result?.data?.status === 403) {
                    enqueueSnackbar('Already added to Favourite!',{variant:'warning'})
                }
            })
    }

    return (
        <div className="mt-14">
            <Heading>Details Biodata</Heading>
            <div className="max-w-7xl mx-auto mb-40 flex gap-20 justify-between">
                <div className="w-3/4">
                    <div className="mt-10 border-b-8 shadow rounded-xl border-light-teal flex h-fit py-10 px-10 justify-between items-center">                          
                        <div className="">
                            <img className="w-40 rounded-2xl mb-5" src={ProfileImageLink}/>
                            <div>
                            <h4 className="text-5xl font-bold">{Name}</h4>
                            <h4 className="text-xl">{Occupation}</h4>
                            </div>
                        </div>
                        <div className="border h-96 border-dotted border-light-teal mr-10"></div>
                        <div className="w-1/2 tracking-wide leading-10">
                            <h2 className="font-semibold">Biodata Id: {BiodataId}</h2>
                            <h2 className="font-semibold">Fathers Name: {FathersName}</h2>
                            <h2 className="font-semibold">Mothers Name: {MothersName}</h2>
                            <h2 className="font-semibold">Permanent Address: {PermanentDivision}</h2>
                            <h2 className="font-semibold">Present Address: {PresentDivision}</h2>
                            <h2 className="font-semibold">Date of Birth: {DateOfBirth}</h2>
                            <h2 className="font-semibold">Race: {Race}</h2>
                            <h2 className="font-semibold">Age: {Age} years old</h2>
                            <h2 className="font-semibold">Expected Partner Age: Around {ExpectedPartnerAge} years old</h2>
                            <h2 className="font-semibold">Height: {Height}</h2>
                            <h2 className="font-semibold">Expected Partner Height: {ExpectedPartnerHeight}</h2>
                            <h2 className="font-semibold">Weight: {Weight}</h2>
                            <h2 className="font-semibold">Expected Partner Weight: {ExpectedPartnerWeight}</h2>
                            {
                                isPremium && <div>
                                    <h2 className="font-semibold">Email: {ContactEmail}</h2>
                                    <h2 className="font-semibold">Contact Number: {MobileNumber}</h2>
                                </div>
                            }

                    
                        </div>
                    </div>
                    <div className="flex justify-center mt-5 gap-10 mx-auto ">
                    <Button type="" onClick={handleFavourite} className="bg-teal text-white" icon={<FiHeart />}>Add to Favourite</Button>
                    {
                        isPremium || <Button type="" onClick={()=>navigate(`/checkout/${BiodataId}`)} className="bg-teal text-white" icon={<LuPhoneCall />}>Request for Contact info</Button>
                    }
                    </div>
                </div>
                <div className=""> 
                    <h2 className="text-center text-2xl font-bold text-teal border-r-4 w-fit mx-auto pr-2">Similar {BiodataType} Biodatas</h2>             
                        <div className=" gap-16 flex-wrap justify-center items-center mt-8">
                                {
                                    biodatas?.data && biodatas?.data.map(biodata=><BiodataCard key={biodata._id} biodata={biodata}></BiodataCard>)
                                }
                        </div>
                </div>
            </div>
        </div>
    )}
export default BiodataDetails;