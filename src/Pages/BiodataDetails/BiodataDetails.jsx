import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import BiodataCard from "../Shared/BiodataCard/BiodataCard";
import Heading from "../../Components/Heading/Heading";
import { FiHeart } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { Button, Modal } from "antd";
import usePremium from "../../hook/usePremium";
import { enqueueSnackbar } from "notistack";
import useBiodata from "../../hook/useBiodata";
import useAuth from "../../hook/useAuth";
import { TfiBag } from "react-icons/tfi";
import backgroundSVG from '../../../public/svg-background.svg'
import useAdmin from "../../hook/useAdmin";
import Loader from "../../Components/Loader/Loader";
import { useState } from "react";
import Checkout from "../Checkout/Checkout";


const BiodataDetails = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isPremium,premiumPending] = usePremium();
    const [isAdmin,isPending] = useAdmin();

    const [biodata,refetch,isLoading] = useBiodata();

    const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


    const {BiodataId,Name,BiodataType,ProfileImageLink,Age,Occupation,PermanentDivision,FathersName,MothersName,PresentDivision,Height,Weight,DateOfBirth,Race,ExpectedPartnerAge,ExpectedPartnerWeight,ExpectedPartnerHeight,ContactEmail,MobileNumber} = biodata || {}


    const {data:biodatas = []} = useQuery({
        queryKey:['biodatas',biodata],
        queryFn:()=> axiosSecure.get(`/biodatas?type=${BiodataType}`)
    })

    
    const {data:isRequested = []} = useQuery({
        queryKey:['requestedBiodatas',BiodataId],
        queryFn:() => axiosSecure.get(`/contact-request?id=${BiodataId}&UserEmail=${user?.email}`)
    })
    
    if (isLoading || isPending || premiumPending ) {
        return <Loader width='52'></Loader>;
    }

    const requested = isRequested?.data?.message;
    const handleFavourite = () => {        
            axiosSecure.post('/favorites-biodata',{Name,BiodataId,PermanentDivision,Occupation,userEmail:user?.email})
            .then(result=>{
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
        <div>
            <img loading="lazy" className="w-full absolute top-0 h-96 object-cover -z-50" src={backgroundSVG}></img>
            <div className="max-w-6xl 2xl:mx-auto mx-10 my-52 gap-20 justify-between z-50 bg-white rounded-xl">
                <div className="mt-10 border-b-8 shadow rounded-xl border-teal flex md:flex-row flex-col py-10 lg:px-10 px-4 md:justify-between justify-center items-center">                          
                    <div className="">
                        <img loading="lazy" className="w-52 h-52 rounded-full object-cover mb-5 md:mx-0 mx-auto" src={ProfileImageLink}/>
                        <div className="flex flex-col md:items-start items-center md:text-left text-center">
                        <h4 className="text-4xl font-bold">{Name}</h4>
                        <div className="flex items-center text-xl mt-4">
                            <TfiBag className=""/>
                            <h1 className="px-2 text-xl">{Occupation}</h1>
                        </div>
                        </div>
                        <div className="flex md:flex-row flex-col md:justify-normal justify-center mt-9 gap-10 mx-auto ">
                            <Button type="" onClick={handleFavourite} className="bg-teal text-white" icon={<FiHeart />}>Add to Favourite</Button>
                            {
                                !isPremium && !isAdmin && !requested && <Button type="" onClick={showModal} className="bg-teal text-white" icon={<LuPhoneCall />}>Request for Contact info</Button> 
                            }
                        </div>
                    </div>
                    <div className="border md:h-96 md:w-0 w-72 border-dotted border-light-teal md:mr-10 md:my-0 my-20"></div>
                    <div className="md:w-1/2 tracking-wide leading-10">
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
                            (isPremium || isAdmin) && <div>
                                <h2 className="font-semibold">Email: {ContactEmail}</h2>
                                <h2 className="font-semibold">Contact Number: {MobileNumber}</h2>
                            </div>
                        }

                
                    </div>
                </div>                                 
            </div>
            <Modal open={isModalOpen} type='primary' onOk={handleOk} onCancel={handleCancel} footer={[]} >
            <Checkout></Checkout>
            </Modal>   
            <div className=""> 
                <Heading>Similar {BiodataType} Biodatas</Heading>
                <div className="flex gap-20 flex-wrap justify-center items-center mt-16">
                        {
                            biodatas?.data && biodatas?.data.map(biodata=><BiodataCard key={biodata._id} biodata={biodata}></BiodataCard>)
                        }
                </div>
            </div>
        </div>
    )}
export default BiodataDetails;

