import { Button, Table } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import Heading from "../../../Components/Heading/Heading";


const ContactRequest = () => {

    const columns = [
        {
          title: 'Biodata Id',
          dataIndex: 'BiodataId',
          key: 'BiodataId',
        },
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'name',
        },
        {
          title: 'Status',
          dataIndex: 'Status',
          key: 'Status',
        },
        {
          title: 'Mobile No',
          dataIndex: 'MobileNo',
          key: 'MobileNo',
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
        },
        {
          title: 'Action',
          key: 'action',
          render: () => (
            <Button type='' className='bg-teal text-white' icon={<RiDeleteBin6Line className=' text-xl'/>}></Button>
          ),
        },
      ];

    return (
        <div className='my-14 max-w-4xl mx-auto'>
            <Heading>My Contact Request</Heading>
            <Table columns={columns} className='mt-10'/>
        </div>
    )}
export default ContactRequest;