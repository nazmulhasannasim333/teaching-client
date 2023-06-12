import React, { useEffect, useState } from "react";
import useInstructor from "../../hooks/useInstructor";

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);

  // get all nstructor 
  useEffect(() => {
    fetch("https://teaching-server.vercel.app/instructors")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
      });
  }, []);



  const [isInstructor] = useInstructor()

  return (
    <section className=" body-font my-24 px-5 max-w-[1300px] mx-auto">
      <h3 className="text-center mb-10 font-semibold text-5xl">
        All Instructor
      </h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 lg:gap-6 sm:px-6">

        {
            instructors.map((instractor, index) => <div key={index} className="w-full h-96 relative overflow-hidden rounded-md shadow-lg">
            <img
              src={instractor.photo}
              alt="Card Image"
              className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-60"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-75 text-white transition-opacity duration-300 opacity-100 ">
              <p className="text-lg font-semibold">{instractor.name}</p>
              <p className="text-md mt-1">Email: {instractor.email}</p>
              <p className="text-md mt-1">Position: {instractor.role}</p>
            </div>
          </div>)
        }
      
      </div>
    </section>
  );
};

export default Instructor;