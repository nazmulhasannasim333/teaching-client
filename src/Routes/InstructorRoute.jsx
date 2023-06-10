import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading/Loading";
import useInstructor from "../hooks/useInstructor";
import { AuthContext } from "../provider/AuthProvider";

const InstructorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor()
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <Loading />
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default InstructorRoute;