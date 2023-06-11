import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import { AuthContext } from "../../../provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  const handleToggle = (e) => {
    if(e.target.checked){
      setTheme('dark')
    }else{
      setTheme('light')
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')
    document.querySelector('html').setAttribute('data-theme', localTheme)
  },[theme])



  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      setIsScrolled(!isTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleLogout = () => {
    logout(() => {
      console.log("logout successful");
    });
  };



  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  // console.log(isAdmin, isInstructor);

  return (
    <div className={`sticky top-0 z-50 ${isScrolled && theme === 'dark' ? 'sticky top-0 z-50 bg-gray-800 opacity-80' : "" } ${isScrolled && theme === 'light' ? 'sticky top-0 z-50 bg-slate-100 opacity-80' : ""} `}>
      <div className=" max-w-[1500px] mx-auto ">
        <nav className=" px-3 lg:px-20 flex justify-between items-center ">
          <div className="py-5 text-purple-500 font-bold text-4xl">
            <Link to="/">
              <span className="text-orange-600 font-bold">Teaching</span>.Ing
            </Link>
          </div>
          <div>
            <ul className="hidden lg:flex items-center space-x-10 font-bold">
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
              {user && (
                <li>
                  <NavLink
                    to={
                      isAdmin
                        ? "/dashboard/adminhome"
                        : isInstructor
                        ? "/dashboard/instructorhome"
                        : "/dashboard/studenthome"
                    }
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-600"
                        : "hover:text-purple-600 ease-in duration-200"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="flex lg:space-x-6 space-x-3 z-50">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      title={user && user.displayName}
                      src={user && user.photoURL}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content text-orange-600 bg-indigo-300 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout} to="/login">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-purple-500 text-white lg:block hidden px-5 py-2 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
                  Login
                </button>
              </Link>
            )}

            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" onChange={handleToggle} />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

          
          </div>

          {/* Mobile Screen */}
          <div className="lg:hidden cursor-pointer mt-3 ms-2 z-50">
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
            <div className="lg:hidden bg-orange-500 text-white h-96  z-30 absolute inset-0">
              <ul className=" grid place-items-center py-20">
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
                <li className="my-3">
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
                {user && (
                  <li className="mt-3">
                    <NavLink
                      to={
                        isAdmin
                          ? "/dashboard/manageclasses"
                          : isInstructor
                          ? "/dashboard/myclasses"
                          : "/dashboard/myselectedclass"
                      }
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-600"
                          : "hover:text-purple-600 ease-in duration-200"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                <li className="mt-8">
                  {user ? (
                    <></>
                  ) : (
                    <Link to="/login">
                      <button className="bg-purple-500 lg:hidden block px-5 py-2 rounded-md  capitalize font-bold hover:opacity-80 ease-in duration-200">
                        Login
                      </button>
                    </Link>
                  )}
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
