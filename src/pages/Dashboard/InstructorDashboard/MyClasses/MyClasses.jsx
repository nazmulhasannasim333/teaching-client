import React from "react";
import useClasses from "../../../../hooks/useClasses";

const MyClasses = () => {
  const [clases] = useClasses();

  
  return (
    <div className="w-full px-10">
      <h3 className="text-center text-4xl font-semibold mb-14 mt-0">
        My All Classses
      </h3>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5 lg:gap-4 sm:px-6 ">
        {clases.map((oneClass) => (
          <div
            key={oneClass._id}
            className="  bg-[#ffffff75] mx-3 border my-0 lg:my-2 border-gray-200 rounded-xl lg:mx-0 shadow-sm"
          >
            <div className="lg:flex flex-row ">
              <div className="rounded-2xl py-2 px-2 w-1/3">
                <img
                  className="lg:w-full lg:h-full rounded-md"
                  src={oneClass.classImage}
                  alt="Class"
                />
              </div>
              <div className="py-3 px-8 w-1/3 ">
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
                ) : (
                  <button className="bg-slate-200 text-slate-600 py-1 px-4 rounded-sm capitalize font-bold hover:opacity-80 ease-in duration-200 mt-8">
                    Pending
                  </button>
                )}
              </div>
              <div className="w-1/3 text-end">
              <label htmlFor={oneClass._id}  className="btn btn-sm modal-button">
                Feedback
              </label>
              <input type="checkbox" id={oneClass._id} className="modal-toggle" />
              <label htmlFor={oneClass._id} className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <h3 className="text-start">{oneClass.feedback ? oneClass.feedback : 'No feedback yet'}</h3>
                </label>
              </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
