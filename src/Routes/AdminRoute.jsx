import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading/Loading";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../provider/AuthProvider";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();

    if(loading || isAdminLoading){
        return <Loading />
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;