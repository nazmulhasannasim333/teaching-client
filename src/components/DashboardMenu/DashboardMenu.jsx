import React from "react";
import { FaBookReader, FaHome, FaUsers } from "react-icons/fa";
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
          <FaHome className="font-bold text-3xl" />
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
          <FaUsers className="font-bold text-3xl" />
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
          <FaBookReader className="font-bold text-3xl" />
          Classes
        </NavLink>
      </li>
    </>
  );
};

export default DashboardMenu;
