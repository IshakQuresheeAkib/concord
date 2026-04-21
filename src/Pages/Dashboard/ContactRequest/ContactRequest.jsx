import { Table } from "antd";
import Heading from "../../../Components/Heading/Heading";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaLock } from "react-icons/fa6";
import useAuth from "../../../hook/useAuth";


const ContactRequest = () => {

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data= []} = useQuery({
    queryKey:['contact-Requests'],
    queryFn:()=>axiosSecure.get(`/contact-request?UserEmail=${user?.email}`)
  })

    const columns = [
        {
          title: 'Biodata Id',
          dataIndex: 'BiodataId',
          key: 'BiodataId03',
        },
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'name03',
        },
        {
          title: 'Status',
          dataIndex: 'Status',
          key: 'Status03',
        },
        {
          title: 'Mobile No',
          dataIndex: 'MobileNumber',
          key: 'MobileNo03',
          render: (text,record) => (record.Status === 'Pending' ? <FaLock className="text-teal"/> : text)
        },
        {
          title: 'Email',
          dataIndex: 'ContactEmail',
          key: 'Email03',
          render: (text,record) => (record.Status === 'Pending' ? <FaLock  className="text-teal"/> : text)
        },
       
      ];

    return (
        <div className='my-14 max-w-4xl mx-auto'>
            <Heading>My Contact Request</Heading>
            <Table columns={columns} dataSource={data?.data} className='mt-10 overflow-x-scroll'/>
        </div>
    )}
export default ContactRequest;