import {  Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Heading from "../../Components/Heading/Heading";
import useBiodata from "../../hook/useBiodata";
import useAuth from "../../hook/useAuth";
import useUserBiodata from "../../hook/useUserBiodata";


const Checkout = () => {

    const {user} = useAuth();
    const [biodata] = useBiodata();
    const {BiodataId} = biodata || {}
    const [userBiodata] = useUserBiodata();

    const handleSubmit = () => {
        console.log('hello');
    }

    {/* TODO:1.Implement payment method */}

    return (
        <div className="mt-20 mb-40 max-w-3xl mx-auto ">
            <Heading>Checkout</Heading>
            <form onSubmit={handleSubmit} className="bg-teal px-16 pb-10 pt-px mt-10 rounded-2xl shadow-xl font-light">
                <div className="grid grid-cols-2 place-content-center gap-x-20 gap-y-5 mt-20">                        
                        <input readOnly className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" name="name" placeholder={`Biodata Id:${BiodataId}`} />
                        <input readOnly className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" name="image" placeholder={`My Biodata Id:${userBiodata?.BiodataId}`} />                                                
                        <input readOnly className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder={`Email: ${user?.email}`} />                     
                        <input className="w-full bg-gray font-normal  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="number" placeholder="Stripe Card Number" />
                </div>
                    <Button type="submit" className="bg-gray font-medium mx-auto py-3 mt-10 flex items-center justify-center  hover:bg-light-teal border-none" icon={<SendOutlined />}>Submit</Button>
            </form>
        </div>
    )}
export default Checkout;