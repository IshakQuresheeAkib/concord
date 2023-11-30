import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { Button, Table } from "antd";
import Heading from "../../../Components/Heading/Heading";
import { RiDeleteBin6Line } from "react-icons/ri";
import { enqueueSnackbar } from "notistack";
import useAuth from "../../../hook/useAuth";

const Favourite = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosPublic()
    const {data = [],refetch} = useQuery({
        queryKey:['favorites',user],
        queryFn:()=> axiosSecure.get(`/favorites-biodata?email=${user?.email}`)
    })

    console.log(data?.data);

    const handleDelete = id => {
        console.log(id);
        axiosSecure.delete(`/favorites-biodata/${id}`)
            .then(result=>{
                if (result?.data.deletedCount) {
                    enqueueSnackbar('Deleted from Favourite Biodata!',{variant:'success'})
                    refetch()
                }
            })
        refetch();
    }

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
          title: 'Permanent Address',
          dataIndex: 'PermanentDivision',
          key: 'PermanentDivision',
        },
        {
          title: 'Occupation',
          dataIndex: 'Occupation',
          key: 'Occupation',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Button type='' onClick={()=>handleDelete(record._id)} className='bg-teal text-white' icon={<RiDeleteBin6Line className=' text-xl'/>}></Button>

          ),
        },
      ];

// 
    return (
        <div className='my-14 max-w-4xl mx-auto'>
            <Heading>Favorites Biodata</Heading>
            <Table columns={columns} dataSource={data?.data} className='mt-10'/>
        </div>
    )}
export default Favourite;