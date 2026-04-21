import { Radio, Select, Slider } from "antd";
import Heading from "../../Components/Heading/Heading";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../hook/useAxiosPublic'
import BiodataCard from "../Shared/BiodataCard/BiodataCard";
import Loader from '../../Components/Loader/Loader'
import Navbar from "../Shared/Navbar/Navbar";
import SubHeading from "../../Components/SubHeading/SubHeading";
import { PiSealWarningFill } from "react-icons/pi";


const Biodatas = () => {

    const axiosPublic = useAxiosPublic()
    const [type,setType] = useState('')
    const [maxAge,setMaxAge] = useState(40)
    const [minAge,setMinAge] = useState(18)
    const [location,setLocation] = useState('')
    
    const onAfterChange = value => {
        setMinAge(value[0])
        setMaxAge(value[1])
    }

    const {data:biodatas = [],isPending} = useQuery({
        queryKey:['biodatas',maxAge,minAge,type,location],
        queryFn:() => axiosPublic.get(`/biodatas?type=${type}&maxAge=${maxAge}&minAge=${minAge}&location=${location}`)
    })

    const locations = [
        {value:'',label:'All'},
        { value: 'Dhaka', label: 'Dhaka' },
        { value: 'Chattagram', label: 'Chattagram' },
        { value: 'Rangpur', label: 'Rangpur' },
        { value: 'Barisal', label: 'Barisal' },
        { value: 'Khulna', label: 'Khulna' },
        { value: 'Mymensingh', label: 'Mymensingh' },
        { value: 'Sylhet', label: 'Sylhet' }
      ];

    return (
        <div className="">
            <div className="bg-[url(https://i.ibb.co/dDJSsKG/Untitled-designas-1.png)] bg-no-repeat bg-cover w-screen h-96 bg-fixed top-0">
            <Navbar></Navbar>
            <div className="lg:pt-44 pt-32 md:w-full w-3/4 mx-auto text-center z-50">
                <Heading>Biodatas</Heading>
                <SubHeading>Explore the beauty of relationships as you navigate through a space</SubHeading>
            </div>
            </div>
            <div className="pb-52 flex">
                <div className="w-60 lg:block hidden shadow-lg border-t-4 border-teal h-screen p-4">
                    <h1 className="my-5 text-center text-xl font-bold border-l-teal border-l-4 w-fit pl-2">Filter Biodatas</h1>
                    <p className="mt-10 text-sm mb-3">Age (Min to Max)</p>
                    <Slider onAfterChange={onAfterChange} range={{draggableTrack: true}} defaultValue={[18, 40]} max={40} min={18}/>
                    <p className="mt-10 text-sm mb-3">Permanent Location</p>
                    <Select placeholder="Division" onChange={(value)=>setLocation(value)} options={locations} className="w-52 mb-10"/>
                    <p className="text-sm mb-2">Biodata Type</p>
                    <Radio.Group onChange={e=>setType(e.target.value)} value={type}>
                        <Radio value={'Male'}>Male</Radio>
                        <Radio value={'Female'}>Female</Radio>
                        <Radio value={''}>All</Radio>
                    </Radio.Group>
                </div>
                <div className="text-center mt-8 mx-auto">
                    <div className="shadow lg:hidden rounded-xl mx-4 grid grid-cols-2 md:grid-cols-3 p-5 gap-y-5 place-items-center align-middle ">
                        <div className="h-fit">
                            <p className="text-sm">Age (Min to Max)</p>
                            <Slider onAfterChange={onAfterChange} range={{draggableTrack: true}} defaultValue={[18, 40]} max={40} min={18}/>
                        </div>
                        <div className="h-fit">
                            <p className="text-sm mb-1">Permanent Location</p>
                            <Select placeholder="Division" onChange={(value)=>setLocation(value)} options={locations} className="w-36 h-7"/>
                        </div>
                        <div className="h-fit col-span-full md:col-auto">
                            <p className="text-sm mb-1">Biodata Type</p>
                            <Radio.Group onChange={e=>setType(e.target.value)} value={type}>
                                <Radio value={'Male'}>Male</Radio>
                                <Radio value={'Female'}>Female</Radio>
                                <Radio value={''}>All</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="flex gap-16 flex-wrap justify-center mx-auto tex-center items-center">
                        {
                            !isPending ? biodatas?.data?.length ? biodatas?.data?.map(biodata=><BiodataCard key={biodata._id} biodata={biodata}></BiodataCard>) 
                            :
                            <div>
                                <PiSealWarningFill className="w-fit mx-auto text-8xl text-teal mb-5"/>
                                <p>No Biodata Available!</p>
                            </div> 
                            :
                            <Loader width='52'></Loader>
                        }
                    </div>
                </div>
            </div>
        </div>
    )}
export default Biodatas;