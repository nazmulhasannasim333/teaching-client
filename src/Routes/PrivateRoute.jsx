import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading/Loading";
import { AuthContext } from "../provider/AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loading />
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;