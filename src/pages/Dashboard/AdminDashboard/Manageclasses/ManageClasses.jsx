import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/classes`);
    return res.data;
  });

  const handleApproved = (oneClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to update role for ths item`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approved",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/classe/approved/${oneClass._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                "Approved!",
                "Class Status has been updated.",
                "success"
              );
            }
          });
      }
    });
  };

  const handleDenied = (oneClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to update role for ths item`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Denied",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/classe/denied/${oneClass._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire("Denied!", "Class Status has been updated.", "success");

            }
          });
      }
    });
  };

const handleFedback = (event) => {
    event.preventDefault()
    const form = event.target;
    const feedback = form.feedback.value;
    const id = form.id.value;

    const classFeedback = {feedback, id}
    console.log(classFeedback);
    fetch(`http://localhost:5000/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(classFeedback)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.modifiedCount > 0) {
        form.reset();
        Swal.fire("Send!", "Feedback has been send.", "success");
      }
    });
}

  return (
    <div className="w-2/3 my-10">
      <h3 className=" text-4xl font-semibold my-14">
        Total Classes: {classes.length}
      </h3>
      {classes.map((oneClass) => (
        <div
          key={oneClass._id}
          className="bg-[#ffffff75] mx-3 border my-0 lg:my-5 border-gray-200 rounded-xl lg:mx-0 shadow-sm"
        >
          <div className="lg:flex flex-row ">
            <div className="rounded-2xl py-2 px-2 w-1/3">
              <img
                className="w-full h-full rounded-md"
                src={oneClass.classImage}
                alt="Class"
              />
            </div>
            <div className="py-3 px-8 w-1/3 flex-grow">
              <h3 className="text-xl font-semibold py-1">
                {oneClass.className}
              </h3>
              <p>Enrolled: {oneClass.enrolled}</p>
              <p>Available Seats: {oneClass.availableSeats}</p>
              <p>Price: ${oneClass.price}</p>
              <h2 className="mt-3 text-lg font-semibold">
                {oneClass.instructorName}
              </h2>
              <h2 className=" text-lg">{oneClass.instructorEmail}</h2>
              {oneClass.status === "approved" ? (
                <button className="bg-green-300 py-1 px-4 rounded-sm capitalize font-bold hover:opacity-80 ease-in duration-200 mt-8">
                  Approved
                </button>
              ) : oneClass.status === "denied" ? (
                <button className="bg-red-300 py-1 px-4 rounded-sm capitalize font-bold hover:opacity-80 ease-in duration-200 mt-8">
                  Denied
                </button>
              ) : (
                <button className="bg-slate-200 text-slate-600 py-1 px-4 rounded-sm capitalize font-bold hover:opacity-80 ease-in duration-200 mt-8">
                  Pending
                </button>
              )}
            </div>
            <div className="flex flex-col my-10 mt-20 me-10">
              <button
                onClick={() => handleApproved(oneClass)}
                disabled={
                  oneClass.status === "approved" || oneClass.status === "denied"
                }
                className="btn btn-sm bg-green-300"
              >
                Approved
              </button>
              <button
                onClick={() => handleDenied(oneClass)}
                disabled={
                  oneClass.status === "approved" || oneClass.status === "denied"
                }
                className="btn btn-sm my-4 bg-red-300"
              >
                Denied
              </button>
              
              <label htmlFor={oneClass._id}  className="btn btn-sm modal-button">
                Feedback
              </label>
              <input type="checkbox" id={oneClass._id} className="modal-toggle" />
              <label htmlFor={oneClass._id} className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <form onSubmit={handleFedback}>
                <div className="pt-5">
              <label className="text-black" htmlFor="text">
                Send Feedback
              </label>
              <input type="text" name="id" className="hidden" defaultValue={oneClass._id} />
              <textarea
              type='text'
                className=" w-full text-black p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-orange-500"
               name="feedback"
              />
            </div>
                <button
            type="submit"
            className="group my-6 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Send Feedback
          </button>
          </form> 
                </label>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageClasses;
