import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user, logout} = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);


  const toggleDarkMode = ()=> {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Add or remove "dark-mode" class based on user preference and state
    if (prefersDarkMode || isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

const handleLogout = () => {
  logout(() => {
    console.log("logout successful");
  })
}

  return (
     <div className="sticky top-0 z-50 bg-white">
         <div
      
      className=" max-w-[1500px] mx-auto "
    >
      <nav className=" px-3 lg:px-20 flex justify-between items-center ">
        <div className="py-5 text-purple-500 font-extrabold text-4xl">
          <Link to="/">
            <span className="text-orange-600">Teaching</span>.Ing
          </Link>
        </div>
        <div>
          <ul className="hidden lg:flex items-center space-x-10 font-semibold">
          <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600"
                    : "hover:text-purple-600 ease-in duration-200"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/instructors"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600"
                    : "hover:text-purple-600 ease-in duration-200"
                }
              >
                Instructors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/classes"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600"
                    : "hover:text-purple-600 ease-in duration-200"
                }
              >
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600"
                    : "hover:text-purple-600 ease-in duration-200"
                }
              >
                Dashboard
              </NavLink>
            </li>
            
          </ul>
        </div>
        <div className="flex lg:space-x-6 space-x-3 z-50">
              {user ? <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img title={user && user.displayName} src={user && user.photoURL} />
                  </div>
                </label>
                <ul 
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-indigo-300 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout} to="/login">Logout</Link>
                  </li>
                </ul>
              </div> : <Link to="/login"><button className="bg-purple-500 text-white lg:block hidden px-5 py-2 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
               Login
              </button></Link> }
              {
                isDarkMode ? <button onClick={toggleDarkMode}><FaSun className=" w-6 text-white h-6 mt-3" /></button> : <button onClick={toggleDarkMode}><FaMoon className=" w-6 text-black h-6 mt-3"  /></button>
              }
            
            
            </div>

        {/* Mobile Screen */}
        <div  className="lg:hidden cursor-pointer mt-3 ms-2 z-50">
          <button
            title={!isMenuOpen ? "Open Menu" : "Close Menu"}
            aria-label={!isMenuOpen ? "Open Menu" : "Close Menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {!isMenuOpen ? (
              <FaBars className="h-6 w-6 text-purple-600" />
            ) : (
              <FaTimes className="h-6 w-6 text-purple-600" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-indigo-300 h-96 opacity-90 z-30 absolute inset-0">
            <ul className=" grid place-items-center py-20">
              <li className="font-semibold mt-3">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="font-semibold mt-3">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="font-semibold mt-3">
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "hover:text-purple-600 ease-in duration-200"
                  }
                >
                  Blog
                </NavLink>
              </li>
              <li className="mt-8">
                {
                    user ? <></> : <Link to="/login"><button className="bg-purple-500 lg:hidden block px-5 py-2 rounded-md  capitalize font-bold hover:opacity-80 ease-in duration-200">
                    Login
                   </button></Link>
                }
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
     </div>
  );
};

export default Navbar;
