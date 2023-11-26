import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Loader from "../Components/Loader/Loader";
import { enqueueSnackbar } from "notistack";
import useAdmin from "../hook/useAdmin";

const AdminRoute = ({children}) => {
    const {loading} = useAuth();
    const [isAdmin,isPending] = useAdmin();
          
    if (loading || isPending) {
        return <Loader></Loader>       
    }

    if (!isAdmin) {
        enqueueSnackbar('Unauthorized Access!',{variant:'error'})
        return <Navigate to='/'></Navigate>
    }

    return children;
}
export default AdminRoute;