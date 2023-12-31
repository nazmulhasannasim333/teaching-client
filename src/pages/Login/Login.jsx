import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import './Login.css';

const Login = () => {
    const {loginUser, googleLogin} = useContext(AuthContext);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate();
  let location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  let from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        setShowError("")
        loginUser(data.email, data.password)
        .then(result => {
          const loginUser = result.user;
          console.log(loginUser);
    
          navigate(from, {replace: true})
        })
        .catch(error => {
          console.log(error);
          setShowError(error.message)
        })
      }


      const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
          const signinGogle = result.user;
          console.log(signinGogle);

          const user = {
            name: signinGogle.displayName,
            email: signinGogle.email,
            photo: signinGogle.photoURL,
            date: new Date().getFullYear()
          };
          fetch("https://teaching-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Welcome to Teaching.Ing",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });


          navigate(from, {replace: true})
        })
        .catch(error => console.log(error))
      }

    return (
        <div className="max-w-2xl mx-auto my-10">
      <div className="bg-whote pb-20 pt-10  shadow-md p-20 mt-5">
        <h3 className="text-4xl text-center my-10 text-purple-500 font-semibold">
          Login Now
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-5">
              <label className="" htmlFor="text">
                Your Email
              </label>
              <input
                className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("email")}
              />
            </div>
            <div className="pt-5 relative">
              <label className="" htmlFor="text">
                Your Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className=" w-full t p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("password")}
              />
                {!showPassword ?
              <FaEyeSlash onClick={() => setShowPassword(true)} className="absolute text-xl"
                  style={{ top: "70px", right: "10px" }} />
                  :
                  <FaEye onClick={() => setShowPassword(false)} className="absolute text-xl"
                  style={{ top: "70px", right: "10px" }} />
                }
            </div>
          <button
            type="submit"
            className="group my-6 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-red-500 pt-5">{showError && showError}</p>
        <p className="text-center pt-5 ">Don't have an account? <Link className="text-purple-500" to="/register">Register</Link></p>
        <div className="text-center my-4">
        <span className="content-style">OR</span>
      </div>
        <button onClick={handleGoogleLogin} className="btn btn-outline  w-full mt-5"><FaGoogle className="text-green-500 text-4xl pe-3"/> <span className="">Login with Google</span></button>
      </div>
    </div>
    );
};

export default Login;