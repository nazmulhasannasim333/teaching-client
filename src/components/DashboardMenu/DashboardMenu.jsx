import React from "react";
import { FaBookReader, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashboardMenu = () => {
  return (
    <>
      <li className="text-lg font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600"
              : "hover:text-purple-600 ease-in duration-200"
          }
        >
          <FaHome className="font-bold text-2xl" />
          Home
        </NavLink>
      </li>
      <li className="text-lg py-2 font-semibold">
        <NavLink
          to="/instructors"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600"
              : "hover:text-purple-600 ease-in duration-200"
          }
        >
          <FaUsers className="font-bold text-2xl" />
          Instructors
        </NavLink>
      </li>
      <li className="text-lg  font-semibold">
        <NavLink
          to="/classes"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600"
              : "hover:text-purple-600 ease-in duration-200"
          }
        >
          <FaBookReader className="font-bold text-2xl" />
          Classes
        </NavLink>
      </li>
      <li className="text-lg pt-3 font-semibold">
        <NavLink
          to="/dashboard/userprofile"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gradient-to-r from-green-400 to-blue-500"
              : "hover:text-purple-600 ease-in duration-200"
          }
        >
          <FaUser className="font-bold text-2xl" />
          Profile
        </NavLink>
      </li>
    </>
  );
};

export default DashboardMenu;
