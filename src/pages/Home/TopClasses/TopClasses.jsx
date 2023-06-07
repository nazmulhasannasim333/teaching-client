import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TopClasses = () => {
    const [classes, seClasses] = useState([]);

    useEffect(() => {
        fetch('/Classes.json')
        .then(res => res.json())
        .then(data => {
           seClasses(data);
        })
    },[])


    return (
        <section className=" body-font my-24">
             <h3 className='text-center mb-10 font-semibold text-5xl'>Popular Classes</h3>
        <div className="max-w-[1400px] px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
          {
            classes.map((oneClass, index) =>   <div key={index} className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={oneClass.classImage} alt="blog" />
              <div className="p-6">
                <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{oneClass.className}</h1>
                <p className="leading-relaxed mb-2">Instractor: <span className='font-semibold'>{oneClass.instructorName}</span></p>
                <h2 className="tracking-widest text-lg title-font font-medium  mb-3">
                    Price: ${oneClass.price}</h2>
                <div className="flex items-center flex-wrap ">
                 <button disabled={oneClass.availableSeats > 1}> <Link  className="text-white bg-purple-600 py-1 px-3 rounded-md inline-flex items-center md:mb-2 lg:mb-0">Select Now
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link></button>
                  <span className="text-gray-400 mr-3 text-md inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none  pr-3 py-1 border-r-2 border-gray-200">
                    <span>Available Seats:</span>
                   <span className='text-black font-semibold ms-2'>{oneClass.availableSeats}</span>
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-md">
                   <span><FaUsers className='text-2xl' /></span>
                   <span className='text-black font-semibold ms-2'>{oneClass.enrolled}</span>
                  </span>
                </div>
              </div>
            </div>
          </div> )
          }
          </div>
        </div>
      </section>
      
    );
};

export default TopClasses;