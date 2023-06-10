import React from "react";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
//   console.log(isAdmin, isInstructor);

  return (
    <div>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          {isAdmin ? (
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <p className="text-center mb-10 mt-2 text-2xl font-bold text-orange-600">
                Admin Dashoard
              </p>
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/manageclasses"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  Manage Classes
                </NavLink>
              </li>
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/manageusers"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  Manage Users
                </NavLink>
              </li>
            </ul>
          ) : isInstructor ? (
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <p className="text-center mb-10 mt-2 text-2xl font-bold text-orange-600">
                Instructor Dashoard
              </p>
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/myclasses"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  My Classes
                </NavLink>
              </li>
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/addclasses"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  Add a Class
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <p className="text-center mb-10 mt-2 text-2xl font-bold text-orange-600">
                Student Dashoard
              </p>
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/myselectedclass"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  My Selected Classes
                </NavLink>
                <NavLink
                  to="/dashboard/myenrolledclass"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  My Enrolled Classes
                </NavLink>
              </li>
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/paymenthistory"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  Payment History
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default DashBoard;
