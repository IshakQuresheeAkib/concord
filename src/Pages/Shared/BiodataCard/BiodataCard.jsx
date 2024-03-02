import { MdOutlineLocationOn } from "react-icons/md";
import { TfiBag } from "react-icons/tfi";
import PrimaryBtn from "../../../Components/Button/PrimaryBtn";
import {  SendOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


const BiodataCard = ({biodata}) => {

    const {BiodataId,ProfileImageLink,Age,Occupation,PermanentDivision,Name,PresentDivision} = biodata || {}
    const navigate = useNavigate();

    return (
        <div className="w-full mt-7 2xl:max-w-sm max-w-xs overflow-hidden rounded-lg shadow-lg  hover:text-white" data-aos='slide-up'>
                <div className="flex items-center px-2 py-3 bg-teal">
                <img loading="lazy" className="object-cover w-32 h-32 rounded-full" src={ProfileImageLink} alt="avatar" />
                    <div className="text-left ml-3 ">
                    <h1 className="text-lg font-semibold text-white">{Name}</h1>
                    <p className="pt-1 text-white/80 text-sm">{PresentDivision !== PermanentDivision ? `I originally come from ${PermanentDivision}, and currently, I reside in ${PresentDivision}.` : `I'm originally from ${PermanentDivision}, and I currently reside here too.`}</p>

                    </div>
                </div>
                <div className="px-3 py-6 text-left duration-700 transition hover:bg-teal">
                    <h1 className="text-xl font-semibold ">Biodata ID: {BiodataId}</h1>                  
                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <CgProfile className="w-5 h-5"/>
                        <h1 className="px-2 text-sm">{Age} years old</h1>
                    </div>
                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <MdOutlineLocationOn className="w-5 h-5"/>
                        <h1 className="px-2 text-sm">{PresentDivision}</h1>
                    </div>

                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <TfiBag className="w-5 h-5"/>
                        <h1 className="px-2 text-sm">{Occupation}</h1>
                    </div>
                    <div className="pt-7 mx-auto w-fit" onClick={()=>navigate(`/biodata-details/${BiodataId}`)}>
                    <PrimaryBtn data={'View Profile'} icon={<SendOutlined />}></PrimaryBtn>
                </div>
                </div>
                
        </div>
        
    )}
export default BiodataCard;
