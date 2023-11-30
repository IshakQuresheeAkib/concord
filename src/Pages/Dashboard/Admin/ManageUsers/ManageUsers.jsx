import { Button, Space, Table } from 'antd';
import Heading from '../../../../Components/Heading/Heading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import { enqueueSnackbar } from 'notistack';
import Search from 'antd/es/input/Search';
import { useState } from 'react';



const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [userName,setUserName] = useState('');
  
    const {data:user = [],refetch} = useQuery({
        queryKey:['accounts',userName],
        queryFn:()=>axiosSecure.get(`/users?userName=${userName}`)
    })
    
    console.log(user?.data);

    const handleAdmin = (email) =>{
        console.log(email)
        axiosSecure.patch(`/users/admin/${email}`,{role:'admin'})
        .then(result=>{
            console.log(result?.data.modifiedCount);
            if (result?.data.modifiedCount) {
                refetch();
                enqueueSnackbar('Made Admin Successfully!',{variant:'success'})
            }
        })
    }

    const handlePremium = (email) =>{
        console.log(email)
        axiosSecure.patch(`/users/admin/${email}`,{role:'premium'})
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
              <Button type='' onClick={()=>handleAdmin(record.email)} className='bg-teal text-white'>Make Admin</Button>
              <Button type='' onClick={()=>handlePremium(record.email)} className='bg-teal text-white'>Make Premium</Button>
            </Space>
          ),
        },
      ];

    console.log(userName.length,userName);

    return (
    <div className='my-14 max-w-4xl mx-auto'>
        <Heading>Manage users</Heading>
        <div>
        <Search
          placeholder="Search User By Name"
          onSearch={value=>setUserName(value)}
          className='w-80 mx-auto flex justify-center mt-10 '
        />
        </div>
        <Table columns={columns} dataSource={user?.data} className='mt-10'/>
    </div>
)
};
export default ManageUsers;