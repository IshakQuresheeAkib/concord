import Heading from "../../../Components/Heading/Heading";
import {  DatePicker, Select } from "antd";
import useUserBiodata from "../../../hook/useUserBiodata";
import { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { enqueueSnackbar } from "notistack";
import ImageUpload from "./ImageUpload";
import Loader from '../../../Components/Loader/Loader'

const EditBiodata = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userBiodata,refetch,isLoading] = useUserBiodata();
    const [BiodataType,setBiodataType] = useState(userBiodata?.BiodataType)
    const [Height,setHeight] = useState(userBiodata?.Height)
    const [Weight,setWeight] = useState(userBiodata?.Weight)
    const [Occupation,setOccupation] = useState(userBiodata?.Occupation)
    const [Race,setRace] = useState(userBiodata?.Race)
    const [PresentDivision,setPresentDivision] = useState(userBiodata?.PresentDivision)
    const [PermanentDivision,setPermanentDivision] = useState(userBiodata?.PermanentDivision)
    const [ExpectedPartnerHeight,setExpectedPartnerHeight] = useState(userBiodata?.ExpectedPartnerHeight)
    const [ExpectedPartnerWeight,setExpectedPartnerWeight] = useState(userBiodata?.ExpectedPartnerWeight)
    const [imageLink,setImageLink] = useState(userBiodata?.ProfileImageLink)
    
    if (isLoading) {
        return <Loader width='52'></Loader>
    }
    
    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const Name = form.name.value;
        const DateOfBirth = form.date.value;
        const Age = form.age.value;
        const FathersName = form.FathersName.value;
        const MothersName = form.MothersName.value;
        const ExpectedPartnerAge = form.ExpectedPartnerAge.value;
        const MobileNumber = form.MobileNumber.value;
               
        const biodata = {Name,ProfileImageLink:imageLink,DateOfBirth,Age,BiodataType,FathersName,MothersName,ExpectedPartnerAge,Height,Weight,Race,Occupation,PresentDivision,PermanentDivision,ExpectedPartnerHeight,ExpectedPartnerWeight,ContactEmail:user?.email,MobileNumber}
              

        if (!userBiodata) {
            axiosSecure.post('/biodatas',biodata)
            .then(data=>{              
                if (data.data.insertedId) {
                    refetch()
                    enqueueSnackbar('Biodata Added Successfully!',{variant:'success'}
                )}
            })
            return;
        }

        axiosSecure.put('/biodatas',biodata)
        .then(data=>{
            
            if (data.data.modifiedCount) {
                refetch();
                enqueueSnackbar('Biodata Updated Successfully!',{variant:'success'}
                )}
        })
        
    }
    

    const locations = [
        { value: 'Dhaka'},
        { value: 'Chattagram'},
        { value: 'Rangpur'},
        { value: 'Barisal'},
        { value: 'Khulna'},
        { value: 'Mymensingh'},
        { value: 'Sylhet'}
    ];
    
    return (
        <div className="my-10 max-w-5xl 2xl:mx-auto mx-5">
            <Heading>{userBiodata ? 'Edit' : 'Create'} Biodata</Heading>
            <form onSubmit={handleSubmit} className="bg-teal 2xl:px-16 px-5 pb-10 pt-px mt-5 rounded-2xl shadow-xl font-light">
                <ImageUpload setImageLink={setImageLink} imageLink={imageLink} userBiodata={userBiodata}></ImageUpload>
                <div className="grid grid-cols-2 place-content-center 2xl:gap-x-20 sm:gap-x-10 gap-x-5 gap-y-5">
                    <div>
                        <label className="text-white font-semibold">Name</label>
                        <input defaultValue={userBiodata?.Name} className="w-full bg-gray font-normal mt-2 p-3 rounded-lg"
                        type="text" name="name" placeholder="Name" required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Age</label>
                        <input min='18' max='50' defaultValue={userBiodata?.Age} className="w-full bg-gray font-normal mt-2 p-3 rounded-lg "
                        type="number" placeholder="Age" name="age" required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Biodata Type</label>
                        <Select placeholder="Biodata type" defaultValue={userBiodata?.BiodataType} onChange={value=>setBiodataType(value)}
                        options={[ {value: 'Male'},{value: 'Female'}]} className=" bg-gray w-full font-normal mt-2 h-[48px] rounded-lg" required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Date of Birth</label>
                        <DatePicker className="bg-gray w-full mt-2 h-[48px] rounded-lg font-normal" placeholder="Date of birth" name="date" required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Occupation</label>
                        <Select placeholder="Occupation" defaultValue={userBiodata?.Occupation} onChange={value=>setOccupation(value)}
                        options={[ {value: 'job', label: 'Job'},{value: 'student', label: 'Student'},{value: 'housewife', label: 'Housewife'}]} className="font-normal w-full mt-2 h-[48px] rounded-lg" required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Father Name</label>
                        <input defaultValue={userBiodata?.FathersName} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg"
                        type="text" placeholder="Father name" name='FathersName' required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Mother Name</label>
                        <input defaultValue={userBiodata?.MothersName} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg"
                        type="text" placeholder="Mother name" name='MothersName' required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Height</label>
                        <Select placeholder="Height" defaultValue={userBiodata?.Height} onChange={value=>setHeight(value)}
                        options={[ {value: 'Short'},{value: 'Medium height'},{value: 'Tall'}]} className=" bg-gray w-full font-normal mt-2 h-[48px] rounded-lg " required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Weight</label>
                        <Select placeholder="Weight" defaultValue={userBiodata?.Weight} onChange={value=>setWeight(value)}
                        options={[ {value: 'Slim'},{value: 'Medium figure'},{value: 'Muscly'}]} className=" bg-gray w-full  font-normal mt-2 h-[48px] rounded-lg " required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Race</label>
                        <Select placeholder="Race" defaultValue={userBiodata?.Race} onChange={value=>setRace(value)}
                        options={[ {value: 'Bright'},{value: 'Brown'},{value: 'Dark'}]} className=" bg-gray w-full font-normal mt-2 h-[48px] rounded-lg " required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Permanent Division</label>
                        <Select placeholder="Permanent Division" defaultValue={userBiodata?.PermanentDivision} onChange={value=>setPermanentDivision(value)} options={locations} 
                        className=" bg-gray w-full font-normal mt-2 h-[48px] rounded-lg " required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Present Division</label>
                        <Select placeholder="Present Division" defaultValue={userBiodata?.PresentDivision} onChange={value=>setPresentDivision(value)}
                        options={locations} className=" bg-gray w-full font-normal mt-2 h-[48px] rounded-lg "/>
                    </div>
                    <div>
                    <label className="text-white font-semibold">Expected Partner Height</label>
                        <Select placeholder="Expected Partner Height" defaultValue={userBiodata?.ExpectedPartnerHeight} onChange={value=>setExpectedPartnerHeight(value)}
                        options={[ {value: 'Short'},{value: 'Medium height'},{value: 'Tall'}]} className=" bg-gray w-full font-normal mt-2 h-[48px] rounded-lg " required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Expected Partner Weight</label>
                        <Select placeholder="Expected Partner Weight"  defaultValue={userBiodata?.ExpectedPartnerWeight} onChange={value=>setExpectedPartnerWeight(value)}
                        options={[ {value: 'Slim'},{value: 'Medium figure'},{value: 'Muscly'}]} className=" bg-gray w-full font-normal mt-2 h-[48px] rounded-lg " required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Expected Partner Age</label>
                        <input defaultValue={userBiodata?.ExpectedPartnerAge} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg" type="number" placeholder="Expected Partner Age" name="ExpectedPartnerAge" required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Email Address</label>
                        <input defaultValue={user?.email} readOnly className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg"
                        type="text" required/>
                    </div>
                    <div>
                        <label className="text-white font-semibold">Phone</label>
                        <input defaultValue={userBiodata?.MobileNumber} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg"
                        type="number" placeholder="Phone"  name='MobileNumber' required/>
                    </div>
                </div>
                <input type="submit" value='Save & Publish' className="bg-white shadow font-medium mx-auto py-3 mt-10 flex items-center justify-center w-44 text-lg hover:bg-light-teal duration-700 rounded-3xl cursor-pointer" />
            </form>
        </div>
    );
};

export default EditBiodata;