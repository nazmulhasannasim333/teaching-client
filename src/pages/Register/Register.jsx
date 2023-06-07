import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
const {createUser, profileUpdate} = useContext(AuthContext);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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



  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-whote pb-20 pt-10 text-black shadow-md p-20 mt-5">
        <h3 className="text-4xl text-center my-10 text-purple-500 font-semibold">
          Register Now
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-5">
              <label className="text-black" htmlFor="text">
                Your Name
              </label>
              <input
                className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("name")}
              />
            </div>
            <div className="pt-5">
              <label className="text-black" htmlFor="text">
                Your Email
              </label>
              <input
                className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("email")}
              />
            </div>
            <div className="pt-5">
              <label className="text-black" htmlFor="text">
                Your Photo URL
              </label>
              <input
                type="text"
                className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("photo")}
              />
            </div>
            <div className="pt-5">
              <label className="text-black" htmlFor="text">
                Your Password
              </label>
              <input
                type="password"
                className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("password")}
              />
            </div>
          <button
            type="submit"
            className="group my-6 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Register
          </button>
        </form>
        <p className="text-center text-red-500 pt-5">{showError && showError}</p>
        <p className="text-center pt-5 text-black">Already have an account? <Link className="text-purple-500" to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
