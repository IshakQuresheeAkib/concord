import { useQuery } from '@tanstack/react-query';
import CountCard from '../../../../Components/CountCard/CountCard';
import Heading from '../../../../Components/Heading/Heading'
import useAxiosSecure from '../../../../hook/useAxiosSecure'
import useAuth from '../../../../hook/useAuth';

const AdminDashboard = () => {

    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    let isTrue = false;
    if (!loading && user) {
        isTrue = true
    }

    const {data = {}} = useQuery({
        queryKey:['count'],
        enabled:isTrue,
        queryFn:()=> axiosSecure.get('/biodatas-count')
    })

    const {totalBiodata,maleBiodata,femaleBiodata,premiumBiodata} = data.data || {}


    return (
        <div className='mt-14 px-10'>
            <Heading>Admin Dashboard</Heading>
                <div className='flex flex-wrap justify-center gap-14 mt-10'>
                <CountCard heading='Total Biodata' count={totalBiodata}></CountCard>
                <CountCard heading='Total Male Biodata' count={maleBiodata}></CountCard>
                <CountCard heading='Total Female Biodata' count={femaleBiodata}></CountCard>
                <CountCard heading='Total Premium Biodata' count={premiumBiodata}></CountCard>
                <CountCard heading='Total Revenue' count={0}></CountCard>
                </div>
        </div>
    )}
export default AdminDashboard;