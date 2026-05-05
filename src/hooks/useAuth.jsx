import { useContext } from "react";
import { AuthContext } from "../provicer/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;