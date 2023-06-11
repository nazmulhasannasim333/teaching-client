import React, { useContext, useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import { AuthContext } from '../../provider/AuthProvider';

const Classes = () => {
    const [classes, seClasses] = useState([]);
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://teaching-server.vercel.app/approvedclass`)
        .then(res => res.json())
        .then(data => {
            seClasses(data);
        })
    },[])


    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const handleSelect = (oneClass) => {
        if(user){
          const {
            className,
            classImage,
            instructorName,
            instructorEmail,
            availableSeats,
            price,
            enrolled,
            status,
            _id,
          } = oneClass;
          const selectedClass = {
            className,
            classImage,
            instructorName,
            instructorEmail,
            availableSeats,
            price,
            enrolled,
            status,
            email: user?.email,
            name: user.displayName,
            classId: _id,
          };
          fetch("https://teaching-server.vercel.app/selected", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(selectedClass),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
    
              if (data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Class has been selected",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        } else{
            Swal.fire({
              title: 'Please Login to select the class',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Login Now'
            }).then((result) => {
              if (result.isConfirmed) {
               navigate("/login", {state: {from: location}})
              }
            })
          }
    }



    return (
        <section className=" body-font my-24">
             <h3 className='text-center mb-10 font-semibold text-5xl'>All Classes</h3>
             <div className="max-w-[1400px] px-5 mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 lg:gap-6 sm:px-6">
          {classes.map((oneClass, index) => (
            <div key={index} className="p-4 ">
              <div
                className={`h-full border border-slate-200 border-opacity-90  rounded-lg overflow-hidden ${
                  oneClass.availableSeats < 1 && "bg-red-500 text-white"
                }`}
              >
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={oneClass.classImage}
                  alt="blog"
                />
                <div className="p-6">
                  <h1 className="title-font text-xl font-medium  mb-3">
                    {oneClass.className}
                  </h1>
                  <p className="leading-relaxed mb-2">
                    Instractor:{" "}
                    <span className="font-semibold">
                      {oneClass.instructorName}
                    </span>
                  </p>
                  <h2 className="tracking-widest text-lg title-font font-medium  mb-3">
                    Price: ${oneClass.price}
                  </h2>
                  <div className="flex items-center flex-wrap ">
                    <button
                      onClick={() => handleSelect(oneClass)}
                      className="btn btn-sm bg-purple-600 text-white"
                      disabled={
                        oneClass.availableSeats < 1 || isAdmin || isInstructor
                      }
                    >
                      Select
                    </button>
                    <span className=" mr-3 text-md inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none  pr-3 py-1 border-r-2 border-gray-200">
                      <span>Available Seats:</span>
                      <span className=" font-semibold ms-2">
                        {oneClass.availableSeats}
                      </span>
                    </span>
                    <span className=" inline-flex items-center leading-none text-md">
                      <span>
                        <FaUsers className="text-2xl" />
                      </span>
                      <span className=" font-semibold ms-2">
                        {oneClass.enrolled}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>
    );
};

export default Classes;