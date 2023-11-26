import Heading from "../../../Components/Heading/Heading";
import useAdmin from "../../../hook/useAdmin";

const DashboardHome = () => {

    const [isAdmin] = useAdmin()

    return (
        <div className="my-10 mx-auto">
             <Heading>{isAdmin ? 'Admin' : 'User'} Dashboard</Heading>
        </div>
    )}
export default DashboardHome;