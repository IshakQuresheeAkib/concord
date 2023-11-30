import { Radio, Select, Slider } from "antd";
import Heading from "../../Components/Heading/Heading";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../hook/useAxiosPublic'
import BiodataCard from "../Shared/BiodataCard/BiodataCard";
import Loader from '../../Components/Loader/Loader'

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
    console.log(type,'minAge',minAge,'maxAge',maxAge,location);

    const {data:biodatas = [],isPending} = useQuery({
        queryKey:['biodatas',maxAge,minAge,type,location],
        queryFn:() => axiosPublic.get(`/biodatas?type=${type}&maxAge=${maxAge}&minAge=${minAge}&location=${location}`)
    })
    console.log(biodatas?.data);

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
        <div className="min-h-screen mb-40 flex">
             <div className="w-60 shadow-lg border-r-4 border-teal h-screen p-4">
                <h1 className="my-5 text-center text-xl font-bold border-l-teal border-l-4 w-fit pl-2">Filter Biodatas</h1>
                <p className="mt-10 text-sm mb-3">Filter by Age (Min to Max)</p>
                <Slider onAfterChange={onAfterChange} range={{draggableTrack: true}} defaultValue={[18, 40]} max={40} min={18}/>
                <p className="mt-10 text-sm mb-3">Filter by Permanent Location</p>
                <Select placeholder="Division" onChange={(value)=>setLocation(value)} options={locations} className="w-52 mb-10"/>
                <p className="text-sm mb-2">Biodata Type</p>
                <Radio.Group onChange={e=>setType(e.target.value)} value={type}>
                    <Radio value={'Male'}>Male</Radio>
                    <Radio value={'Female'}>Female</Radio>
                    <Radio value={''}>All</Radio>
                </Radio.Group>
             </div>
             <div className="text-center mt-8 mx-auto">
                <Heading>Biodatas</Heading>
                <p className="mt-3 text-sm font-medium">Explore the beauty of relationships as you navigate through a space!</p>
                <div className="flex gap-16 flex-wrap justify-center mx-auto tex-center items-center mt-8">
                    {
                        !isPending ? biodatas?.data.map(biodata=><BiodataCard key={biodata._id} biodata={biodata}></BiodataCard>) 
                        :
                        <Loader></Loader>
                    }
                </div>
             </div>
        </div>
    )}
export default Biodatas;