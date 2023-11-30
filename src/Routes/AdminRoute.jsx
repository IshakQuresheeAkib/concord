import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Loader from "../Components/Loader/Loader";
import { enqueueSnackbar } from "notistack";
import useAdmin from "../hook/useAdmin";

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const [isAdmin,isPending] = useAdmin();
          
    if (loading || isPending) {
        return <Loader></Loader>       
    }

    if (isAdmin && user) {
        return children;      
    }
    enqueueSnackbar('Unauthorized Access!',{variant:'error'})
    return <Navigate to='/'></Navigate>
    
}
export default AdminRoute;