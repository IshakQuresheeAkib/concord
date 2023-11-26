import axios from "axios";
import Heading from "../../Components/Heading/Heading";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const AddProducts = () => {

    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;
        const newCoffee = {name,quantity,supplier,taste,category,details,photo}
        console.log(newCoffee);

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

        axios.post('http://localhost:5000/coffee',newCoffee)
        .then(data=>{
            console.log(data.data);
            if (data.data.insertedId) { alert('added successfully!') }
        })

    }

    return (
        <div className="min-h-screen my-20 max-w-6xl mx-auto ">
            <Heading>Add a Products</Heading>
            <form onSubmit={handleSubmit} className="bg-teal px-16 pb-10 pt-px mt-5 rounded-2xl shadow-xl font-light">
                <div className="grid grid-cols-2 place-content-center gap-x-20 gap-y-5 mt-20">
                        <div className="form-control">
                        <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="First Name*" />
                        </div>
                        <div className="form-control">
                        <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="First Name*" />
                        </div>
                        <div className="form-control">
                        <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="First Name*" />
                        </div>
                        <div className="form-control">
                        <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="First Name*" />
                        </div>
                        <div className="form-control">
                        <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="First Name*" />
                        </div>
                        <div className="form-control">
                        <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="First Name*" />
                        </div>
                        <div className="form-control mb-10">
                        <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="First Name*" />
                        </div>
                </div>
                <Button type="" className="bg-white font-medium mx-auto py-5 flex items-center justify-center w-72 hover:bg-light-teal hover:text-white border-none" icon={<SendOutlined />}>Submit</Button>
            </form>
        </div>
    );
};

export default AddProducts;