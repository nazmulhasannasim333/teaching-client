import React, { useContext } from "react";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import { AuthContext } from "../../provider/AuthProvider";

const DashboardUser = () => {
    const {user} = useContext(AuthContext)
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

  return (
    <div>
      <div className="my-8 text-center">
        <img
          src={user?.photoURL}
          alt=""
          className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
        />
        <h5 className="hidden mt-4 text-xl font-semibold  lg:block">
          {user?.displayName}
        </h5>
        {
          isAdmin ? <p className="text-lg text-orange-500">Admin</p>
           :
            isInstructor ? <p className="text-lg text-fuchsia-500">Instructor</p>
             : 
             <p className="text-lg text-indigo-500">Student</p>

        }
        
      </div>
    </div>
  );
};

export default DashboardUser;
