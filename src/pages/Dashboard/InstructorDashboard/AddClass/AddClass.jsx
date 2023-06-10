import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/AuthProvider";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.availableSeats = parseInt(data.availableSeats);
    data.price = parseFloat(data.price);
    data.enrolled = 0;
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.classImage[0]);
    fetch(image_upload_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            availableSeats,
            price,
            classImage,
            className,
            enrolled,
            instructorEmail,
            instructorName,
          } = data;
          const newClass = {
            availableSeats,
            price,
            classImage: imgURL,
            className,
            enrolled,
            instructorEmail,
            instructorName,
          };
          axiosSecure.post("/classes", newClass).then((data) => {
            console.log(data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                title: "Success!",
                text: "Your class has been added",
                icon: "success",
                confirmButtonText: "Ok",
              });
            }
          });
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-whote pb-20  text-black">
        <div className="max-w-3xl lg:mx-auto mx-4 mt-14">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="pt-3">
                <label className="text-black" htmlFor="text">
                  Your Name
                </label>
                <input
                  defaultValue={user?.displayName}
                  readOnly
                  className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                  {...register("instructorName")}
                />
              </div>
              <div className="pt-3">
                <label className="text-black" htmlFor="text">
                  Your Email
                </label>
                <input
                  defaultValue={user?.email}
                  readOnly
                  className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                  {...register("instructorEmail")}
                />
              </div>
              <div className="pt-3">
                <label className="text-black" htmlFor="text">
                  Class Name
                </label>
                <input
                  type="text"
                  className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                  {...register("className")}
                />
              </div>
              <div className="pt-3">
                <label className="text-black" htmlFor="text">
                  Available Seats
                </label>
                <input
                  type="number"
                  className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                  {...register("availableSeats")}
                />
              </div>
              <div className="pt-3">
                <label className="text-black" htmlFor="text">
                  Price
                </label>
                <input
                  type="number"
                  className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                  {...register("price")}
                />
              </div>
              <div className="pt-3">
                <label className="text-black" htmlFor="text">
                  Class Image
                </label>
                <input
                  type="file"
                  className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-purple-500"
                  {...register("classImage")}
                />
              </div>
            </div>

            <button
              type="submit"
              className="group my-6 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Add A Class
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
