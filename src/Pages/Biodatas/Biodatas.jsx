import { Radio, Select, Slider } from "antd";
import Heading from "../../Components/Heading/Heading";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../hook/useAxiosPublic'
import BiodataCard from "../Shared/BiodataCard/BiodataCard";

const Biodatas = () => {

    const axiosPublic = useAxiosPublic()
    const [type,setType] = useState('all')
    const [maxAge,setMaxAge] = useState(18)
    const [minAge,setMinAge] = useState(40)
    const [location,setLocation] = useState('')
    
    const onAfterChange = value => {
        setMinAge(value[0])
        setMaxAge(value[1])
    }
    console.log(type,'minAge',minAge,'maxAge',maxAge,location);

    const {data:biodatas = []} = useQuery({
        queryKey:['biodatas'],
        queryFn:() => axiosPublic.get('/biodatas')
    })
    console.log(biodatas?.data);

    const locations = [
        { value: 'dhaka', label: 'Dhaka' },
        { value: 'chattagram', label: 'Chattagram' },
        { value: 'rangpur', label: 'Rangpur' },
        { value: 'barisal', label: 'Barisal' },
        { value: 'khulna', label: 'Khulna' },
        { value: 'mymensingh', label: 'Mymensingh' },
        { value: 'sylhet', label: 'Sylhet' }
      ];

    return (
        <div className="min-h-screen mt-8 mb-40 flex gap-10">
             <div className="w-60 shadow-xl border-t-8 border-teal h-screen p-4">
                <h1 className="my-5 text-center text-xl font-bold border-l-teal border-l-4 w-fit pl-2">Filter Biodatas</h1>
                <p>Filter by Age (Min to Max)</p>
                <Slider onAfterChange={onAfterChange} range={{draggableTrack: true}} defaultValue={[18, 40]} max={40} min={18}/>
                <Select placeholder="Filter by Permanent Location" onChange={(value)=>setLocation(value)} options={locations} className="w-52 my-10"/>
                <p>Biodata Type</p>
                <Radio.Group onChange={e=>setType(e.target.value)} value={type}>
                    <Radio value={'male'}>Male</Radio>
                    <Radio value={'female'}>Female</Radio>
                    <Radio value={'all'}>All</Radio>
                </Radio.Group>
             </div>
             <div className="mx-auto text-center">
                <Heading>Biodatas</Heading>
                <p className="mt-3 text-sm font-medium">Explore the beauty of relationships as you navigate through a space!</p>
                <div className="flex gap-16 flex-wrap justify-center items-center mt-8">
                    {
                        biodatas?.data && biodatas?.data.map(biodata=><BiodataCard key={biodata._id} biodata={biodata}></BiodataCard>)
                    }
                </div>
             </div>
        </div>
    )}
export default Biodatas;