import { Button, Space, Table } from 'antd';
import Heading from '../../../../Components/Heading/Heading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import { enqueueSnackbar } from 'notistack';



const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();

    const {data:user = [],refetch} = useQuery({
        queryKey:['accounts'],
        queryFn:()=>axiosSecure.get('/users')
    })

    console.log(user?.data);

    const handleAdmin = (id) =>{
        console.log(id)
        axiosSecure.patch(`/users/admin/${id}`,{role:'admin'})
        .then(result=>{
            console.log(result?.data.modifiedCount);
            if (result?.data.modifiedCount) {
                refetch();
                enqueueSnackbar('Made Admin Successfully!',{variant:'success'})
            }
        })
    }

    const handlePremium = (id) =>{
        console.log(id)
        axiosSecure.patch(`/users/admin/${id}`,{role:'premium'})
        .then(result=>{
            console.log(result?.data.modifiedCount);
            if (result?.data.modifiedCount) {
                refetch();
                enqueueSnackbar('Made Premium User Successfully!',{variant:'success'})
            }
        })
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Button type='' onClick={()=>handleAdmin(record._id)} className='bg-teal text-white'>Make Admin</Button>
              <Button type='' onClick={()=>handlePremium(record._id)} className='bg-teal text-white'>Make Premium</Button>
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
export default ManageUsers;