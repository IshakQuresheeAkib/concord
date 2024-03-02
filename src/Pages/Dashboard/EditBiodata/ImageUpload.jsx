import { FaEdit   } from "react-icons/fa";
import {  useEffect, useRef, useState } from "react";
import UseImagebb from "../../../hook/useImagebb";


const ImageUpload = ({setImageLink,imageLink,userBiodata}) => {
    
    
    const imageRef = useRef()
    const [imageFile,setImageFile] = useState('')    
    
    useEffect( ()=>{
        const unSubscribe = async () => {
            if (imageFile) {
                const imageUrl = await UseImagebb(imageFile)
                setImageLink(imageUrl)
                
            }
        }
        unSubscribe()
    },[imageFile,setImageLink])

    

    return (
        <div className="w-fit h-fit mx-auto my-5">
            <div className="relative rounded-full cursor-pointer" onClick={()=>imageRef.current.click()}>
                 {
                    userBiodata?.ProfileImageLink || imageLink ? <img src={imageFile ? URL.createObjectURL(imageFile) : userBiodata?.ProfileImageLink} alt="" className="w-36 h-36 rounded-full mx-auto object-cover"/> : <div className="w-36 h-36 rounded-full border-white text-white flex flex-col items-center justify-center border">
                        <p className=" text-3xl">+</p>
                        <p>Upload Image</p>
                    </div>
                }
                <FaEdit className="absolute top-1 z-50 text-white text-xl right-3 bg-teal"/>
            <input type="file" ref={imageRef} className="hidden" onChange={(e)=>setImageFile(e.target.files[0])}/>
            </div>
            
        </div>
    )
}
export default ImageUpload;



