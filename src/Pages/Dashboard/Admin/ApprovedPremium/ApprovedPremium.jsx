import { Button, Space, Table } from 'antd';
import Heading from '../../../../Components/Heading/Heading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import { enqueueSnackbar } from 'notistack';



const ApprovedPremium = () => {

    const axiosSecure = useAxiosSecure();

    const {data:user = [],refetch} = useQuery({
        queryKey:['accounts'],
        queryFn:()=>axiosSecure.get('/biodatas/admin/premium-request')
    })

    const handlePremium = (email) =>{
        console.log(email)
        axiosSecure.patch(`/users/admin/${email}`,{role:'premium'})
        .then(result=>{
            console.log('premium ',result?.data);
            if (result?.data.modifiedCount) {
                    axiosSecure.delete(`/biodatas/admin/premium-request/${email}`)
                    .then(res=>{
                        console.log('DELETED',res.data);
                        if (res.data?.deletedCount) {
                            refetch();
                            enqueueSnackbar('Made Premium User Successfully!',{variant:'success'})
                        }
                    })
            }
        })
    }

    const columns = [
        {
          title: 'Biodata Id',
          dataIndex: 'BiodataId',
          key: 'name2',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'name2',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'email2',
        },
        {
          title: 'Action',
          key: 'action2',
          render: (_, record) => (
            <Space size="middle">
              <Button type='' onClick={()=>handlePremium(record.Email)} className='bg-teal text-white'>Make Premium</Button>
            </Space>
          ),
        },
      ];

    return (
    <div className='my-14 max-w-4xl mx-auto'>
        <Heading>Manage users</Heading>
        <Table columns={columns} dataSource={user?.data} className='mt-10'/>
    </div>
)
};
export default ApprovedPremium;