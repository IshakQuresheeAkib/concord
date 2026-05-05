import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { enqueueSnackbar } from "notistack";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({children}) => {
    const [isAdmin,isPending] = useAdmin();
          
    if (isPending) {
        return <Loader width='52'></Loader>       
    }

    if (isAdmin) {
        return children;      
    }
    enqueueSnackbar('Unauthorized Access!',{variant:'error'})
    return <Navigate to='/'></Navigate>
    
}
export default AdminRoute;