import PrimaryBtn from "../../../Components/Button/PrimaryBtn";
import Heading from "../../../Components/Heading/Heading";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { SendOutlined } from "@ant-design/icons";


const ContactUs = () => {
    return (
        <div className="flex justify-center items-center mx-auto lg:w-[90%] mb-52 mt-24">
          <div className="container mx-auto my-4 px-4 lg:px-20">

            <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <div className="flex justify-center">
                <Heading>Send us a message</Heading>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="First Name*" />
                <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Last Name*" />
                <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="email" placeholder="Email*" />
                <input className="w-full bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="number" placeholder="Phone*" />
                </div>
                <div className="my-4">
                  <textarea placeholder="Message*" className="w-full h-32 bg-gray text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div className="my-2">
                <PrimaryBtn data={'Send Message'} icon={<SendOutlined />}></PrimaryBtn>
                </div>
              </div>

              <div
                className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-teal rounded-2xl">
                <div className="flex flex-col text-white">
                  <h1 className="font-bold uppercase text-4xl my-4">Drop in our office</h1>
                  <p className="text-gray-400">Visit Us Today: Where Dreams Meet Reality, Drop by Our Office to Begin Your Journey.</p>

                  <div className="flex my-4">
                    <div className="flex flex-col">
                    <HiOutlineBuildingOffice2 className="mt-2 mr-2 text-xl"  />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl">Main Office</h2>
                      <p className="text-gray-400">123 Elm Street, London, SW1A 1AA, United Kingdom</p>
                    </div>
                  </div>
                  
                  <div className="flex my-4">
                    <div className="flex flex-col">
                    <FiPhoneCall className='mt-2 mr-2 text-xl'/>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl">Call Us</h2>
                      <p className="text-gray-400">Tel: +44 20 1234 5678</p>
                      <p className="text-gray-400">Fax: (123)-456-7890</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
        </div>
    )}
export default ContactUs;