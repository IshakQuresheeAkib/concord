import Heading from "../../../Components/Heading/Heading";
import {  DatePicker, Select } from "antd";
import useUserBiodata from "../../../hook/useUserBiodata";
import { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { enqueueSnackbar } from "notistack";

const EditBiodata = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userBiodata] = useUserBiodata();
    const [BiodataType,setBiodataType] = useState('')
    const [Height,setHeight] = useState('')
    const [Weight,setWeight] = useState('')
    const [Occupation,setOccupation] = useState('')
    const [Race,setRace] = useState('')
    const [PresentDivision,setPresentDivision] = useState('')
    const [PermanentDivision,setPermanentDivision] = useState('')
    const [ExpectedPartnerHeight,setExpectedPartnerHeight] = useState('')
    const [ExpectedPartnerWeight,setExpectedPartnerWeight] = useState('')
    

    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const Name = form.name.value;
        const ProfileImageLink = form.image.value;
        const DateOfBirth = form.date.value;
        const Age = form.age.value;
        const FathersName = form.FathersName.value;
        const MothersName = form.MothersName.value;
        const ExpectedPartnerAge = form.ExpectedPartnerAge.value;
        const MobileNumber = form.MobileNumber.value;

        

        const biodata = {Name,ProfileImageLink,DateOfBirth,Age,BiodataType,FathersName,MothersName,ExpectedPartnerAge,Height,Weight,Race,Occupation,PresentDivision,PermanentDivision,ExpectedPartnerHeight,ExpectedPartnerWeight,ContactEmail:user?.email,MobileNumber}
        console.log(biodata);
        console.log(userBiodata);

        if (!userBiodata) {
            axiosSecure.post('/biodatas',biodata)
            .then(data=>{
                console.log(data.data);
                if (data.data.insertedId) {enqueueSnackbar('Biodata Added Successfully!',{variant:'success'})}
            })
            return;
        }

        axiosSecure.put('/biodatas',biodata)
        .then(data=>{
            console.log(data.data);
            if (data.data.modifiedCount) {enqueueSnackbar('Biodata Updated Successfully!',{variant:'success'})}
        })
        
    }
    
    // TODO : make required the field which is necessary
    // created biodataId

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
        <div className="my-10 max-w-5xl mx-auto ">
            <Heading>{userBiodata ? 'Edit' : 'Create'} Biodata</Heading>
            <form onSubmit={handleSubmit} className="bg-teal px-16 pb-10 pt-px mt-5 rounded-2xl shadow-xl font-light">
                <div className="grid grid-cols-2 place-content-center gap-x-20 gap-y-5 mt-20">                        
                        <input defaultValue={userBiodata?.Name} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" name="name" placeholder="Name" />
                        <input defaultValue={userBiodata?.ProfileImageLink} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" name="image" placeholder="Profile Image" />                                                
                        <input defaultValue={userBiodata?.Age} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="number" placeholder="Age" name="age"/>
                        <Select placeholder="Biodata type"  onChange={value=>setBiodataType(value)}
                        options={[ {value: 'Male'},{value: 'Female'}]} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg"/>
                        <DatePicker className="bg-gray mt-2 rounded-lg font-normal" placeholder="Date of birth" name="date"/>
                        <Select placeholder="Occupation" onChange={value=>setOccupation(value)}
                        options={[ {value: 'job', label: 'Job'},{value: 'student', label: 'Student'},{value: 'housewife', label: 'Housewife'}]} className="font-normal mt-2 h-[48px] rounded-lg"/>
                        <input defaultValue={userBiodata?.FathersName} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Fathers name" name='FathersName' />
                        <input defaultValue={userBiodata?.MothersName} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Mothers name" name='MothersName' />
                        <Select placeholder="Height" onChange={value=>setHeight(value)}
                        options={[ {value: 'Short'},{value: 'Medium height'},{value: 'Tall'}]} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg "/>
                        <Select placeholder="Weight" onChange={value=>setWeight(value)}
                        options={[ {value: 'Slim'},{value: 'Medium figure'},{value: 'Muscly'}]} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg "/>
                        <Select placeholder="Race" onChange={value=>setRace(value)}
                        options={[ {value: 'Bright'},{value: 'Brown'},{value: 'Dark'}]} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg "/>
                        <Select placeholder="Permanent Division" onChange={value=>setPermanentDivision(value)}
                        options={locations} 
                        className=" bg-gray font-normal mt-2 h-[48px] rounded-lg "/>
                        <Select placeholder="Present Division" onChange={value=>setPresentDivision(value)}
                        options={locations} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg "/>
                        <Select placeholder="Expected Partner Height" onChange={value=>setExpectedPartnerHeight(value)}
                        options={[ {value: 'Short'},{value: 'Medium height'},{value: 'Tall'}]} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg "/>
                        <Select placeholder="Expected Partner Weight" onChange={value=>setExpectedPartnerWeight(value)}
                        options={[ {value: 'Slim'},{value: 'Medium figure'},{value: 'Muscly'}]} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg "/>
                        <input defaultValue={userBiodata?.ExpectedPartnerAge} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="number" placeholder="Expected Partner Age" name="ExpectedPartnerAge"/>
                        <input defaultValue={user?.email} readOnly className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" />
                        <input defaultValue={userBiodata?.MobileNumber} className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="number" placeholder="Phone"  name='MobileNumber' required/>
                </div>
                    <input type="submit" value='Save & Publish' className="bg-white font-medium mx-auto py-3 mt-10 flex items-center justify-center w-44 text-lg hover:bg-light-teal duration-300 rounded-3xl cursor-pointer" />
            </form>
        </div>
    );
};

export default EditBiodata;