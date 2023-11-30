import { MdOutlineLocationOn } from "react-icons/md";
import { TfiBag } from "react-icons/tfi";
import PrimaryBtn from "../../../Components/Button/PrimaryBtn";
import {  SendOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const BiodataCard = ({biodata}) => {

    const {BiodataId,BiodataType,ProfileImageLink,Age,Occupation,PermanentDivision} = biodata || {}
    const navigate = useNavigate();

    return (
        <div className="bg-gray-200 font-sans  flex flex-row justify-center items-center mt-36">
            <div className="mx-auto w-80 bg-white  shadow-lg hover:shadow duration-300 p-4 text-center">
                <img className="w-32 h-32 mx-auto rounded-full -mt-20 border-8 border-white" src={ProfileImageLink} alt=""/>
                <p className="text-center mt-2 font-light text-sm">Id:{BiodataId}</p>
                <h2 className="text-center my-2 text-3xl font-medium">{BiodataType}</h2>
                <div className="text-center font-normal">{Age} years old</div>
                <div className="flex my-5">
                <div className="w-1/2 text-sm text-center flex items-center justify-center gap-1">
                    <MdOutlineLocationOn  className="text-xl"/>
                    <p>{PermanentDivision}</p> 
                </div>
                <div className="w-0 border border-gray-300 mx-5"></div>
                <div className="w-1/2 text-sm  text-center flex items-center justify-center gap-1">
                    <TfiBag />
                    <p>{Occupation}</p> 
                </div>
                </div>
                <div className="py-3" onClick={()=>navigate(`/biodata-details/${BiodataId}`)}>
                <PrimaryBtn data={'View Profile'} icon={<SendOutlined />}></PrimaryBtn>
                </div>
            </div>
        </div>
        
    )}
export default BiodataCard;