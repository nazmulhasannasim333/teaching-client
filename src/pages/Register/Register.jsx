import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
const {createUser, profileUpdate, googleLogin} = useContext(AuthContext);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const user = {
        name: data.name,
        email: data.email,
        photo: data.photo,
      };
      fetch("http://localhost:5000/users", {
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




    createUser(data.email, data.password)
    .then(result => {
      const signUpUser = result.user;
      console.log(signUpUser);

      navigate("/")

      profileUpdate(data.name, data.photo)
      .then(()=> {
        console.log("profile updated");
      })
      .catch(error => console.log(error))
    })

    .catch(error => {
      console.log(error);
      setShowError(error.message)
    })
  };



  const handleGoogleLogin = () => {
    googleLogin()
    .then(result => {
      const signinGogle = result.user;
      console.log(signinGogle);

      const user = {
        name: signinGogle.displayName,
        email: signinGogle.email,
        photo: signinGogle.photoURL,
      };
      fetch("http://localhost:5000/users", {
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
          navigate('/')
        });
    })
    .catch(error => console.log(error))
  }

  
  return (
    <div className="max-w-2xl mx-auto my-10">
      <div className="bg-whote pb-20 pt-10  shadow-md p-20 mt-5">
        <h3 className="text-4xl text-center my-10 text-purple-500 font-semibold">
          Register Now
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-5">
              <label className="" htmlFor="text">
                Your Name
              </label>
              <input
                className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("name")}
              />
            </div>
            <div className="pt-5">
              <label className="" htmlFor="text">
                Your Email
              </label>
              <input
                className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("email")}
              />
            </div>
            <div className="pt-5">
              <label className="" htmlFor="text">
                Your Photo URL
              </label>
              <input
                type="text"
                className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("photo")}
              />
            </div>
            <div className="pt-5">
              <label className="" htmlFor="text">
                Your Password
              </label>
              <input
                type="password"
                className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                } )}
              />
               {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
               {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
            </div>
            <div className="pt-5">
              <label className="" htmlFor="text">
               Confirm Password
              </label>
              <input
                type="password"
                className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("confirm")}
              />
            </div>
            <p className="text-red-500">{confirmError && confirmError}</p>
          <button
            type="submit"
            className="group my-6 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Register
          </button>
        </form>
        <p className="text-center text-red-500 pt-5">{showError && showError}</p>
        <p className="text-center pt-5 ">Already have an account? <Link className="text-purple-500" to="/login">Login</Link></p>
        <button onClick={handleGoogleLogin} className="btn btn-outline  w-full mt-5"><FaGoogle className="text-green-500 text-4xl pe-3"/> <span className="">Login with Google</span></button>
      </div>
    </div>
  );
};

export default Register;
