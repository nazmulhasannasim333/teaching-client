import React from "react";
import { FaBook, FaBookDead, FaBookMedical, FaBriefcase, FaClipboard, FaCreditCard, FaHome, FaUsersCog } from "react-icons/fa";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import DashboardMenu from "../components/DashboardMenu/DashboardMenu";
import DashboardUser from "../components/DashboardUser/DashboardUser";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
//   console.log(isAdmin, isInstructor);

  return (
    <div>
      <>
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
              
              <DashboardUser />
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/adminhome"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                      : "hover:text-purple-600  ease-in duration-200"
                  }
                >
                  <FaHome className="font-bold text-3xl" />
                  Admin Home
                </NavLink>
              </li>
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/manageclasses"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                      : "hover:text-purple-600  ease-in duration-200"
                  }
                >
                  <FaBookDead className="font-bold text-2xl" />
                  Manage Classes
                </NavLink>
              </li>
              <li className="text-lg py-2 font-semibold">
                <NavLink
                  to="/dashboard/manageusers"
                  className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                    : "hover:text-purple-600  ease-in duration-200"
                }
                >
                  <FaUsersCog className="font-bold text-3xl" />
                  Manage Users
                </NavLink>
              </li>
              <div className="h-[1px] w-full bg-slate-400 my-3"></div>
              <DashboardMenu />
            </ul>
          ) : isInstructor ? (
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <DashboardUser />
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/instructorhome"
                  className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                    : "hover:text-purple-600  ease-in duration-200"
                }
                >
                   <FaHome className="font-bold text-2xl" />
                  Instructor Home
                </NavLink>
              </li>
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/myclasses"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                      : "hover:text-purple-600  ease-in duration-200"
                  }
                >
                   <FaBook className="font-bold text-2xl" />
                  My Classes
                </NavLink>
              </li>
              <li className="text-lg py-2 font-semibold">
                <NavLink
                  to="/dashboard/addclasses"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                      : "hover:text-purple-600  ease-in duration-200"
                  }
                >
                  <FaBookMedical className="font-bold text-2xl" />
                  Add a Class
                </NavLink>
              </li>
              <div className="h-[1px] w-full bg-slate-400 my-3"></div>
              <DashboardMenu />
              
            </ul>
          ) : (
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <DashboardUser />
              <li className="text-lg font-semibold">
                <NavLink
                  to="/dashboard/studenthome"
                  className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                    : "hover:text-purple-600  ease-in duration-200"
                }
                >
                  <FaHome className="font-bold text-2xl" />
                  Student Home
                </NavLink>
                </li>
              <li className="text-lg py-2 font-semibold">
                <NavLink
                  to="/dashboard/myselectedclass"
                  className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                    : "hover:text-purple-600  ease-in duration-200"
                }
                >
                  <FaBriefcase className="font-bold  text-2xl" />
                  My Selected Classes
                </NavLink>
                </li>
                <li className=" text-lg font-semibold">
                <NavLink
                  to="/dashboard/myenrolledclass"
                  className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                    : "hover:text-purple-600  ease-in duration-200"
                }
                >
                   <FaClipboard className="font-bold text-2xl" />
                  My Enrolled Classes
                </NavLink>
              </li>
              <li className="text-lg py-2 font-semibold">
                <NavLink
                  to="/dashboard/paymenthistory"
                  className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
                    : "hover:text-purple-600  ease-in duration-200"
                }
                >
                  <FaCreditCard className="font-bold text-2xl" />
                  Payment History
                </NavLink>
              </li>
              <div className="h-[1px] w-full bg-slate-400 my-3"></div>
              <DashboardMenu />
            </ul>
          )}
        </div>
      </div>
      </>
      
      <ScrollRestoration />
    </div>
  );
};

export default DashBoard;
