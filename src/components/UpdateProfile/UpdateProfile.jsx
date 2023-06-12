import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const UpdateProfile = () => {
const navigate = useNavigate()
    const loadUser = useLoaderData()
    // console.log(loadUser);
    const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
   

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.photo[0]);
    fetch(image_upload_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((profileResponse) => {
        if(profileResponse.success){
            const profileURL = profileResponse.data.display_url;
            console.log(profileURL);
             const {
                address,
                email,
                gender,
                name,
                phone,
                photo,
                website
              } = data;
              const upadteProfile = {
                address,
                email,
                gender,
                name,
                phone,
                photo: profileURL,
                website
              };
              console.log(upadteProfile);


              fetch(`https://teaching-server.vercel.app/updateprofile/${loadUser._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(upadteProfile)
              })
              .then(res => res.json())
              .then(updateUser => {
                console.log('user profile updated', updateUser);
                if (updateUser.modifiedCount > 0) {
                    reset();
                    navigate('/dashboard/userprofile')
                    Swal.fire({
                      title: "Success!",
                      text: "Your class has been added",
                      icon: "success",
                      confirmButtonText: "Ok",
                    });
                  }
              })
             


        }
      })


    
    
  };


  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center text-4xl font-semibold mb-14 mt-0">
          Update Profile
        </h3>
        <div className="bg-whote pb-20  ">
          <div className="max-w-3xl lg:mx-auto mx-4 mt-14">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="pt-3">
                  <label className="" htmlFor="text">
                    Your Name
                  </label>
                  <input
                      defaultValue={loadUser && loadUser?.name}
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                    {...register("name")}
                  />
                </div>
                <div className="pt-3">
                  <label className="" htmlFor="text">
                    Your Email
                  </label>
                  <input
                      defaultValue={loadUser && loadUser?.email}
                    readOnly
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                    {...register("email")}
                  />
                </div>
                <div className="pt-3">
                  <label className="" htmlFor="text">
                    Address
                  </label>
                  <input
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                    {...register("address")}
                  />
                </div>
                <div className="pt-3">
                  <label className="" htmlFor="text">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                    {...register("phone")}
                  />
                </div>
                <div className="pt-3">
                  <label className="" htmlFor="text">
                    Website Name
                  </label>
                  <input
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                    {...register("website")}
                  />
                </div>

                <div className="pt-3">
              <label className="text-black" htmlFor="text">
                Gender
              </label>
              <select
                className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                {...register("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
              </div>
              <div className="pt-3">
                  <label className="" htmlFor="text">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                    {...register("photo")}
                  />
                </div>
              <button
                type="submit"
                className="group my-6 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
