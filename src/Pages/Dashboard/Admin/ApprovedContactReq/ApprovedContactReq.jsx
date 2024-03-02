import { Button, Table } from "antd";
import Heading from "../../../../Components/Heading/Heading";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const ApprovedContactReq = () => {

  const axiosSecure = useAxiosSecure();

  const {data= [],refetch} = useQuery({
    queryKey:['contact-requests'],
    queryFn:()=>axiosSecure.get('/contact-request')
  })

  console.log(data?.data);

  const handleApprove = (id) =>{
    axiosSecure.patch(`/contact-request/${id}`,{Status:'Approved'})
    .then(res=>{
      console.log();
      if (res.data?.modifiedCount) {
        enqueueSnackbar('Added to Favourite Biodata Successfully!',{variant:'success'})
        refetch()
      }
    })
  }
  
    const columns = [
        {
          title: 'Biodata Id',
          dataIndex: 'BiodataId',
          key: 'BiodataId',
        },
        {
          title: 'User Email',
          dataIndex: 'UserEmail',
          key: 'UserEmail',
        },
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'ContactEmail',
          key: 'Email',
        },
        {
          title: 'Status',
          dataIndex: 'Status',
          key: 'Status4',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text,record) => (
            record?.Status === 'Pending' && <Button type='' className='bg-teal text-white' onClick={()=>handleApprove(record._id)}>Approve</Button>
          ),
        },
      ];


    return (
        <div className='my-14 max-w-4xl mx-auto'>
            <Heading>Approve Contact Request</Heading>
            <Table columns={columns} dataSource={data?.data}  className='mt-10'/>
        </div>
    )}
export default ApprovedContactReq;