import useBiodata from "../../../hook/useBiodata";
import PrimaryBtn from "../../../Components/Button/PrimaryBtn";
import { RiShieldStarLine } from "react-icons/ri";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { enqueueSnackbar } from "notistack";
import usePremium from "../../../hook/usePremium";
import Loader from "../../../Components/Loader/Loader";
import { TfiBag } from "react-icons/tfi";

const ViewBiodata = () => {


    const [isPremium,premiumPending] = usePremium();
    const [biodata] = useBiodata();
    const axiosSecure = useAxiosSecure();
    
    if (premiumPending) {
        return <Loader width='52'></Loader>
    }

    const {BiodataId,Name,ProfileImageLink,Age,Occupation,PermanentDivision,FathersName,MothersName,PresentDivision,Height,Weight,DateOfBirth,Race,ExpectedPartnerAge,ExpectedPartnerWeight,ExpectedPartnerHeight,ContactEmail,MobileNumber} = biodata || {}

    const handlePremium = () =>{
        axiosSecure.post('/biodatas/admin/premium-request',{Name,Email:ContactEmail,BiodataId})
        .then(res=>{
            if (res.data?.insertedId) {
                return enqueueSnackbar('Requested For being Premium Biodata!',{variant:'success'})
            }
            if (res?.data.status === 403) {
                return enqueueSnackbar('Already Requested!',{variant:'warning'})
            }
        })
    }
    

    return (
        <div className="min-h-screen flex items-center justify-center">
            {
                biodata ? <div className="border-t-8 shadow border-light-teal flex md:flex-row flex-col py-5 2xl:px-10 px-5 gap-10 justify-between items-center">                          
                <div className="h-fit">
                    <img className="w-40 h-40 md:mx-0 mx-auto object-cover rounded-full mb-5" src={ProfileImageLink}/>
                    <div>
                    <h4 className="text-5xl font-bold md:text-left text-center">{Name}</h4>
                    <div className="flex items-center md:justify-normal justify-center text-xl mt-4">
                                <TfiBag className=""/>
                                <h1 className="px-2 text-xl">{Occupation}</h1>
                            </div>
                    </div>
                    {
                       isPremium || <div onClick={handlePremium} className="pt-10">
                            <PrimaryBtn data={'Make Biodata Premium'} icon={<RiShieldStarLine />}></PrimaryBtn>
                        </div>
                    }
                </div>
                <div className="border md:h-96 md:w-0 w-80 border-dotted border-light-teal 2xl:mr-10"></div>
                <div className=" tracking-wide leading-10">
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
                    <h2 className="font-semibold">Email: {ContactEmail}</h2>
                    <h2 className="font-semibold">Contact Number: {MobileNumber}</h2>                   
                </div>
                </div> : <h2 className="text-2xl font-bold text-dark-blue">You dont have biodata!</h2>
            }
        </div>
    )}
export default ViewBiodata;