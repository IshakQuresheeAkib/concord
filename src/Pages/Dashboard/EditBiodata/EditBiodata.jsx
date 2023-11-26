import Heading from "../../../Components/Heading/Heading";
import {  DatePicker, Input, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";

const EditBiodata = () => {

    const handleSubmit = e =>{
        e.preventDefault();
        console.log('hello');
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const date = form.date.value;
        
        // const taste = form.taste.value;
        // const category = form.category.value;
        // const details = form.details.value;
        const newCoffee = {name,date,image}
        console.log({name,date,image});

        // fetch('http://localhost:5000/coffee',{
        //     method:'POST',
        //     headers:{
        //         'content-type':'application/json'
        //     },
        //     body:JSON.stringify(newCoffee)
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     if (data.insertedId) {
        //         alert('done!')
        //         form.reset();
        //     }
        // })

        // axios.post('http://localhost:5000/coffee',newCoffee)
        // .then(data=>{
        //     console.log(data.data);
        //     if (data.data.insertedId) { alert('added successfully!') }
        // })

    }

    
    return (
        <div className="my-10 max-w-5xl mx-auto ">
            <Heading>Add Biodata</Heading>
            <form onSubmit={handleSubmit} className="bg-teal px-16 pb-10 pt-px mt-5 rounded-2xl shadow-xl font-light">
                <div className="grid grid-cols-2 place-content-center gap-x-20 gap-y-5 mt-20">                        
                        <input className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" name="name" placeholder="Name" />                                                
                        <input className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" name="image" placeholder="Profile Image" />                                                
                        <input className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="number" placeholder="Age" />
                        <Select placeholder="Biodata type" name='type'
                        options={[ {value: 'male', label: 'Male'},{value: 'female', label: 'Female'}]} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg "
                        />
                        <DatePicker className="bg-gray mt-2 rounded-lg font-normal" placeholder="Date of birth" name="date"/>
                        <Select placeholder="Occupation" 
                        options={[ {value: 'job', label: 'Job'},{value: 'student', label: 'Student'},{value: 'housewife', label: 'Housewife'}]} className=" bg-gray font-normal mt-2 h-[48px] rounded-lg"
                        />                        
                        <input className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="" />                
                        <input className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="" />                                                
                        <input className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="" />                        
                        <input className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="" />
                </div>
                    <Input type="submit" value='Submit' className="bg-white font-medium mx-auto py-3 mt-10 flex items-center justify-center w-60 hover:bg-light-teal" suffix={<SendOutlined className="text-lg w-5"/>}/>
            </form>
        </div>
    );
};

export default EditBiodata;