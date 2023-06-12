import React, { useEffect, useState } from "react";
import useInstructor from "../../../hooks/useInstructor";

const TopInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  // get 6 instructor
  useEffect(() => {
    fetch("http://localhost:5000/popularinstructors")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
      });
  }, []);

  const [isInstructor] = useInstructor()

  return (
    <section className=" body-font my-24 max-w-[1300px] mx-auto">
      <div className="max-w-3xl mx-auto">
      <h3 className="text-center mb-8 font-semibold text-5xl">
        Popular Instructors
      </h3>
      <p className="mb-14 text-center text-lg">With their dynamic presentation skills and charismatic presence, these lecturers have the ability to captivate audiences. Their thought-provoking lectures leave a lasting impression on students.</p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 lg:gap-6 lg:px-0 px-6">

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

export default TopInstructors;
