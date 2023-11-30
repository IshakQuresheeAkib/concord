import useBiodata from "../../../hook/useBiodata";
import PrimaryBtn from "../../../Components/Button/PrimaryBtn";
import { RiShieldStarLine } from "react-icons/ri";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { enqueueSnackbar } from "notistack";
import usePremium from "../../../hook/usePremium";

const ViewBiodata = () => {


    const [isPremium] = usePremium();
    const [biodata] = useBiodata();
    const axiosSecure = useAxiosSecure();
    

    const {BiodataId,Name,ProfileImageLink,Age,Occupation,PermanentDivision,FathersName,MothersName,PresentDivision,Height,Weight,DateOfBirth,Race,ExpectedPartnerAge,ExpectedPartnerWeight,ExpectedPartnerHeight,ContactEmail,MobileNumber} = biodata || {}

    const handlePremium = () =>{
        console.log('hello');
        axiosSecure.post('/biodatas/admin/premium-request',{Name,Email:ContactEmail,BiodataId})
        .then(res=>{
            console.log(res?.data);
            if (res.data?.insertedId) {
                return enqueueSnackbar('Requested For being Premium Biodata!',{variant:'success'})
            }
            if (res?.data.status === 403) {
                return enqueueSnackbar('Already Requested!',{variant:'warning'})
            }
        })
    }
    

    return (
        <div className="h-screen flex items-center justify-center">
            {
                biodata ? <div className="border-b-8 shadow rounded-xl border-light-teal flex py-5 px-10 gap-10 justify-between items-center">                          
                <div className="">
                    <img className="w-40 rounded-2xl mb-5" src={ProfileImageLink}/>
                    <div>
                    <h4 className="text-5xl font-bold">{Name}</h4>
                    <h4 className="text-xl">{Occupation}</h4>
                    </div>
                    <div onClick={handlePremium} className="mt-10">
                        {
                            isPremium || <PrimaryBtn data={'Make Biodata Premium'} icon={<RiShieldStarLine />}></PrimaryBtn>
                        }
                    </div>
                </div>
                <div className="border h-96 border-dotted border-light-teal mr-10"></div>
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